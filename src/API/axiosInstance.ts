import { Cookies } from 'js-cookie';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token'); // Get the token from cookies
    if (token && config.headers['Authorization'] === undefined) {
      // Attach token only if it's not already added
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
