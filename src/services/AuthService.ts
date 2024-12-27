import { axiosClassic } from '@/http';
import { IAuthResponse } from '@/models/response/AuthResponse';
import { AxiosResponse } from 'axios';

class AuthService {
  async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    const response = await axiosClassic.post<IAuthResponse>('/auth/login', {
      email,
      password,
    });

    if (response.data.accessToken) localStorage.setItem('token', response.data.accessToken);

    return response;
  }

  async registration(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    const response = await axiosClassic.post<IAuthResponse>('/auth/register', {
      email,
      password,
    });

    if (response.data.accessToken) localStorage.setItem('token', response.data.accessToken);

    return response;
  }

  async checkAuth(): Promise<AxiosResponse<IAuthResponse>> {
    const response = await axiosClassic.get<IAuthResponse>('/auth/login/access-token');

    if (response.data.accessToken) localStorage.setItem('token', response.data.accessToken);

    return response;
  }

  async logout(): Promise<boolean> {
    const response = await axiosClassic.post('/auth/logout');

    if (response.data) {
      localStorage.removeItem('token');
    }

    return response.data;
  }
}

export const authService = new AuthService();
