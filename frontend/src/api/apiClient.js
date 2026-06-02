const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export function getBackendBaseUrl() {
  return API_BASE_URL.replace(/\/api$/, '');
}

export async function fetchUrls(clientId) {
  const response = await fetch(`${API_BASE_URL}/urls?clientId=${encodeURIComponent(clientId)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch URLs');
  }
  const body = await response.json();
  return body.urls || [];
}

export async function createUrl({ originalUrl, clientId }) {
  const response = await fetch(`${API_BASE_URL}/urls`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ originalUrl, clientId }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || 'Failed to create short URL');
  }

  return response.json();
}

export async function deleteUrl(id, clientId) {
  const response = await fetch(`${API_BASE_URL}/urls/${id}?clientId=${encodeURIComponent(clientId)}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || 'Failed to delete URL');
  }
}
