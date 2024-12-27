import { IAuthResponse } from '@/models/response/AuthResponse';
import axios, { CreateAxiosDefaults } from 'axios';
import { errorCatch } from './error';

export const API_URL = import.meta.env.VITE_API_URL;

const options: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('token');

  if (config?.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if ((error?.response?.status === 401 || errorCatch(error) === 'jwt expired' || errorCatch(error) === 'jwt must be provided') && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<IAuthResponse>(`${API_URL}/auth/login/access-token`, {
          withCredentials: true,
        });
        localStorage.setItem('token', response.data.accessToken);
        return axiosWithAuth.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') localStorage.removeItem('token');
      }
    }

    throw error;
  },
);

export { axiosClassic, axiosWithAuth };
