import { errorCatch } from '@/http/error';
import { IUser } from '@/models/user/IUser';
import { authService } from '@/services/AuthService';
import { FC, useState, createContext } from 'react';

interface IAuthProviderProps {
  children: React.ReactNode;
}

interface IAuthUser {
  user: IUser;
  isAuth: boolean;
}

const initialState: IAuthUser = {
  user: {} as IUser,
  isAuth: false,
};

interface IAuthContext {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string, cb: () => void) => void;
  registration: (email: string, password: string, cb: () => void) => void;
  checkAuth: () => void;
  sigOut: (cb: () => void) => void;
}

export const AuthContext = createContext({
  user: {} as IUser,
  isAuth: false,
  isLoading: false,
} as IAuthContext);

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<IAuthUser>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string, cb: () => void) => {
    try {
      setIsLoading(true);
      const responce = await authService.login(email, password);

      setAuthUser({
        user: responce.data.user,
        isAuth: true,
      });

      cb();
    } catch (error) {
      console.log('auth service', errorCatch(error));
    } finally {
      setIsLoading(false);
    }
  };

  const registration = async (email: string, password: string, cb: () => void) => {
    try {
      setIsLoading(true);

      const responce = await authService.registration(email, password);
      setAuthUser({
        user: responce.data.user,
        isAuth: true,
      });
      cb();
    } catch (error) {
      console.log(errorCatch(error));
    } finally {
      setIsLoading(false);
    }
  };

  const sigOut = async (cb: () => void) => {
    try {
      setIsLoading(true);
      const responce = await authService.logout();
      console.log(responce);
      if (responce) {
        setAuthUser({
          user: {} as IUser,
          isAuth: false,
        });
        cb();
      }
    } catch (error) {
      console.log(errorCatch(error));
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const responce = await authService.checkAuth();
      console.log('checkAuth', responce);
      setAuthUser({
        user: responce.data.user,
        isAuth: true,
      });
    } catch (error) {
      console.log(errorCatch(error));
    } finally {
      setIsLoading(false);
    }
  };

  const value = { user: authUser.user, isAuth: authUser.isAuth, isLoading, signIn, registration, sigOut, checkAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
