/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/ui/buttons/Button';
import { Field } from '@/ui/fields/Field';
import { Send } from 'lucide-react';
import { ICertificateCreate } from '@/models/certificate/ICertificate';
import { useCreateCertificate } from '@/hooks/queries';
import { PAGES_URL } from '@/config/pages-url.config';
import Loader from '@/ui/Loader';
import { Select } from '@/ui/fields/Select';

const AddCertificateForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICertificateCreate>({
    mode: 'onChange',
  });
  const navigator = useNavigate();
  const { mutateAsync, isPending } = useCreateCertificate();

  const onSubmit: SubmitHandler<ICertificateCreate> = async (data) => {
    const sendData: ICertificateCreate = {
      title: data.title,
      totalPrice: +data.totalPrice,
      text: data.text || '',
      spendPrice: 0,
      templateId: 1,
      isActivated: true,
    };
    await mutateAsync(sendData);
    reset();
    navigator(`/${PAGES_URL.DASHBOARD}/${PAGES_URL.CERTIFICATES_LIST}`);
  };

  return (
    <div className='flex w-full h-full overflow-y-auto'>
      <form className='w-full h-full bg-zinc-700 p-3 rounded-md' onSubmit={handleSubmit(onSubmit)}>
        <Field
          id='title'
          label='Имя сертификата:'
          placeholder='Ввести имя:'
          type='text'
          extra='mb-4'
          {...register('title', {
            required: 'Имя обязателен!',
          })}
        />

        <Field
          id='totalPrice'
          label='Стоимость: '
          placeholder='Ввести стоимость: '
          type='text'
          isNumber={true}
          {...register('totalPrice', {
            required: 'Стоимость обязательна!',
          })}
          extra='mb-6'
        />

        <Field id='text' label='Текст: ' placeholder='Ввести текст: ' type='text' {...register('text')} extra='mb-6' />

        <Select
          id='templateId'
          label='Тема: '
          defaultValue={1}
          options={[
            { value: 1, option: 'Розовый' },
            { value: 2, option: 'Синий' },
          ]}
          {...register('templateId', {
            required: 'Тема обязательна!',
            valueAsNumber: true,
          })}
          extra='mb-6'
        />

        <div className='flex items-center gap-5 justify-end'>
          <Button className='flex items-center gap-x-3'>{isPending ? <Loader /> : <Send size={20} />} Создать</Button>
        </div>
      </form>
    </div>
  );
};

export { AddCertificateForm };
