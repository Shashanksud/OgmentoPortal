import axios from 'axios';
import { BASE_URL } from '@/utils/Urls';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function isTokenExpired(token: string): boolean {
  try {
    const base64Payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(base64Payload));
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedPayload.exp < currentTime;
  } catch (error) {
    return true;
  }
}

function handleTokenExpiry() {
  localStorage.removeItem('authToken');
  window.location.href = '/login';
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token: string | null = localStorage.getItem('authToken');
    const myConfig = config;
    if (token && !isTokenExpired(token)) {
      myConfig.headers.Authorization = `Bearer ${token}`;
    } else if (token) {
      handleTokenExpiry();
      return Promise.reject(new Error('Token expired'));
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      handleTokenExpiry();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
