import axios from 'axios';
import { BASE_URL } from '@/utils/Urls';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function handleTokenExpiry() {
  localStorage.removeItem('authToken');
  window.location.href = '/login';
}

axiosInstance.interceptors.request.use(
  (config) => {
    const myConfig = config;
    const token: string | null = localStorage.getItem('authToken');
    if (token) {
      myConfig.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorResponse = error.response;
    if (
      errorResponse?.statusCode === 401 &&
      errorResponse.data?.exceptionType === 'UnauthorizedAccessException' &&
      errorResponse.data?.Description.includes('Lifetime validation failed')
    ) {
      handleTokenExpiry();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
