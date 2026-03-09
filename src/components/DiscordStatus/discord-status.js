/**
 * Discord Real-time Status Web Component
 * 使用 Lanyard WebSocket API 实现实时状态更新
 * 
 * 深度优化版本 - 性能、内存、网络全方位优化
 */

// 工具函数：节流
const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// 工具函数：指数退避延迟
const getExponentialDelay = (attempt, baseDelay, maxDelay = 30000) => {
  const jitter = Math.random() * 0.3 + 0.85;
  return Math.min(baseDelay * Math.pow(2, attempt) * jitter, maxDelay);
};

class DiscordStatus extends HTMLElement {
  // 冻结的配置对象，防止意外修改
  static CONFIG = Object.freeze({
    wsUrl: 'wss://api.lanyard.rest/socket',
    apiUrl: 'https://api.lanyard.rest/v1/users/',
    baseWsReconnectDelay: 1000,
    baseApiRetryDelay: 500,
    maxWsReconnectAttempts: 5,
    maxApiRetryAttempts: 3,
    progressUpdateInterval: 1000,
    songEndDelay: 2000,
    pollInterval: 30000, // 降级轮询间隔
    localStorageKey: 'dc_last',
    statusConfigs: Object.freeze({
      online: { color: '#23a55a', text: 'Online', class: 'status-online' },
      idle: { color: '#f0b232', text: 'Idle', class: 'status-idle' },
      dnd: { color: '#f23f43', text: 'DND', class: 'status-dnd' },
      offline: { color: '#80848e', text: 'Offline', class: 'status-offline' }
    })
  });

  // WebSocket 状态机
  static WS_STATE = Object.freeze({
    DISCONNECTED: 'disconnected',
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    RECONNECTING: 'reconnecting',
    FAILED: 'failed'
  });

  constructor() {
    super();
    // 连接相关
    this.ws = null;
    this.wsState = DiscordStatus.WS_STATE.DISCONNECTED;
    this.wsReconnectAttempts = 0;
    this.heartbeat = null;
    this.reconnectTimer = null;
    this.pollTimer = null;
    
    // 定时器管理
    this.progressTimers = new Map();
    this.songEndTimers = new Map();
    
    // 配置
    this.userId = '1109821913498407042';
    this.avatarHash = '627069fe38fef6f76b72a7f67f4cf148';
    
    // 状态追踪
    this._lastActivityKey = '';
    this._pendingData = null;
    this._isVisible = true;
    this._isInViewport = false;
    this._hasError = false;
    
    // 缓存的 DOM 元素
    this._rootElement = null;
    
    // 节流渲染函数
    this._throttledRender = throttle(this._renderUnsafe.bind(this), 16);
    
    // 图片错误占位 SVG
    this._avatarFallbackSvg = `data:image/svg+xml,${encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#e5e7eb"/></svg>'
    )}`;
  }

  static get observedAttributes() {
    return ['data-user-id', 'data-avatar'];
  }

  connectedCallback() {
    this.userId = this.getAttribute('data-user-id') || this.userId;
    this.avatarHash = this.getAttribute('data-avatar') || this.avatarHash;
    
    this._renderSkeleton();
    this._setupObservers();
    this._setupVisibilityListener();
    
    // 初始连接
    this.fetchInitialData();
    this.connectWebSocket();
  }

  disconnectedCallback() {
    this._cleanup();
    this._removeObservers();
  }

  // ============ 生命周期管理 ============

  _cleanup() {
    // WebSocket
    if (this.ws) {
      this.ws.onopen = null;
      this.ws.onmessage = null;
      this.ws.onerror = null;
      this.ws.onclose = null;
      try { this.ws.close(); } catch {}
      this.ws = null;
    }
    this.wsState = DiscordStatus.WS_STATE.DISCONNECTED;

    // 定时器
    if (this.heartbeat) {
      clearInterval(this.heartbeat);
      this.heartbeat = null;
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }

    this._clearActivityTimers();
  }

  _clearActivityTimers() {
    this.progressTimers.forEach(timer => clearInterval(timer));
    this.progressTimers.clear();
    this.songEndTimers.forEach(timer => clearTimeout(timer));
    this.songEndTimers.clear();
  }

  // ============ 可见性和视口管理 ============

  _setupObservers() {
    // IntersectionObserver - 检测是否在视口内
    if ('IntersectionObserver' in window) {
      this._intersectionObserver = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          this._isInViewport = entry.isIntersecting;
          
          if (this._isInViewport && this._pendingData) {
            this.render(this._pendingData);
            this._pendingData = null;
          }
        },
        { rootMargin: '50px' }
      );
      this._intersectionObserver.observe(this);
    } else {
      this._isInViewport = true;
    }
  }

  _removeObservers() {
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
      this._intersectionObserver = null;
    }
    if (this._visibilityListener) {
      document.removeEventListener('visibilitychange', this._visibilityListener);
      this._visibilityListener = null;
    }
  }

  _setupVisibilityListener() {
    this._visibilityListener = () => {
      const wasVisible = this._isVisible;
      this._isVisible = document.visibilityState === 'visible';
      
      if (!wasVisible && this._isVisible) {
        // 页面重新可见，刷新数据
        this.fetchInitialData();
      }
    };
    document.addEventListener('visibilitychange', this._visibilityListener);
  }

  // ============ 数据获取 ============

  async fetchInitialData(retryAttempt = 0) {
    if (!this._isVisible) return;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const res = await fetch(
        `${DiscordStatus.CONFIG.apiUrl}${this.userId}`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const json = await res.json();
      if (json.success) {
        this._hasError = false;
        this.render(json.data);
      } else {
        throw new Error('API returned unsuccessful');
      }
    } catch (err) {
      console.error('[DiscordStatus] API fetch failed:', err.message);
      
      if (retryAttempt < DiscordStatus.CONFIG.maxApiRetryAttempts) {
        const delay = getExponentialDelay(
          retryAttempt,
          DiscordStatus.CONFIG.baseApiRetryDelay
        );
        console.log(`[DiscordStatus] Retrying API in ${Math.round(delay)}ms...`);
        setTimeout(() => this.fetchInitialData(retryAttempt + 1), delay);
      } else if (!this._hasError) {
        this._hasError = true;
        this._showError();
      }
    }
  }

  // ============ WebSocket 连接 ============

  connectWebSocket() {
    if (this.wsState === DiscordStatus.WS_STATE.CONNECTING || 
        this.wsState === DiscordStatus.WS_STATE.CONNECTED) {
      return;
    }

    if (this.wsReconnectAttempts >= DiscordStatus.CONFIG.maxWsReconnectAttempts) {
      console.log('[DiscordStatus] Max WebSocket retries reached, switching to polling mode');
      this.wsState = DiscordStatus.WS_STATE.FAILED;
      this._startPolling();
      return;
    }

    this.wsState = DiscordStatus.WS_STATE.CONNECTING;

    try {
      this.ws = new WebSocket(DiscordStatus.CONFIG.wsUrl);
      
      this.ws.onopen = () => {
        console.log('[DiscordStatus] WebSocket connected');
        this.wsState = DiscordStatus.WS_STATE.CONNECTED;
        this.wsReconnectAttempts = 0;
        // 停止轮询（如果在轮询）
        if (this.pollTimer) {
          clearInterval(this.pollTimer);
          this.pollTimer = null;
        }
      };

      this.ws.onmessage = (event) => {
        try {
          const { op, d } = JSON.parse(event.data);
          this._handleWsMessage(op, d);
        } catch (err) {
          console.error('[DiscordStatus] Failed to parse WebSocket message:', err);
        }
      };

      this.ws.onerror = (err) => {
        console.error('[DiscordStatus] WebSocket error:', err);
      };

      this.ws.onclose = () => {
        this.wsState = DiscordStatus.WS_STATE.DISCONNECTED;
        if (this.wsReconnectAttempts < DiscordStatus.CONFIG.maxWsReconnectAttempts) {
          this._scheduleWsReconnect();
        } else {
          this._startPolling();
        }
      };

    } catch (err) {
      console.error('[DiscordStatus] WebSocket connection failed:', err);
      this.wsState = DiscordStatus.WS_STATE.DISCONNECTED;
      this._scheduleWsReconnect();
    }
  }

  _handleWsMessage(op, d) {
    switch(op) {
      case 1: // Hello
        this.ws.send(JSON.stringify({
          op: 2,
          d: { subscribe_to_ids: [this.userId] }
        }));
        this.heartbeat = setInterval(() => {
          if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ op: 3 }));
          }
        }, d.heartbeat_interval);
        break;
        
      case 0: // Event
        if (d.t === 'INIT_STATE' || d.t === 'PRESENCE_UPDATE') {
          const userData = d.d[this.userId] || d.d;
          this.render(userData);
        }
        break;
    }
  }

  _scheduleWsReconnect() {
    this.wsReconnectAttempts++;
    this.wsState = DiscordStatus.WS_STATE.RECONNECTING;
    
    const delay = getExponentialDelay(
      this.wsReconnectAttempts - 1,
      DiscordStatus.CONFIG.baseWsReconnectDelay
    );
    
    console.log(`[DiscordStatus] Reconnecting WebSocket in ${Math.round(delay)}ms (attempt ${this.wsReconnectAttempts})...`);
    
    this.reconnectTimer = setTimeout(() => {
      this.connectWebSocket();
    }, delay);
  }

  _startPolling() {
    if (this.pollTimer) return;
    console.log('[DiscordStatus] Starting HTTP polling mode');
    this.fetchInitialData();
    this.pollTimer = setInterval(() => {
      if (this._isVisible) {
        this.fetchInitialData();
      }
    }, DiscordStatus.CONFIG.pollInterval);
  }

  // ============ 渲染 ============

  _renderSkeleton() {
    this.innerHTML = `
      <div class="discord-card">
        <svg class="discord-logo" viewBox="0 0 127.14 96.36"><path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.77,77.7,77.7,0,0,0,39.6,85.79a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,10.98A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74c6.62,0,11.76,5.77,11.56,12.74C53.79,60,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74c6.62,0,11.76,5.77,11.56,12.74C96,60,91.06,65.69,84.69,65.69Z"/></svg>
        <div class="discord-inner">
          <div class="discord-left discord-skeleton">
            <div class="discord-avatar skeleton"></div>
            <div class="skeleton-line" style="width:80px"></div>
            <div class="skeleton-line" style="width:60px"></div>
          </div>
          <div class="discord-right discord-skeleton">
            <div class="skeleton-line" style="width:60%"></div>
            <div class="skeleton-line" style="width:40%"></div>
          </div>
        </div>
      </div>
    `;
  }

  _showError() {
    this.innerHTML = '<div class="discord-error">加载失败，请刷新页面</div>';
  }

  render(data) {
    // 如果不在视口内，缓存数据稍后渲染
    if (!this._isInViewport) {
      this._pendingData = data;
      return;
    }
    
    // 节流到 ~60fps
    this._throttledRender(data);
  }

  _renderUnsafe(data) {
    // 页面不可见时暂停渲染（但保留数据）
    if (!this._isVisible) {
      this._pendingData = data;
      return;
    }

    const user = data.discord_user;
    const isOffline = data.discord_status === 'offline';
    const status = DiscordStatus.CONFIG.statusConfigs[data.discord_status] || 
                   DiscordStatus.CONFIG.statusConfigs.offline;
    let activities = (data.activities || []).filter(a => a.type !== 4).slice(0, 2);
    let historyData = null;

    if (isOffline) {
      // 离线时读取历史记录
      historyData = this._loadLastActivity();
      if (historyData) {
        activities = [historyData.act];
      }
    } else if (activities.length > 0) {
      // 在线且有活动时保存最后活动
      this._saveLastActivity(activities[0]);
    }

    // 检查活动是否变化
    const currentKey = activities.map(a => `${a.name}-${a.details}-${a.state}`).join('|');
    if (this._lastActivityKey !== currentKey) {
      this._lastActivityKey = currentKey;
      this._clearActivityTimers();
    }

    // 使用 DocumentFragment 构建 DOM
    const fragment = document.createDocumentFragment();
    const card = this._createCard(user, status, activities, data, !!historyData, historyData?.t);
    fragment.appendChild(card);
    
    this.innerHTML = '';
    this.appendChild(fragment);
    
    // 启动活动更新（仅非历史活动）
    if (!historyData) {
      activities.forEach((act, idx) => {
        if (act.timestamps?.start) {
          this._startActivityTimer(act, idx);
        }
      });
    }
  }

  // ============ DOM 创建 ============

  _createCard(user, status, activities, data, isHistory = false, historyTimestamp = null) {
    const card = document.createElement('div');
    card.className = 'discord-card';
    
    // Logo
    const logo = document.createElement('div');
    logo.innerHTML = `<svg class="discord-logo" viewBox="0 0 127.14 96.36"><path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.77,77.7,77.7,0,0,0,39.6,85.79a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,10.98A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74c6.62,0,11.76,5.77,11.56,12.74C53.79,60,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74c6.62,0,11.76,5.77,11.56,12.74C96,60,91.06,65.69,84.69,65.69Z"/></svg>`;
    card.appendChild(logo.firstElementChild);
    
    // 内部分栏
    const inner = document.createElement('div');
    inner.className = 'discord-inner';
    
    // 左侧用户信息
    inner.appendChild(this._createUserSection(user, status, data));
    
    // 右侧活动
    inner.appendChild(this._createActivitiesSection(activities, isHistory, historyTimestamp));
    
    card.appendChild(inner);
    return card;
  }

  _createUserSection(user, status, data) {
    const section = document.createElement('div');
    section.className = 'discord-left';
    
    // 头像
    const avatarWrapper = document.createElement('div');
    avatarWrapper.className = 'avatar-wrapper';
    
    const img = document.createElement('img');
    img.className = 'discord-avatar-img';
    img.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar || this.avatarHash}.png?size=128`;
    img.alt = user.username;
    img.loading = 'eager';
    img.onerror = () => { img.src = this._avatarFallbackSvg; };
    
    const statusIndicator = document.createElement('div');
    statusIndicator.className = `status-indicator ${status.class}`;
    statusIndicator.style.backgroundColor = status.color;
    
    avatarWrapper.appendChild(img);
    avatarWrapper.appendChild(statusIndicator);
    section.appendChild(avatarWrapper);
    
    // 用户信息
    const displayName = document.createElement('div');
    displayName.className = 'discord-display-name';
    displayName.textContent = user.global_name || user.username;
    section.appendChild(displayName);
    
    const username = document.createElement('div');
    username.className = 'discord-username';
    username.textContent = `@${user.username}`;
    section.appendChild(username);
    
    const statusText = document.createElement('div');
    statusText.className = 'discord-status-text';
    statusText.style.color = status.color;
    statusText.textContent = status.text;
    section.appendChild(statusText);
    
    // 客户端标签
    const clientTags = [];
    if (data.active_on_discord_desktop) clientTags.push('💻 Desktop');
    if (data.active_on_discord_mobile) clientTags.push('📱 Mobile');
    if (data.active_on_discord_web) clientTags.push('🌐 Web');
    
    if (clientTags.length > 0) {
      const divider = document.createElement('div');
      divider.className = 'discord-divider';
      section.appendChild(divider);
      
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'client-tags';
      clientTags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'client-tag';
        span.textContent = tag;
        tagsContainer.appendChild(span);
      });
      section.appendChild(tagsContainer);
    }
    
    return section;
  }

  _createActivitiesSection(activities, isHistory = false, historyTimestamp = null) {
    const section = document.createElement('div');
    section.className = 'discord-right';
    
    const container = document.createElement('div');
    container.className = 'discord-activities';
    
    if (activities.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'activity-empty';
      empty.textContent = 'No activity';
      container.appendChild(empty);
    } else {
      activities.forEach((act, idx) => {
        container.appendChild(this._createActivityElement(act, idx, isHistory, historyTimestamp));
      });
    }
    
    section.appendChild(container);
    return section;
  }

  _createActivityElement(act, idx, isHistory = false, historyTimestamp = null) {
    const activityId = `act-${idx}-${act.name.slice(0, 10)}-${(act.timestamps?.start || 0) % 10000}`;
    const isMusic = act.type === 2;
    
    const item = document.createElement('div');
    item.className = isHistory ? 'activity-item activity-item-history' : 'activity-item';
    if (!isHistory) {
      item.dataset.activityId = activityId;
    }
    
    // 图片
    const imgUrl = this._getActivityImageUrl(act);
    if (imgUrl) {
      const img = document.createElement('img');
      img.className = 'activity-img';
      img.src = imgUrl;
      img.alt = '';
      img.loading = 'lazy';
      img.onerror = () => {
        img.replaceWith(this._createIconFallback(act.name, act.type));
      };
      item.appendChild(img);
    } else {
      item.appendChild(this._createIconFallback(act.name, act.type));
    }
    
    // 内容
    const content = document.createElement('div');
    content.className = 'activity-content';
    
    const name = document.createElement('div');
    name.className = 'activity-name';
    name.textContent = act.name;
    content.appendChild(name);
    
    if (act.details) {
      const details = document.createElement('div');
      details.className = 'activity-details';
      details.textContent = act.details;
      content.appendChild(details);
    }
    
    if (act.state) {
      const state = document.createElement('div');
      state.className = 'activity-state';
      state.textContent = act.state;
      content.appendChild(state);
    }
    
    // 时间/进度（仅非历史模式）
    if (!isHistory && act.timestamps?.start) {
      if (isMusic && act.timestamps?.end) {
        const progress = document.createElement('div');
        progress.className = 'music-progress';
        progress.innerHTML = `
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" id="progress-${activityId}" style="width:0%"></div>
          </div>
          <div class="time-display" id="time-${activityId}">0:00 / 0:00</div>
        `;
        content.appendChild(progress);
      } else {
        const elapsed = document.createElement('div');
        elapsed.className = 'elapsed-time';
        elapsed.id = `time-${activityId}`;
        elapsed.textContent = '🎮 0:00:00';
        content.appendChild(elapsed);
      }
    }
    
    // 历史时间戳 subtle tag
    if (isHistory && historyTimestamp) {
      const timeTag = document.createElement('div');
      timeTag.className = 'activity-history-time';
      timeTag.textContent = `🕐 ${this._formatDateTime(historyTimestamp)}`;
      content.appendChild(timeTag);
    }
    
    item.appendChild(content);
    return item;
  }

  _createIconFallback(name, type) {
    const div = document.createElement('div');
    div.className = 'activity-icon-fallback';
    
    let icon = '🎮';
    if (type === 2) icon = '🎵';
    else if (name?.includes('Code') || name?.includes('Visual Studio')) icon = '💻';
    else if (name?.includes('GitHub')) icon = '🐙';
    else if (name?.includes('Terminal') || name?.includes('iTerm') || name?.includes('Hyper')) icon = '⌨️';
    
    div.textContent = icon;
    return div;
  }

  _getActivityImageUrl(act) {
    if (!act.assets?.large_image) return null;
    
    let imgUrl = act.assets.large_image;
    if (imgUrl.startsWith('mp:')) {
      return `https://media.discordapp.net/${imgUrl.slice(3)}`;
    } else if (!imgUrl.startsWith('http')) {
      return `https://cdn.discordapp.com/app-assets/${act.application_id}/${imgUrl}.png`;
    }
    return imgUrl;
  }

  // ============ 活动更新 ============

  _startActivityTimer(act, idx) {
    if (!this._isVisible) return;
    
    const activityId = `act-${idx}-${act.name.slice(0, 10)}-${(act.timestamps?.start || 0) % 10000}`;
    const isMusic = act.type === 2 && act.timestamps?.end;
    
    const updateFn = isMusic 
      ? () => this._updateMusicProgress(act, activityId)
      : () => this._updateElapsedTime(act, activityId);

    updateFn();
    const timer = setInterval(updateFn, DiscordStatus.CONFIG.progressUpdateInterval);
    this.progressTimers.set(activityId, timer);
  }

  _updateMusicProgress(act, activityId) {
    if (!this._isVisible) return;
    
    const fillEl = this.querySelector(`#progress-${activityId}`);
    const timeEl = this.querySelector(`#time-${activityId}`);
    
    if (!fillEl) {
      this._cleanupActivityTimer(activityId);
      return;
    }

    const now = Date.now();
    const total = act.timestamps.end - act.timestamps.start;
    const current = now - act.timestamps.start;
    const pct = Math.min(Math.max((current / total) * 100, 0), 100);
    
    fillEl.style.width = `${pct}%`;

    if (timeEl) {
      const mins = Math.floor(current / 60000);
      const secs = Math.floor((current % 60000) / 1000);
      const totalMins = Math.floor(total / 60000);
      const totalSecs = Math.floor((total % 60000) / 1000);
      timeEl.textContent = `${mins}:${secs.toString().padStart(2, '0')} / ${totalMins}:${totalSecs.toString().padStart(2, '0')}`;
    }

    if (pct >= 100) {
      this._cleanupActivityTimer(activityId);
      const endTimer = setTimeout(() => {
        this.fetchInitialData();
        this.songEndTimers.delete(activityId);
      }, DiscordStatus.CONFIG.songEndDelay);
      this.songEndTimers.set(activityId, endTimer);
    }
  }

  _updateElapsedTime(act, activityId) {
    if (!this._isVisible) return;
    
    const timeEl = this.querySelector(`#time-${activityId}`);
    if (!timeEl) {
      this._cleanupActivityTimer(activityId);
      return;
    }
    
    const elapsed = Date.now() - act.timestamps.start;
    const hours = Math.floor(elapsed / 3600000);
    const mins = Math.floor((elapsed % 3600000) / 60000);
    const secs = Math.floor((elapsed % 60000) / 1000);
    
    if (hours > 0) {
      timeEl.textContent = `🎮 ${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      timeEl.textContent = `🎮 ${mins}:${secs.toString().padStart(2, '0')}`;
    }
  }

  _cleanupActivityTimer(activityId) {
    const timer = this.progressTimers.get(activityId);
    if (timer) {
      clearInterval(timer);
      this.progressTimers.delete(activityId);
    }
  }

  // ============ 历史记录管理 ============

  _saveLastActivity(act) {
    try {
      const data = {
        t: Date.now(),
        act: act
      };
      localStorage.setItem(DiscordStatus.CONFIG.localStorageKey, JSON.stringify(data));
    } catch (e) {
      // 静默失败，不影响主功能
      console.debug('[DiscordStatus] Failed to save last activity:', e);
    }
  }

  _loadLastActivity() {
    try {
      const raw = localStorage.getItem(DiscordStatus.CONFIG.localStorageKey);
      if (!raw) return null;
      const data = JSON.parse(raw);
      // 简单校验
      if (data && data.t && data.act) {
        return data;
      }
      return null;
    } catch (e) {
      console.debug('[DiscordStatus] Failed to load last activity:', e);
      return null;
    }
  }

  _formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }
}

if (!customElements.get('discord-status')) {
  customElements.define('discord-status', DiscordStatus);
}
