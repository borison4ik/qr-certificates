import { axiosWithAuth } from '@/http';
import { IUser } from '@/models/user/IUser';
import { AxiosResponse } from 'axios';

export default class UserService {
  static async fetchProfile(): Promise<AxiosResponse<IUser>> {
    return axiosWithAuth.get<IUser>('/user/profile');
  }
}
