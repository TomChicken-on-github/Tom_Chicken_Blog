/**
 * Discord Real-time Status Web Component
 * 使用 Lanyard WebSocket API 实现实时状态更新
 *
 * 深度优化版本 - 性能、内存、网络全方位优化
 */

// 工具函数：节流（支持 trailing edge 执行，确保最终状态不丢失）
const throttle = (fn, limit) => {
	let inThrottle = false;
	let lastArgs = null;
	let lastThis = null;

	return function throttled(...args) {
		if (!inThrottle) {
			fn.apply(this, args);
			inThrottle = true;
			setTimeout(() => {
				inThrottle = false;
				if (lastArgs) {
					throttled.apply(lastThis, lastArgs);
					lastArgs = null;
					lastThis = null;
				}
			}, limit);
		} else {
			lastArgs = args;
			lastThis = this;
		}
	};
};

// 工具函数：指数退避延迟
const getExponentialDelay = (attempt, baseDelay, maxDelay = 30000) => {
	const jitter = Math.random() * 0.3 + 0.85;
	return Math.min(baseDelay * 2 ** attempt * jitter, maxDelay);
};

class DiscordStatus extends HTMLElement {
	// 冻结的配置对象，防止意外修改
	static CONFIG = Object.freeze({
		wsUrl: "wss://api.lanyard.rest/socket",
		apiUrl: "https://api.lanyard.rest/v1/users/",
		baseWsReconnectDelay: 1000,
		baseApiRetryDelay: 500,
		maxWsReconnectAttempts: 5,
		maxApiRetryAttempts: 3,
		progressUpdateInterval: 1000,
		songEndDelay: 2000,
		pollInterval: 30000, // 降级轮询间隔
		workerUrl: "https://discord-status.tomchicken-blog.workers.dev", // Worker API 地址
		localStorageKey: "dc_last",
		statusConfigs: Object.freeze({
			online: { color: "#23a55a", text: "Online", class: "status-online" },
			idle: { color: "#f0b232", text: "Idle", class: "status-idle" },
			dnd: { color: "#f23f43", text: "DND", class: "status-dnd" },
			offline: { color: "#80848e", text: "Offline", class: "status-offline" },
		}),
	});

	// WebSocket 状态机
	static WS_STATE = Object.freeze({
		DISCONNECTED: "disconnected",
		CONNECTING: "connecting",
		CONNECTED: "connected",
		RECONNECTING: "reconnecting",
		FAILED: "failed",
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
		this.apiRetryTimer = null;

		// 定时器管理
		this.progressTimers = new Map();
		this.songEndTimers = new Map();

		// 配置
		this.userId = "1109821913498407042";
		this.avatarHash = "627069fe38fef6f76b72a7f67f4cf148";
		this.workerUrl = DiscordStatus.CONFIG.workerUrl;

		// 状态与渲染追踪
		this._renderId = 0;
		this._lastActivityKey = "";
		this._pendingData = null;
		this._isVisible = true;
		this._isInViewport = false;
		this._hasError = false;
		this._historyData = null;
		this._historyFetched = false;

		// 节流渲染函数
		this._throttledRender = throttle(this._renderUnsafe.bind(this), 16);

		// 图片错误占位 SVG
		this._avatarFallbackSvg = `data:image/svg+xml,${encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#e5e7eb"/></svg>',
		)}`;
	}

	static get observedAttributes() {
		return ["data-user-id", "data-avatar", "data-worker-url"];
	}

	connectedCallback() {
		this.userId = this.getAttribute("data-user-id") || this.userId;
		this.avatarHash = this.getAttribute("data-avatar") || this.avatarHash;
		this.workerUrl = this.getAttribute("data-worker-url") || this.workerUrl;

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
		if (this.ws) {
			this.ws.onopen = null;
			this.ws.onmessage = null;
			this.ws.onerror = null;
			this.ws.onclose = null;
			try {
				this.ws.close();
			} catch {}
			this.ws = null;
		}
		this.wsState = DiscordStatus.WS_STATE.DISCONNECTED;

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
		if (this.apiRetryTimer) {
			clearTimeout(this.apiRetryTimer);
			this.apiRetryTimer = null;
		}

		this._clearActivityTimers();
	}

	_clearActivityTimers() {
		for (const timer of this.progressTimers.values()) {
			clearInterval(timer);
		}
		this.progressTimers.clear();
		for (const timer of this.songEndTimers.values()) {
			clearTimeout(timer);
		}
		this.songEndTimers.clear();
	}

	// ============ 可见性和视口管理 ============

	_setupObservers() {
		if ("IntersectionObserver" in window) {
			this._intersectionObserver = new IntersectionObserver(
				(entries) => {
					const [entry] = entries;
					this._isInViewport = entry.isIntersecting;

					if (this._isInViewport && this._pendingData) {
						this.render(this._pendingData);
						this._pendingData = null;
					}
				},
				{ rootMargin: "50px" },
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
			document.removeEventListener(
				"visibilitychange",
				this._visibilityListener,
			);
			this._visibilityListener = null;
		}
	}

	_setupVisibilityListener() {
		this._visibilityListener = () => {
			const wasVisible = this._isVisible;
			this._isVisible = document.visibilityState === "visible";

			if (!wasVisible && this._isVisible) {
				this.fetchInitialData();
			}
		};
		document.addEventListener("visibilitychange", this._visibilityListener);
	}

	// ============ 数据获取 ============

	async fetchInitialData(retryAttempt = 0) {
		if (!this._isVisible) return;

		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 10000);

			const res = await fetch(`${DiscordStatus.CONFIG.apiUrl}${this.userId}`, {
				signal: controller.signal,
			});
			clearTimeout(timeoutId);

			if (!res.ok) throw new Error(`HTTP ${res.status}`);

			const json = await res.json();
			if (json.success) {
				this._hasError = false;
				this.render(json.data);
			} else {
				throw new Error("API returned unsuccessful");
			}
		} catch (err) {
			console.error("[DiscordStatus] API fetch failed:", err.message);

			if (retryAttempt < DiscordStatus.CONFIG.maxApiRetryAttempts) {
				const delay = getExponentialDelay(
					retryAttempt,
					DiscordStatus.CONFIG.baseApiRetryDelay,
				);
				console.log(
					`[DiscordStatus] Retrying API in ${Math.round(delay)}ms...`,
				);
				this.apiRetryTimer = setTimeout(
					() => this.fetchInitialData(retryAttempt + 1),
					delay,
				);
			} else if (!this._hasError) {
				this._hasError = true;
				this._showError();
			}
		}
	}

	// ============ WebSocket 连接 ============

	connectWebSocket() {
		if (
			this.wsState === DiscordStatus.WS_STATE.CONNECTING ||
			this.wsState === DiscordStatus.WS_STATE.CONNECTED
		) {
			return;
		}

		if (
			this.wsReconnectAttempts >= DiscordStatus.CONFIG.maxWsReconnectAttempts
		) {
			console.log(
				"[DiscordStatus] Max WebSocket retries reached, switching to polling mode",
			);
			this.wsState = DiscordStatus.WS_STATE.FAILED;
			this._startPolling();
			return;
		}

		this.wsState = DiscordStatus.WS_STATE.CONNECTING;

		try {
			this.ws = new WebSocket(DiscordStatus.CONFIG.wsUrl);

			this.ws.onopen = () => {
				console.log("[DiscordStatus] WebSocket connected");
				this.wsState = DiscordStatus.WS_STATE.CONNECTED;
				this.wsReconnectAttempts = 0;
				if (this.pollTimer) {
					clearInterval(this.pollTimer);
					this.pollTimer = null;
				}
			};

			this.ws.onmessage = (event) => {
				try {
					const { op, d, t } = JSON.parse(event.data);
					this._handleWsMessage(op, d, t);
				} catch (err) {
					console.error(
						"[DiscordStatus] Failed to parse WebSocket message:",
						err,
					);
				}
			};

			this.ws.onerror = (err) => {
				console.error("[DiscordStatus] WebSocket error:", err);
			};

			this.ws.onclose = () => {
				if (this.heartbeat) {
					clearInterval(this.heartbeat);
					this.heartbeat = null;
				}
				this.wsState = DiscordStatus.WS_STATE.DISCONNECTED;
				if (
					this.wsReconnectAttempts < DiscordStatus.CONFIG.maxWsReconnectAttempts
				) {
					this._scheduleWsReconnect();
				} else {
					this._startPolling();
				}
			};
		} catch (err) {
			console.error("[DiscordStatus] WebSocket connection failed:", err);
			this.wsState = DiscordStatus.WS_STATE.DISCONNECTED;
			this._scheduleWsReconnect();
		}
	}

	_handleWsMessage(op, d, t) {
		switch (op) {
			case 1: // Hello
				this.ws?.send(
					JSON.stringify({
						op: 2,
						d: { subscribe_to_id: this.userId },
					}),
				);
				if (this.heartbeat) {
					clearInterval(this.heartbeat);
				}
				this.heartbeat = setInterval(() => {
					if (this.ws?.readyState === WebSocket.OPEN) {
						this.ws.send(JSON.stringify({ op: 3 }));
					}
				}, d.heartbeat_interval);
				break;

			case 0: // Event
				if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
					const userData = d?.[this.userId] ?? d;
					if (userData) {
						this.render(userData);
					}
				}
				break;
		}
	}

	_scheduleWsReconnect() {
		this.wsReconnectAttempts++;
		this.wsState = DiscordStatus.WS_STATE.RECONNECTING;

		const delay = getExponentialDelay(
			this.wsReconnectAttempts - 1,
			DiscordStatus.CONFIG.baseWsReconnectDelay,
		);

		this.reconnectTimer = setTimeout(() => {
			this.connectWebSocket();
		}, delay);
	}

	_startPolling() {
		if (this.pollTimer) return;
		console.log("[DiscordStatus] Starting HTTP polling mode");
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
		if (!this._isInViewport) {
			this._pendingData = data;
			return;
		}
		this._throttledRender(data);
	}

	async _renderUnsafe(data) {
		if (!this._isVisible) {
			this._pendingData = data;
			return;
		}

		const renderId = ++this._renderId;
		const user = data.discord_user;
		const isOffline = data.discord_status === "offline";
		const status =
			DiscordStatus.CONFIG.statusConfigs[data.discord_status] ||
			DiscordStatus.CONFIG.statusConfigs.offline;
		const activities = (data.activities || [])
			.filter((a) => a.type !== 4)
			.slice(0, 2);
		let historyData = null;

		if (isOffline) {
			if (!this._historyFetched) {
				const remoteHistory = await this._fetchHistoryFromWorker();
				if (this._renderId !== renderId) return;

				this._historyData = remoteHistory?.act
					? remoteHistory
					: this._loadLastActivity();
				this._historyFetched = true;
			}
			historyData = this._historyData;
		} else {
			this._historyFetched = false;
			if (activities.length > 0) {
				this._saveLastActivity(activities[0]);
			}
		}

		const isHistoryMode = isOffline && Boolean(historyData?.act);
		const displayActivities = isHistoryMode ? [historyData.act] : activities;

		const currentKey = displayActivities
			.map(
				(a) => `${a.name}-${a.details}-${a.state}-${a.timestamps?.start || ""}`,
			)
			.join("|");
		if (this._lastActivityKey !== currentKey) {
			this._lastActivityKey = currentKey;
			this._clearActivityTimers();
		}

		const fragment = document.createDocumentFragment();
		const card = this._createCard(
			user,
			status,
			displayActivities,
			data,
			isHistoryMode,
			historyData?.t,
		);
		fragment.appendChild(card);

		this.innerHTML = "";
		this.appendChild(fragment);

		if (!isHistoryMode) {
			displayActivities.forEach((act, idx) => {
				if (act.timestamps?.start) {
					this._startActivityTimer(act, idx);
				}
			});
		}
	}

	// ============ DOM 创建 ============

	_createCard(
		user,
		status,
		activities,
		data,
		isHistory = false,
		historyTimestamp = null,
	) {
		const card = document.createElement("div");
		card.className = "discord-card";

		// Logo
		const logo = document.createElement("div");
		logo.innerHTML = `<svg class="discord-logo" viewBox="0 0 127.14 96.36"><path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.77,77.7,77.7,0,0,0,39.6,85.79a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,10.98A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74c6.62,0,11.76,5.77,11.56,12.74C53.79,60,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74c6.62,0,11.76,5.77,11.56,12.74C96,60,91.06,65.69,84.69,65.69Z"/></svg>`;
		card.appendChild(logo.firstElementChild);

		// 内部分栏
		const inner = document.createElement("div");
		inner.className = "discord-inner";

		// 左侧用户信息
		inner.appendChild(this._createUserSection(user, status, data));

		// 右侧活动
		inner.appendChild(
			this._createActivitiesSection(
				activities,
				isHistory,
				historyTimestamp,
				data,
			),
		);

		card.appendChild(inner);
		return card;
	}

	_createUserSection(user, status, data) {
		const section = document.createElement("div");
		section.className = "discord-left";

		// 头像
		const avatarWrapper = document.createElement("div");
		avatarWrapper.className = "avatar-wrapper";
		avatarWrapper.title = "在 Discord 中查看个人资料";
		avatarWrapper.style.cursor = "pointer";
		avatarWrapper.onclick = () => {
			window.open(
				`https://discord.com/users/${user?.id || this.userId}`,
				"_blank",
			);
		};

		const img = document.createElement("img");
		img.className = "discord-avatar-img";
		img.src = this._getUserAvatarUrl(user);
		img.alt = user?.username || "Discord Avatar";
		img.loading = "eager";
		img.onerror = () => {
			img.src = this._avatarFallbackSvg;
		};

		const statusIndicator = document.createElement("div");
		statusIndicator.className = `status-indicator ${status.class}`;
		statusIndicator.style.backgroundColor = status.color;

		avatarWrapper.appendChild(img);
		avatarWrapper.appendChild(statusIndicator);
		section.appendChild(avatarWrapper);

		// 昵称
		const displayName = document.createElement("div");
		displayName.className = "discord-display-name";
		displayName.textContent =
			user?.global_name || user?.username || "Discord User";
		section.appendChild(displayName);

		// 用户名 (@handle)
		if (user?.username) {
			const username = document.createElement("div");
			username.className = "discord-username";
			username.textContent = `@${user.username}`;
			section.appendChild(username);
		}

		// 自定义状态 (Activity Type 4)
		const customStatus = (data.activities || []).find((a) => a.type === 4);
		if (customStatus && (customStatus.state || customStatus.emoji)) {
			const customStatusEl = document.createElement("div");
			customStatusEl.className = "discord-custom-status";

			if (customStatus.emoji) {
				if (customStatus.emoji.id) {
					const emojiImg = document.createElement("img");
					emojiImg.className = "custom-status-emoji";
					const ext = customStatus.emoji.animated ? "gif" : "png";
					emojiImg.src = `https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${ext}?size=32&quality=lossless`;
					emojiImg.alt = customStatus.emoji.name || "";
					customStatusEl.appendChild(emojiImg);
				} else if (customStatus.emoji.name) {
					const emojiSpan = document.createElement("span");
					emojiSpan.className = "custom-status-emoji";
					emojiSpan.textContent = customStatus.emoji.name;
					customStatusEl.appendChild(emojiSpan);
				}
			}

			if (customStatus.state) {
				const textSpan = document.createElement("span");
				textSpan.className = "custom-status-text";
				textSpan.textContent = customStatus.state;
				customStatusEl.appendChild(textSpan);
			}

			section.appendChild(customStatusEl);
		}

		// 客户端标签
		const clientTags = [];
		if (data.active_on_discord_desktop) clientTags.push("💻 Desktop");
		if (data.active_on_discord_mobile) clientTags.push("📱 Mobile");
		if (data.active_on_discord_web) clientTags.push("🌐 Web");

		if (clientTags.length > 0) {
			const divider = document.createElement("div");
			divider.className = "discord-divider";
			section.appendChild(divider);

			const tagsContainer = document.createElement("div");
			tagsContainer.className = "client-tags";
			clientTags.forEach((tag) => {
				const span = document.createElement("span");
				span.className = "client-tag";
				span.textContent = tag;
				tagsContainer.appendChild(span);
			});
			section.appendChild(tagsContainer);
		}

		return section;
	}

	_getUserAvatarUrl(user) {
		if (user?.avatar) {
			const ext = user.avatar.startsWith("a_") ? "gif" : "png";
			return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=128`;
		}
		if (this.avatarHash) {
			return `https://cdn.discordapp.com/avatars/${user?.id || this.userId}/${this.avatarHash}.png?size=128`;
		}
		const defaultIdx =
			user?.discriminator === "0" || !user?.discriminator
				? Number((BigInt(user?.id || 0) >> 22n) % 6n)
				: Number(user.discriminator) % 5;
		return `https://cdn.discordapp.com/embed/avatars/${defaultIdx}.png`;
	}

	_createActivitiesSection(
		activities,
		isHistory = false,
		historyTimestamp = null,
		data = null,
	) {
		const section = document.createElement("div");
		section.className = "discord-right";

		const container = document.createElement("div");
		container.className = "discord-activities";

		if (activities.length === 0) {
			const empty = document.createElement("div");
			empty.className = "activity-empty";
			empty.textContent = "No activity";
			container.appendChild(empty);
		} else {
			activities.forEach((act, idx) => {
				container.appendChild(
					this._createActivityElement(
						act,
						idx,
						isHistory,
						historyTimestamp,
						data,
					),
				);
			});
		}

		section.appendChild(container);
		return section;
	}

	_createActivityElement(
		act,
		idx,
		isHistory = false,
		historyTimestamp = null,
		data = null,
	) {
		const isMusic = act.type === 2 || act.name === "Spotify";
		const isSpotifyTrack =
			data?.listening_to_spotify && data.spotify?.track_id && isMusic;
		const isStreaming = act.type === 1 && Boolean(act.url);

		const item = document.createElement("div");
		item.className = isHistory
			? "activity-item activity-item-history"
			: "activity-item";
		item.dataset.actIdx = String(idx);

		if (!isHistory && isSpotifyTrack) {
			item.classList.add("is-clickable");
			item.title = "在 Spotify 中打开";
			item.onclick = () => {
				window.open(
					`https://open.spotify.com/track/${data.spotify.track_id}`,
					"_blank",
				);
			};
		} else if (!isHistory && isStreaming) {
			item.classList.add("is-clickable");
			item.title = "观看直播";
			item.onclick = () => {
				window.open(act.url, "_blank");
			};
		}

		// 图片与小角标
		const imgUrl = this._getActivityImageUrl(act, data);
		if (imgUrl) {
			const imgWrapper = document.createElement("div");
			imgWrapper.className = "activity-img-wrapper";

			const img = document.createElement("img");
			img.className = "activity-img";
			img.src = imgUrl;
			img.alt = "";
			img.loading = "lazy";
			img.onerror = () => {
				imgWrapper.replaceWith(this._createIconFallback(act.name, act.type));
			};
			imgWrapper.appendChild(img);

			const smallUrl = this._getSmallImageUrl(act);
			if (smallUrl) {
				const smallImg = document.createElement("img");
				smallImg.className = "activity-small-img";
				smallImg.src = smallUrl;
				smallImg.alt = act.assets?.small_text || "";
				if (act.assets?.small_text) {
					smallImg.title = act.assets.small_text;
				}
				smallImg.loading = "lazy";
				imgWrapper.appendChild(smallImg);
			}

			item.appendChild(imgWrapper);
		} else {
			item.appendChild(this._createIconFallback(act.name, act.type));
		}

		// 内容区
		const content = document.createElement("div");
		content.className = "activity-content";

		// 标题栏（包含名称与 Spotify 均衡器动画）
		const header = document.createElement("div");
		header.className = "activity-header";

		const name = document.createElement("div");
		name.className = "activity-name";
		name.textContent = act.name;
		header.appendChild(name);

		if (isMusic && !isHistory) {
			const eq = document.createElement("div");
			eq.className = "spotify-equalizer";
			eq.title = "正在播放";
			eq.innerHTML = "<span></span><span></span><span></span><span></span>";
			header.appendChild(eq);
		}

		content.appendChild(header);

		if (act.details) {
			const details = document.createElement("div");
			details.className = "activity-details";
			details.textContent = act.details;
			content.appendChild(details);
		}

		if (act.state) {
			const state = document.createElement("div");
			state.className = "activity-state";
			state.textContent = act.state;
			content.appendChild(state);
		}

		// Party (组队人数)
		if (act.party?.size && Array.isArray(act.party.size)) {
			const partyEl = document.createElement("div");
			partyEl.className = "activity-party";
			partyEl.textContent = `👥 队伍 (${act.party.size[0]}/${act.party.size[1]})`;
			content.appendChild(partyEl);
		}

		// 时间/进度（仅非历史模式）
		if (!isHistory && act.timestamps?.start) {
			if (isMusic && act.timestamps?.end) {
				const progress = document.createElement("div");
				progress.className = "music-progress";
				progress.innerHTML = `
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width:0%"></div>
          </div>
          <div class="time-display">0:00 / 0:00</div>
        `;
				content.appendChild(progress);
			} else {
				const elapsed = document.createElement("div");
				elapsed.className = "elapsed-time";
				elapsed.textContent = "🎮 0:00:00";
				content.appendChild(elapsed);
			}
		}

		// 历史时间戳（人性化相对时间）
		if (isHistory && historyTimestamp) {
			const timeTag = document.createElement("div");
			timeTag.className = "activity-history-time";
			timeTag.textContent = `🕐 ${this._formatRelativeTime(historyTimestamp)}`;
			content.appendChild(timeTag);
		}

		item.appendChild(content);
		return item;
	}

	_createIconFallback(name, type) {
		const div = document.createElement("div");
		div.className = "activity-icon-fallback";

		let icon = "🎮";
		if (type === 2) icon = "🎵";
		else if (name?.includes("Code") || name?.includes("Visual Studio"))
			icon = "💻";
		else if (name?.includes("GitHub")) icon = "🐙";
		else if (
			name?.includes("Terminal") ||
			name?.includes("iTerm") ||
			name?.includes("Hyper")
		)
			icon = "⌨️";

		div.textContent = icon;
		return div;
	}

	_getActivityImageUrl(act, data = null) {
		if (
			data?.listening_to_spotify &&
			data.spotify?.album_art_url &&
			(act.name === "Spotify" || act.type === 2)
		) {
			return data.spotify.album_art_url;
		}

		if (!act.assets?.large_image) return null;

		const imgUrl = act.assets.large_image;
		if (imgUrl.startsWith("spotify:")) {
			return `https://i.scdn.co/image/${imgUrl.slice(8)}`;
		}
		if (imgUrl.startsWith("mp:")) {
			return `https://media.discordapp.net/${imgUrl.replace(/^mp:\/?/, "")}`;
		}
		if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://")) {
			return imgUrl;
		}
		if (act.application_id) {
			return `https://cdn.discordapp.com/app-assets/${act.application_id}/${imgUrl}.png`;
		}
		return null;
	}

	_getSmallImageUrl(act) {
		if (!act.assets?.small_image) return null;

		const imgUrl = act.assets.small_image;
		if (imgUrl.startsWith("spotify:")) {
			return `https://i.scdn.co/image/${imgUrl.slice(8)}`;
		}
		if (imgUrl.startsWith("mp:")) {
			return `https://media.discordapp.net/${imgUrl.replace(/^mp:\/?/, "")}`;
		}
		if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://")) {
			return imgUrl;
		}
		if (act.application_id) {
			return `https://cdn.discordapp.com/app-assets/${act.application_id}/${imgUrl}.png`;
		}
		return null;
	}

	// ============ 活动更新 ============

	_startActivityTimer(act, idx) {
		if (!this._isVisible) return;

		const timerKey = `act_${idx}`;
		const isMusic =
			(act.type === 2 || act.name === "Spotify") && act.timestamps?.end;

		if (isMusic) {
			const now = Date.now();
			const end = act.timestamps.end;

			// 若歌曲已到期，不再启动递增定时器，直接触发或计划刷新
			if (now >= end) {
				if (!this.songEndTimers.has(timerKey)) {
					const endTimer = setTimeout(() => {
						this.songEndTimers.delete(timerKey);
						this.fetchInitialData();
					}, DiscordStatus.CONFIG.songEndDelay);
					this.songEndTimers.set(timerKey, endTimer);
				}
				return;
			}

			// 清理旧的进度定时器
			const oldTimer = this.progressTimers.get(timerKey);
			if (oldTimer) {
				clearInterval(oldTimer);
				this.progressTimers.delete(timerKey);
			}

			const updateFn = () => this._updateMusicProgress(act, idx, timerKey);
			updateFn();
			const timer = setInterval(
				updateFn,
				DiscordStatus.CONFIG.progressUpdateInterval,
			);
			this.progressTimers.set(timerKey, timer);
		} else {
			const oldTimer = this.progressTimers.get(timerKey);
			if (oldTimer) {
				clearInterval(oldTimer);
				this.progressTimers.delete(timerKey);
			}

			const updateFn = () => this._updateElapsedTime(act, idx, timerKey);
			updateFn();
			const timer = setInterval(
				updateFn,
				DiscordStatus.CONFIG.progressUpdateInterval,
			);
			this.progressTimers.set(timerKey, timer);
		}
	}

	_updateMusicProgress(act, idx, timerKey) {
		if (!this._isVisible) return;

		const actItem = this.querySelector(`[data-act-idx="${idx}"]`);
		if (!actItem) {
			this._cleanupActivityTimer(timerKey);
			return;
		}

		const fillEl = actItem.querySelector(".progress-bar-fill");
		const timeEl = actItem.querySelector(".time-display");

		if (!fillEl) {
			this._cleanupActivityTimer(timerKey);
			return;
		}

		const now = Date.now();
		const start = act.timestamps?.start || now;
		const end = act.timestamps?.end || start;
		const total = Math.max(1, end - start);
		const current = Math.max(0, Math.min(now - start, total));
		const pct = Math.min(Math.max((current / total) * 100, 0), 100);

		fillEl.style.width = `${pct}%`;

		if (timeEl) {
			const mins = Math.floor(current / 60000);
			const secs = Math.floor((current % 60000) / 1000);
			const totalMins = Math.floor(total / 60000);
			const totalSecs = Math.floor((total % 60000) / 1000);
			timeEl.textContent = `${mins}:${secs.toString().padStart(2, "0")} / ${totalMins}:${totalSecs.toString().padStart(2, "0")}`;
		}

		// 歌曲播放完毕（>= 100% 或当前时间超过结束时间）
		if (pct >= 100 || now >= end) {
			// 立即停止每秒 progress interval，防止它在下一次 tick 时反复清理并重置 endTimer
			const progressTimer = this.progressTimers.get(timerKey);
			if (progressTimer) {
				clearInterval(progressTimer);
				this.progressTimers.delete(timerKey);
			}

			// 计划在 songEndDelay 后刷新一次最新状态
			if (!this.songEndTimers.has(timerKey)) {
				const endTimer = setTimeout(() => {
					this.songEndTimers.delete(timerKey);
					this.fetchInitialData();
				}, DiscordStatus.CONFIG.songEndDelay);
				this.songEndTimers.set(timerKey, endTimer);
			}
		}
	}

	_updateElapsedTime(act, idx, timerKey) {
		if (!this._isVisible) return;

		const actItem = this.querySelector(`[data-act-idx="${idx}"]`);
		if (!actItem) {
			this._cleanupActivityTimer(timerKey);
			return;
		}

		const timeEl = actItem.querySelector(".elapsed-time");
		if (!timeEl) {
			this._cleanupActivityTimer(timerKey);
			return;
		}

		const start = act.timestamps?.start || Date.now();
		const elapsed = Math.max(0, Date.now() - start);
		const hours = Math.floor(elapsed / 3600000);
		const mins = Math.floor((elapsed % 3600000) / 60000);
		const secs = Math.floor((elapsed % 60000) / 1000);

		if (hours > 0) {
			timeEl.textContent = `🎮 ${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
		} else {
			timeEl.textContent = `🎮 ${mins}:${secs.toString().padStart(2, "0")}`;
		}
	}

	_cleanupActivityTimer(timerKey) {
		const timer = this.progressTimers.get(timerKey);
		if (timer) {
			clearInterval(timer);
			this.progressTimers.delete(timerKey);
		}
		const endTimer = this.songEndTimers.get(timerKey);
		if (endTimer) {
			clearTimeout(endTimer);
			this.songEndTimers.delete(timerKey);
		}
	}

	// ============ 历史记录管理 ============

	async _fetchHistoryFromWorker() {
		try {
			const res = await fetch(this.workerUrl, {
				method: "GET",
				headers: { Accept: "application/json" },
			});
			if (!res.ok) return null;
			return await res.json();
		} catch (err) {
			console.debug("[DiscordStatus] Failed to fetch history:", err);
			return null;
		}
	}

	_saveLastActivity(act) {
		if (!act || act.type === 4) return;
		try {
			const data = {
				t: Date.now(),
				act: {
					name: act.name,
					type: act.type,
					details: act.details || "",
					state: act.state || "",
					assets: act.assets || null,
					application_id: act.application_id || null,
					timestamps: act.timestamps || null,
				},
			};
			localStorage.setItem(
				DiscordStatus.CONFIG.localStorageKey,
				JSON.stringify(data),
			);
		} catch (e) {
			console.debug("[DiscordStatus] Failed to save last activity:", e);
		}
	}

	_loadLastActivity() {
		try {
			const raw = localStorage.getItem(DiscordStatus.CONFIG.localStorageKey);
			if (!raw) return null;
			const data = JSON.parse(raw);
			if (data?.t && data?.act) {
				return data;
			}
			return null;
		} catch (e) {
			console.debug("[DiscordStatus] Failed to load last activity:", e);
			return null;
		}
	}

	_formatRelativeTime(timestamp) {
		if (!timestamp) return "";
		const now = Date.now();
		const diff = Math.max(0, now - timestamp);
		const mins = Math.floor(diff / 60000);
		if (mins < 1) return "刚刚";
		if (mins < 60) return `${mins} 分钟前`;
		const hours = Math.floor(mins / 60);
		if (hours < 24) return `${hours} 小时前`;
		const days = Math.floor(hours / 24);
		if (days === 1) return "昨天";
		if (days < 30) return `${days} 天前`;
		const date = new Date(timestamp);
		return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
	}
}

if (!customElements.get("discord-status")) {
	customElements.define("discord-status", DiscordStatus);
}
