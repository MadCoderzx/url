const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export async function placeholderFetch() {
  return Promise.resolve({ data: [] });
}
