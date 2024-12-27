import { LoginForm } from '@/components/LoginForm';
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
