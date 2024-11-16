import axios from 'axios';
import store from '../store';

const BASE_URL = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state?.auth?.accessToken || localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('Token is missing');
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Интерсептор для обработки ошибок ответа
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized - logging out');
      localStorage.removeItem('token');
      store.dispatch({ type: 'auth/logout' });
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
