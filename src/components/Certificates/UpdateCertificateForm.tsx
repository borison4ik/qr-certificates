import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/ui/buttons/Button';
import { Field } from '@/ui/fields/Field';
import { Send } from 'lucide-react';
import { ICertificateUpdate } from '@/models/certificate/ICertificate';
import { useUpdateCertificate } from '@/hooks/queries';
import { Select } from '@/ui/fields/Select';
import { useLoadCertificateData } from './useLoadCertificateData';
import { PAGES_URL } from '@/config/pages-url.config';
import Loader from '@/ui/Loader';

const UpdateCertificateForm: FC = () => {
  const { register, handleSubmit, reset } = useForm<ICertificateUpdate>({
    mode: 'onChange',
  });
  const { id } = useParams();

  useLoadCertificateData(reset);

  const navigator = useNavigate();
  const { mutateAsync, isPending } = useUpdateCertificate(id || '');

  const onSubmit: SubmitHandler<ICertificateUpdate> = async (data) => {
    const sendData: ICertificateUpdate = {
      title: data.title,
      totalPrice: data.totalPrice,
      text: data.text || '',
      spendPrice: data.spendPrice,
      templateId: data.templateId,
      isActivated: Boolean(data.isActivated),
    };
    if (id) {
      await mutateAsync({ data: sendData });
      reset();
      navigator(`/${PAGES_URL.DASHBOARD}/${PAGES_URL.CERTIFICATES_LIST}`);
    }
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
            valueAsNumber: true,
          })}
          extra='mb-4'
        />

        <Field
          id='spendPrice'
          label='Потрачено: '
          placeholder='Ввести потраченую сумму: '
          type='text'
          isNumber={true}
          {...register('spendPrice', {
            required: 'Потрачено обязательна!',
            valueAsNumber: true,
          })}
          extra='mb-4'
        />

        <Field id='text' label='Текст: ' placeholder='Ввести текст: ' type='text' {...register('text')} extra='mb-4' />

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
          extra='mb-4'
        />

        <Select
          id='isActivated'
          label='Активен: '
          defaultValue={1}
          options={[
            { value: 1, option: 'Активен' },
            { value: 0, option: 'Не активен' },
          ]}
          {...register('isActivated', {
            required: 'Автивность обязательна!',
            valueAsNumber: true,
          })}
          extra='mb-4'
        />

        <div className='flex items-center gap-5 justify-end'>
          <Button className='flex items-center gap-x-3' disabled={isPending}>
            {isPending ? <Loader /> : <Send size={20} />} Обновить
          </Button>
        </div>
      </form>
    </div>
  );
};

export { UpdateCertificateForm };
