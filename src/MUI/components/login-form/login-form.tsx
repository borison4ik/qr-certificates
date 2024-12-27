import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { IAuthForm } from '@/models/response/AuthResponse';
import { LogIn } from 'lucide-react';
import { PAGES_URL } from '@/config/pages-url.config';
import { useAuth } from '@/hooks/useAuth';

const LoginForm: FC = () => {
  const { signIn, isLoading } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAuthForm>({
    mode: 'onChange',
  });
  const navigator = useNavigate();

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    signIn(data.email, data.password, () => {
      navigator(`/${PAGES_URL.DASHBOARD}`, { replace: true });
    });
  };

  return (
    <div className='flex min-h-screen'>
      <form className='w-5/6 max-w-96 m-auto bg-white rounded-lg p-5' onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h4' align='center' gutterBottom>
          Логин
        </Typography>

        <Controller
          control={control}
          rules={{
            required: 'Обязательно для заполнения',
          }}
          name='email'
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={onChange}
              value={value}
              error={!!errors.email}
              helperText={errors.email?.message}
              type='email'
              size='small'
              fullWidth={true}
              label='Email:'
              margin='normal'
            />
          )}
        />

        <Controller
          control={control}
          rules={{
            required: 'Обязательно для заполнения',
          }}
          name='password'
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={onChange}
              value={value}
              error={!!errors.password}
              helperText={errors.password?.message}
              type='password'
              size='small'
              fullWidth={true}
              label='Пароль:'
              margin='normal'
            />
          )}
        />

        <div className='flex items-center gap-5 justify-center mt-5'>
          <LoadingButton type='submit' loading={isLoading} variant='contained' loadingPosition='start' startIcon={<LogIn size={18} />}>
            Войти
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export { LoginForm };
