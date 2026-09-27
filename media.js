const sceneIds = new Set([
  'dali', 'shangrila', 'mangshi', 'jianshui', 'kunming', 'lijiang',
  'fuxian', 'tengchong', 'xishuangbanna', 'yunnan-atlas',
]);

const escapeAttribute = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));

const MEDIA_VERSION = 'quality2';
const assetUrl = (id, width, format) => `assets/${id}-${width}.${format}?v=${MEDIA_VERSION}`;

/** Native source, for explicit zoom/download actions rather than every thumbnail. */
export function originalImageUrl(id) {
  if (!sceneIds.has(id)) return '';
  return id === 'yunnan-atlas' ? 'assets/yunnan-atlas-original.png' : `assets/${id}.webp`;
}

/** Responsive scene media. Originals remain available to the souvenir renderer. */
export function sceneImage(id, {
  className = '',
  alt = '',
  priority = false,
  fullResolution = false,
  sizes = '(max-width: 700px) 100vw, (max-width: 1100px) 60vw, 720px',
} = {}) {
  if (!sceneIds.has(id)) return '';
  const atlas = id === 'yunnan-atlas';
  const width = atlas ? 1254 : 1586;
  const height = atlas ? 1254 : 992;
  const sourceSet = (format) => (atlas ? [480, 960, 1254] : [480, 960, 1440, 1586])
    .map((size) => `${!atlas && format === 'webp' && size === width ? originalImageUrl(id) : assetUrl(id, size, format)} ${size}w`).join(', ');
  const safeSizes = escapeAttribute(sizes);
  const fallback = fullResolution ? originalImageUrl(id) : assetUrl(id, 960, 'webp');
  const sources = fullResolution ? '' : `<source type="image/avif" srcset="${sourceSet('avif')}" sizes="${safeSizes}"><source type="image/webp" srcset="${sourceSet('webp')}" sizes="${safeSizes}">`;
  // display:contents preserves existing image-grid and absolute-position layouts.
  return `<picture class="scene-picture" style="display:contents">${sources}<img src="${fallback}" class="${escapeAttribute(className)}" alt="${escapeAttribute(alt)}" width="${width}" height="${height}" loading="${priority ? 'eager' : 'lazy'}" fetchpriority="${priority ? 'high' : 'auto'}" decoding="async"></picture>`;
}
