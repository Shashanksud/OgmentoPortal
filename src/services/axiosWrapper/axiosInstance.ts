import axios from 'axios';
import { BASE_URL } from '@/utils/url';

const axiosInstance = axios.create({
  baseURL: 'https://ogmento-apis.azurewebsites.net/',
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const myConfig = config;
    const token: string | null = localStorage.getItem('authToken');
    if (token !== null && token.trim().length !== 0) {
      myConfig.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
