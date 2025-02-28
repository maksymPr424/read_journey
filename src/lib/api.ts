import axios from 'axios';
import { refreshUser } from './auth';

axios.defaults.baseURL = 'https://readjourney.b.goit.study/api/';
axios.defaults.withCredentials = false;

export const api = axios.create();

export const getCurrentToken = () => {
  return api.defaults.headers.common.Authorization || null;
};

export const setBearerToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status !== 401 || error.config._retry) {
      return Promise.reject(error);
    }

    error.config._retry = true;

    if (isRefreshing) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(api(error.config)), 500);
      });
    }

    isRefreshing = true;

    try {
      const { token } = await refreshUser();
      setBearerToken(token);
      error.config.headers.Authorization = `Bearer ${token}`;
      return api(error.config);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
