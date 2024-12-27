import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/ui/buttons/Button';
import { Field } from '@/ui/fields/Field';
import { Heading } from '@/ui/Heading';
import { IAuthForm } from '@/models/response/AuthResponse';
import { LogIn } from 'lucide-react';
import { PAGES_URL } from '@/config/pages-url.config';
import Loader from '@/ui/Loader';
import { useAuth } from '@/hooks/useAuth';

const LoginForm: FC = () => {
  const { signIn } = useAuth();
  const { register, handleSubmit, reset } = useForm<IAuthForm>({
    mode: 'onChange',
  });
  const navigator = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    try {
      setIsPending(true);
      signIn(data.email, data.password, () => {
        reset();
        setIsPending(false);
        navigator(`/${PAGES_URL.DASHBOARD}`, { replace: true });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex min-h-screen'>
      <form className='w-5/6 max-w-96 m-auto bg-zinc-700 rounded-lg p-5' onSubmit={handleSubmit(onSubmit)}>
        <Heading title='Логин' />

        <Field
          id='email'
          label='Email:'
          placeholder='Ввести email:'
          type='email'
          extra='mb-4'
          {...register('email', {
            required: 'Email is required!',
          })}
        />

        <Field
          id='password'
          label='Пароль: '
          placeholder='Ввести пароль: '
          type='password'
          {...register('password', {
            required: 'Password is required!',
          })}
          extra='mb-6'
        />

        <div className='flex items-center gap-5 justify-center'>
          <Button className='flex items-center gap-x-3'>{isPending ? <Loader /> : <LogIn size={20} />} Войти</Button>
        </div>
      </form>
    </div>
  );
};

export { LoginForm };
