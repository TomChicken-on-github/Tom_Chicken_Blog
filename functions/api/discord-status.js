/**
 * Cloudflare Pages Function: Discord Status Cache
 * 供前端读取历史状态，自动刷新缓存
 */

const LANYARD_API = 'https://api.lanyard.rest/v1/users/';
const USER_ID = '1109821913498407042';
const KV_KEY = 'last_seen';
const CACHE_TTL = 5 * 60 * 1000; // 5分钟缓存

export async function onRequest(context) {
  const { env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/json',
  };

  try {
    // 先尝试读取缓存
    let data = await env.DISCORD_STATUS?.get(KV_KEY, { type: 'json' });
    const now = Date.now();

    // 如果没有缓存或已过期，重新获取
    if (!data || (now - data._cached_at) > CACHE_TTL) {
      data = await fetchAndCache(env);
    }

    if (!data) {
      return new Response(JSON.stringify({ error: 'No data available' }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify(data), { headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

async function fetchAndCache(env) {
  try {
    const res = await fetch(`${LANYARD_API}${USER_ID}`);
    if (!res.ok) return null;

    const json = await res.json();
    if (!json.success) return null;

    const data = json.data;
    const isOffline = data.discord_status === 'offline';
    const activities = (data.activities || []).filter(a => a.type !== 4).slice(0, 2);

    // 读取现有缓存（用于保留最后在线活动）
    const existing = await env.DISCORD_STATUS?.get(KV_KEY, { type: 'json' });

    let result;

    if (isOffline) {
      // 离线时不覆盖活动数据，只更新状态和离线时间
      result = {
        ...(existing || {}),
        status: 'offline',
        _cached_at: Date.now(),
      };
      // 确保有 t 字段（兜底）
      if (!result.t) {
        result.t = Date.now();
      }
    } else {
      // 在线时保存当前状态
      result = {
        t: Date.now(),
        status: data.discord_status,
        act: activities[0] || null,
        activities: activities,
        _cached_at: Date.now(),
      };
    }

    await env.DISCORD_STATUS?.put(KV_KEY, JSON.stringify(result));
    return result;
  } catch (err) {
    console.error('[DiscordStatus] Fetch failed:', err);
    return null;
  }
}
