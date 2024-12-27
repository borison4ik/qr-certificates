import { LoginForm } from '@/MUI/components/login-form/login-form';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to='/dashboard' />;
  }

  return <LoginForm />;
};

export { LoginPage };
