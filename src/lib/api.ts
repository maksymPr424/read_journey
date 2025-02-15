// WF2afa13

import axios from 'axios';
import { logOut } from './auth';

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
let failedRequestsQueue: any[] = [];

api.interceptors.response.use(
  (response) => {
    console.log('Intercepted response:', response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response?.status + ' from api');

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then((token) => {
            // setBearerToken(token);
            console.log(token);

            // return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const currentToken = getCurrentToken();
        console.log(currentToken);

        if (!currentToken) {
          throw new Error('No refresh token available');
        }

        const { data } = await api('users/current/refresh');

        console.log('🔄 Refresh response:', data);

        setBearerToken(data.token);
        originalRequest.headers['Authorization'] = `Bearer ${data.token}`;

        failedRequestsQueue.forEach((req) => req.resolve(data.token));
        failedRequestsQueue = [];

        return api(originalRequest);
      } catch (refreshError) {
        console.error('❌ Refresh token failed, logging out...');

        failedRequestsQueue.forEach((req) => req.reject(refreshError));
        failedRequestsQueue = [];

        await logOut();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
