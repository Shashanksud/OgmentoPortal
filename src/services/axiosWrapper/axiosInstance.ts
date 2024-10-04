import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_URL } from '@/utils/url';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const myConfig = config;
    const token = Cookies.get('Auth');
    if (token && config.headers.Authorization === undefined) {
      myConfig.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
