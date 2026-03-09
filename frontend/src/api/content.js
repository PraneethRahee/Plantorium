const API_BASE = import.meta.env.VITE_API_URL || '';

export async function fetchContent() {
  const res = await fetch(`${API_BASE}/api/content`);
  if (!res.ok) {
    const err = new Error('Failed to fetch content');
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export function getImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_BASE || ''}${url}`;
}
