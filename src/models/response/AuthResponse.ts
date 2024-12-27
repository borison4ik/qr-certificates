import { IUser } from '../user/IUser';

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}

export interface IAuthForm {
  email: string;
  password: string;
}
