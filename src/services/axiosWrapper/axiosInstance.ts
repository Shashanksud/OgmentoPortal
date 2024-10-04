import Cookies from 'js-cookie';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:5002',
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
