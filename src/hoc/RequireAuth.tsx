import { PAGES_URL } from '@/config/pages-url.config';
import { useAuth } from '@/hooks/useAuth';
import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
  children: React.ReactNode;
}
const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to={`/${PAGES_URL.LOGIN}`} replace={true} />;
  }

  return children;
};

export { RequireAuth };
