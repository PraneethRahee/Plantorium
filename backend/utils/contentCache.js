/**
 * Simple in-memory cache for site content.
 * Reduces MongoDB reads when content rarely changes.
 */
let cachedContent = null;
let cachedEtag = null;

const createEtag = (data) => {
  const str = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return `"${hash.toString(36)}"`;
};

export function getCached() {
  return cachedContent;
}

export function getCachedEtag() {
  return cachedEtag;
}

export function setCache(content) {
  cachedContent = content;
  cachedEtag = createEtag(content);
}

export function invalidateCache() {
  cachedContent = null;
  cachedEtag = null;
}
