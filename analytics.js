import {analyticsConfig} from './analytics-config.js?v=20260927-4';

const PUBLIC_URL = 'https://asimovvong.github.io/xinxiang-caiyun/';
const PREFERENCE_KEY = 'caiyun-analytics-enabled-v1';
const SCRIPT_URL = 'https://gc.zgo.at/count.v5.js';
const SCRIPT_INTEGRITY = 'sha384-atnOLvQb9t+jTSipvd75X2yginT4PjVbqDdlJAmxMm+wYElFmeR6EmLP5bYeoRVQ';
const TITLES = Object.freeze({
  pageview: '心向彩云 · 网站访问',
  explore_start: '开始探索',
  explore_complete: '完成探索',
  ai_copy_success: '成功复制 AI 分析文字',
  card_generated: '旅行小卡已生成',
  share_click: '打开分享选项',
  share_native_success: '系统分享成功返回',
  share_link_copy: '分享链接复制成功',
  card_download_click: '点击保存旅行小卡',
});
export const ANALYTICS_EVENTS = Object.freeze(Object.keys(TITLES));

const CHANNELS = Object.freeze({
  xiaohongshu: Object.freeze(['xiaohongshu', 'note01_link']),
  xiaohongshu_qr: Object.freeze(['xiaohongshu', 'note01_qr']),
  card: Object.freeze(['card', 'card']),
  friend: Object.freeze(['friend', 'friend']),
});

/** Creates a public link from a fixed channel; never copies the visitor's URL. */
export function shareUrl(channel = 'friend') {
  const [source, campaign] = Object.hasOwn(CHANNELS, channel) ? CHANNELS[channel] : CHANNELS.friend;
  const url = new URL(PUBLIC_URL);
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_campaign', campaign);
  return url.href;
}

/** Only complete, predeclared source/campaign pairs may leave the browser. */
export function attributionLabel(search = '', hasReferrer = false) {
  let query;
  try { query = new URLSearchParams(typeof search === 'string' ? search : ''); }
  catch { return hasReferrer ? 'other' : 'direct'; }
  const source = query.get('utm_source');
  const campaign = query.get('utm_campaign');
  const known = Object.values(CHANNELS).some(([s, c]) => s === source && c === campaign);
  return known ? `${source} / ${campaign}` : hasReferrer ? 'other' : 'direct';
}

/** Pure payload boundary: supplied answer fields, raw URLs and titles are ignored. */
export function buildEventPayload(event, {search = '', hasReferrer = false} = {}) {
  if (typeof event !== 'string' || !Object.hasOwn(TITLES, event)) return null;
  const isEvent = event !== 'pageview';
  return {
    path: isEvent ? event : '/',
    title: TITLES[event],
    referrer: attributionLabel(search, hasReferrer),
    event: isEvent,
    no_session: isEvent,
  };
}

/** count.js adds raw location.search as `q`; only this strict projection may reach its URL builder. */
export function sanitizeGoatCounterData(data = {}) {
  if (!data || typeof data !== 'object') return {p: null};
  const event = data.e === true ? data.p : data.p === '/' ? 'pageview' : '';
  const safe = buildEventPayload(event);
  if (!safe) return {p: null};
  const labels = ['direct', 'other', ...Object.values(CHANNELS).map(([source, campaign]) => `${source} / ${campaign}`)];
  return {
    p: safe.path,
    t: safe.title,
    r: labels.includes(data.r) ? data.r : 'other',
    e: safe.event,
    ns: safe.no_session,
    b: [0, 150, 151, 152, 153].includes(data.b) ? data.b : 0,
  };
}

/** Dependency injection supports offline privacy tests without contacting a service. */
export function createAnalytics(config = analyticsConfig, env = globalThis) {
  let phase = 'idle';
  let queue = [];
  let preferenceOverride;
  let pageviewSent = false;
  let script;
  let loadGeneration = 0;
  let protectedApi;

  const win = () => env.window;
  const site = () => typeof config?.site === 'string' && /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(config.site) ? config.site : '';

  function disabledReason() {
    if (!site()) return 'not-configured';
    const browser = win();
    if (!browser?.document || !browser?.location) return 'no-browser';
    if (browser.location.protocol !== 'https:' || browser.location.hostname !== 'asimovvong.github.io') return 'local-or-preview';
    const nav = browser.navigator || {};
    const dnt = String(nav.doNotTrack || browser.doNotTrack || '').toLowerCase();
    if (dnt === '1' || dnt === 'yes') return 'do-not-track';
    if (nav.globalPrivacyControl === true) return 'global-privacy-control';
    if (preferenceOverride === false) return 'visitor-disabled';
    if (preferenceOverride === undefined) {
      try {
        if (browser.localStorage?.getItem(PREFERENCE_KEY) === 'disabled') return 'visitor-disabled';
      } catch { /* Storage restrictions never interrupt the questionnaire. */ }
    }
    return '';
  }

  function status() {
    const reason = disabledReason();
    return {
      configured: Boolean(site()),
      enabled: !reason,
      loaded: phase === 'ready',
      loading: phase === 'loading' && !reason,
      reason: reason || (phase === 'error' ? 'load-or-send-failed' : ''),
    };
  }

  function payload(event) {
    const browser = win();
    return buildEventPayload(event, {
      search: browser?.location?.search || '',
      // The referrer itself is never read into a transmitted field.
      hasReferrer: Boolean(browser?.document?.referrer),
    });
  }

  function send(data) {
    if (!data || disabledReason()) return false;
    try {
      const api = win()?.goatcounter;
      if (typeof api?.count !== 'function') return false;
      api.count(data);
      return true; // Local dispatch only: this is not server receipt confirmation.
    } catch {
      phase = 'error';
      return false;
    }
  }

  function ready() {
    if (disabledReason()) { queue = []; return; }
    const api = win()?.goatcounter;
    if (typeof api?.count !== 'function' || typeof api?.get_data !== 'function') { phase = 'error'; queue = []; return; }
    if (protectedApi !== api) {
      const getData = api.get_data;
      api.get_data = (vars) => sanitizeGoatCounterData(getData(vars));
      protectedApi = api;
    }
    phase = 'ready';
    if (!pageviewSent) pageviewSent = send(payload('pageview'));
    const pending = queue;
    queue = [];
    for (const event of pending) send(payload(event));
  }

  function init() {
    if (disabledReason() || phase === 'loading' || phase === 'ready' || phase === 'error') return status();
    const browser = win();
    const attribution = payload('pageview');
    // Explicit defaults prevent count.js from reading document titles or raw paths.
    browser.goatcounter = {
      ...(browser.goatcounter || {}),
      no_onload: true,
      no_events: true,
      endpoint: `https://${site()}.goatcounter.com/count`,
      ...attribution,
    };
    if (typeof browser.goatcounter.count === 'function') { ready(); return status(); }
    try {
      phase = 'loading';
      const generation = ++loadGeneration;
      script = browser.document.createElement('script');
      script.id = 'caiyun-analytics-script';
      script.async = true;
      script.referrerPolicy = 'no-referrer';
      script.crossOrigin = 'anonymous';
      script.integrity = SCRIPT_INTEGRITY;
      script.src = SCRIPT_URL;
      script.onload = () => { if (generation === loadGeneration) ready(); };
      script.onerror = () => {
        if (generation !== loadGeneration) return;
        phase = 'error';
        queue = [];
      };
      browser.document.head.appendChild(script);
    } catch { phase = 'error'; queue = []; }
    return status();
  }

  function trackEvent(event) {
    if (typeof event !== 'string' || !Object.hasOwn(TITLES, event) || disabledReason() || phase === 'error') return false;
    if (event === 'pageview') {
      init();
      return pageviewSent || phase === 'loading';
    }
    if (phase === 'idle') init();
    if (phase === 'ready') return send(payload(event));
    if (phase === 'loading') {
      if (queue.length >= 20) return false;
      queue.push(event); // Fixed event names only, no answer data or timestamps.
      return true;
    }
    return false;
  }

  function setEnabled(enabled) {
    if (typeof enabled !== 'boolean') return status();
    preferenceOverride = enabled;
    try { win()?.localStorage?.setItem(PREFERENCE_KEY, enabled ? 'enabled' : 'disabled'); }
    catch { /* The in-memory preference still takes effect. */ }
    if (!enabled) {
      queue = [];
      ++loadGeneration;
      if (phase === 'loading') {
        script?.remove?.();
        phase = 'idle';
      }
    } else {
      init();
    }
    return status();
  }

  return {initAnalytics: init, track: trackEvent, analyticsStatus: status, setAnalyticsEnabled: setEnabled};
}

const analytics = createAnalytics();
export const initAnalytics = analytics.initAnalytics;
export const track = analytics.track;
export const analyticsStatus = analytics.analyticsStatus;
export const setAnalyticsEnabled = analytics.setAnalyticsEnabled;
