import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9000/api',
  withCredentials: true
});

// Add CSRF token to requests
api.interceptors.request.use(config => {
  const token = document.cookie.split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
  
  if (token) {
    // Use lowercase header key to match server-side check
    config.headers['x-xsrf-token'] = token;
  }
  return config;
});

export default api;