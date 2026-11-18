import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_URL || '/api';
const baseURL = (() => {
  const trimmed = rawBaseURL.trim().replace(/\/+$/, '');
  if (!trimmed || trimmed === '/api') return '/api';
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
})();

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to inject token into Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle global response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (
        !window.location.pathname.includes('/login') &&
        !window.location.pathname.includes('/register')
      ) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
