/**
 * Discord Real-time Status Web Component
 * 使用 Lanyard WebSocket API 实现实时状态更新
 * 
 * 优化版本 - 改进内存管理、渲染性能和代码结构
 */
class DiscordStatus extends HTMLElement {
  // 静态配置，避免重复创建
  static CONFIG = {
    wsUrl: 'wss://api.lanyard.rest/socket',
    apiUrl: 'https://api.lanyard.rest/v1/users/',
    reconnectDelay: 5000,
    progressUpdateInterval: 1000,
    songEndDelay: 2000,
    statusConfigs: {
      online: { color: '#23a55a', text: 'Online', class: 'status-online' },
      idle: { color: '#f0b232', text: 'Idle', class: 'status-idle' },
      dnd: { color: '#f23f43', text: 'DND', class: 'status-dnd' },
      offline: { color: '#80848e', text: 'Offline', class: 'status-offline' }
    }
  };

  constructor() {
    super();
    this.ws = null;
    this.heartbeat = null;
    this.reconnectTimer = null;
    this.progressTimers = new Map();
    this.songEndTimers = new Map();
    this.userId = '1109821913498407042';
    this.avatarHash = '627069fe38fef6f76b72a7f67f4cf148';
    this._lastActivityKey = '';
  }

  static get observedAttributes() {
    return ['data-user-id', 'data-avatar'];
  }

  connectedCallback() {
    this.userId = this.getAttribute('data-user-id') || this.userId;
    this.avatarHash = this.getAttribute('data-avatar') || this.avatarHash;
    
    this._renderSkeleton();
    this.fetchInitialData();
    this.connectWebSocket();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  cleanup() {
    if (this.ws) {
      this.ws.onopen = null;
      this.ws.onmessage = null;
      this.ws.onerror = null;
      this.ws.onclose = null;
      this.ws.close();
      this.ws = null;
    }

    if (this.heartbeat) {
      clearInterval(this.heartbeat);
      this.heartbeat = null;
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    this._clearAllTimers();
  }

  _clearAllTimers() {
    this.progressTimers.forEach(timer => clearInterval(timer));
    this.progressTimers.clear();

    this.songEndTimers.forEach(timer => clearTimeout(timer));
    this.songEndTimers.clear();
  }

  _renderSkeleton() {
    const template = document.createElement('template');
    template.innerHTML = this._getSkeletonHTML();
    this.innerHTML = '';
    this.appendChild(template.content.cloneNode(true));
  }

  async fetchInitialData() {
    try {
      const res = await fetch(`${DiscordStatus.CONFIG.apiUrl}${this.userId}`);
      const json = await res.json();
      if (json.success) {
        this.render(json.data);
      }
    } catch (err) {
      console.error('[DiscordStatus] 初始数据获取失败:', err);
      this._showError();
    }
  }

  _showError() {
    this.innerHTML = '<div class="discord-error">加载失败，请刷新页面</div>';
  }

  connectWebSocket() {
    try {
      this.ws = new WebSocket(DiscordStatus.CONFIG.wsUrl);
      
      this.ws.onopen = () => console.log('[DiscordStatus] WebSocket connected');

      this.ws.onmessage = (event) => {
        const { op, d } = JSON.parse(event.data);
        
        switch(op) {
          case 1:
            this._handleHello(d.heartbeat_interval);
            break;
          case 0:
            this._handleEvent(d);
            break;
        }
      };

      this.ws.onerror = (err) => console.error('[DiscordStatus] WebSocket error:', err);

      this.ws.onclose = () => {
        console.log('[DiscordStatus] WebSocket disconnected, reconnecting...');
        this._scheduleReconnect();
      };

    } catch (err) {
      console.error('[DiscordStatus] WebSocket connection failed:', err);
      this._scheduleReconnect();
    }
  }

  _handleHello(heartbeatInterval) {
    this.ws.send(JSON.stringify({
      op: 2,
      d: { subscribe_to_ids: [this.userId] }
    }));

    this.heartbeat = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ op: 3 }));
      }
    }, heartbeatInterval);
  }

  _handleEvent(d) {
    if (d.t === 'INIT_STATE' || d.t === 'PRESENCE_UPDATE') {
      const userData = d.d[this.userId] || d.d;
      requestAnimationFrame(() => this.render(userData));
    }
  }

  _scheduleReconnect() {
    this.reconnectTimer = setTimeout(() => {
      this.connectWebSocket();
    }, DiscordStatus.CONFIG.reconnectDelay);
  }

  calculateProgress(start, end) {
    const now = Date.now();
    const total = end - start;
    const current = now - start;
    return Math.min(Math.max((current / total) * 100, 0), 100);
  }

  formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  getStatusConfig(status) {
    return DiscordStatus.CONFIG.statusConfigs[status] || 
           DiscordStatus.CONFIG.statusConfigs.offline;
  }

  getActivityIcon(name, type) {
    if (type === 2) return '🎵';
    if (name?.includes('Code') || name?.includes('Visual Studio')) return '💻';
    if (name?.includes('GitHub')) return '🐙';
    if (name?.includes('Terminal') || name?.includes('iTerm') || name?.includes('Hyper')) return '⌨️';
    return '🎮';
  }

  _getSkeletonHTML() {
    return `
      <div class="discord-card">
        <svg class="discord-logo" viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.77,77.7,77.7,0,0,0,39.6,85.79a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,10.98A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74c6.62,0,11.76,5.77,11.56,12.74C53.79,60,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74c6.62,0,11.76,5.77,11.56,12.74C96,60,91.06,65.69,84.69,65.69Z"/>
        </svg>
        <div class="discord-inner">
          <div class="discord-left discord-skeleton">
            <div class="discord-avatar skeleton"></div>
            <div class="skeleton-line" style="width: 80px;"></div>
            <div class="skeleton-line" style="width: 60px;"></div>
          </div>
          <div class="discord-right discord-skeleton">
            <div class="skeleton-line" style="width: 60%;"></div>
            <div class="skeleton-line" style="width: 40%;"></div>
          </div>
        </div>
      </div>
    `;
  }

  _hasActivityChanged(activities) {
    const currentKey = activities.map(a => `${a.name}-${a.details}-${a.state}`).join('|');
    const changed = this._lastActivityKey !== currentKey;
    this._lastActivityKey = currentKey;
    return changed;
  }

  _getActivityId(act, idx) {
    return `act-${idx}-${act.name.slice(0, 10)}-${(act.timestamps?.start || 0) % 10000}`;
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

  render(data) {
    const user = data.discord_user;
    const status = this.getStatusConfig(data.discord_status);
    const activities = (data.activities || []).filter(a => a.type !== 4).slice(0, 2);

    if (this._hasActivityChanged(activities)) {
      this._clearAllTimers();
    }

    const activitiesHtml = activities.map((act, idx) => this._buildActivityHtml(act, idx)).join('');
    this.innerHTML = this._buildMainHtml(user, status, activities, activitiesHtml, data);
    
    activities.forEach((act, idx) => {
      if (act.timestamps?.start) {
        this._startActivityTimer(act, idx);
      }
    });
  }

  _buildActivityHtml(act, idx) {
    const activityId = this._getActivityId(act, idx);
    const isMusic = act.type === 2;
    const icon = this.getActivityIcon(act.name, act.type);
    
    const imgUrl = this._getActivityImageUrl(act);
    const imgHtml = imgUrl 
      ? `<img src="${imgUrl}" class="activity-img" alt="" loading="lazy" />`
      : `<div class="activity-icon-fallback">${icon}</div>`;

    let timeHtml = '';
    if (act.timestamps?.start) {
      if (isMusic && act.timestamps?.end) {
        timeHtml = `
          <div class="music-progress">
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" id="progress-${activityId}" style="width: 0%"></div>
            </div>
            <div class="time-display" id="time-${activityId}">0:00 / 0:00</div>
          </div>
        `;
      } else {
        timeHtml = `<div class="elapsed-time" id="time-${activityId}">🎮 0:00:00</div>`;
      }
    }

    return `
      <div class="activity-item" data-activity-id="${activityId}">
        ${imgHtml}
        <div class="activity-content">
          <div class="activity-name">${act.name}</div>
          ${act.details ? `<div class="activity-details">${act.details}</div>` : ''}
          ${act.state ? `<div class="activity-state">${act.state}</div>` : ''}
          ${timeHtml}
        </div>
      </div>
    `;
  }

  _buildMainHtml(user, status, activities, activitiesHtml, data) {
    const emptyState = activities.length === 0 ? '<div class="activity-empty">No activity</div>' : '';
    
    const clientTags = [];
    if (data.active_on_discord_desktop) clientTags.push('💻 Desktop');
    if (data.active_on_discord_mobile) clientTags.push('📱 Mobile');
    if (data.active_on_discord_web) clientTags.push('🌐 Web');

    const clientTagsHtml = clientTags.length > 0 
      ? `<div class="discord-divider"></div>
         <div class="client-tags">${clientTags.map(tag => `<span class="client-tag">${tag}</span>`).join('')}</div>`
      : '';

    return `
      <div class="discord-card">
        <svg class="discord-logo" viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.77,77.7,77.7,0,0,0,39.6,85.79a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,10.98A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74c6.62,0,11.76,5.77,11.56,12.74C53.79,60,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74c6.62,0,11.76,5.77,11.56,12.74C96,60,91.06,65.69,84.69,65.69Z"/>
        </svg>
        <div class="discord-inner">
          <div class="discord-left">
            <div class="avatar-wrapper">
              <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar || this.avatarHash}.png?size=128" 
                   alt="${user.username}" class="discord-avatar-img" loading="eager" />
              <div class="status-indicator ${status.class}" style="background-color: ${status.color}"></div>
            </div>
            <div class="discord-display-name">${user.global_name || user.username}</div>
            <div class="discord-username">@${user.username}</div>
            <div class="discord-status-text" style="color: ${status.color}">${status.text}</div>
            ${clientTagsHtml}
          </div>
          <div class="discord-right">
            <div class="discord-activities">${activitiesHtml}${emptyState}</div>
          </div>
        </div>
      </div>
    `;
  }

  _startActivityTimer(act, idx) {
    const activityId = this._getActivityId(act, idx);
    const isMusic = act.type === 2 && act.timestamps?.end;
    
    const updateFn = isMusic 
      ? () => this._updateMusicProgress(act, activityId)
      : () => this._updateElapsedTime(act, activityId);

    updateFn();
    const timer = setInterval(updateFn, DiscordStatus.CONFIG.progressUpdateInterval);
    this.progressTimers.set(activityId, timer);
  }

  _updateMusicProgress(act, activityId) {
    const fillEl = this.querySelector(`#progress-${activityId}`);
    const timeEl = this.querySelector(`#time-${activityId}`);
    
    if (!fillEl) {
      this._cleanupActivityTimer(activityId);
      return;
    }

    const pct = this.calculateProgress(act.timestamps.start, act.timestamps.end);
    fillEl.style.width = `${pct}%`;

    if (timeEl) {
      const current = Date.now() - act.timestamps.start;
      const total = act.timestamps.end - act.timestamps.start;
      timeEl.textContent = `${this.formatTime(current)} / ${this.formatTime(total)}`;
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
    const timeEl = this.querySelector(`#time-${activityId}`);
    if (!timeEl) {
      this._cleanupActivityTimer(activityId);
      return;
    }
    timeEl.textContent = `🎮 ${this.formatDuration(Date.now() - act.timestamps.start)}`;
  }

  _cleanupActivityTimer(activityId) {
    const timer = this.progressTimers.get(activityId);
    if (timer) {
      clearInterval(timer);
      this.progressTimers.delete(activityId);
    }
  }
}

if (!customElements.get('discord-status')) {
  customElements.define('discord-status', DiscordStatus);
}
