/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Send } from 'lucide-react';
import { ICertificateCreate } from '@/models/certificate/ICertificate';
import { useCreateCertificate } from '@/hooks/queries';
import { PAGES_URL } from '@/config/pages-url.config';
import { InputLabel, MenuItem, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import { certificateThemplatesNames } from '../data';

type ICertificateCreateFormProps = Omit<ICertificateCreate, 'templateId'> & { templateId: string };

const AddCertificateForm: FC = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ICertificateCreateFormProps>({
    mode: 'onChange',
    defaultValues: {
      templateId: '1',
    },
  });
  const navigator = useNavigate();
  const { mutateAsync, isPending } = useCreateCertificate();

  const onSubmit: SubmitHandler<ICertificateCreateFormProps> = async (data) => {
    const sendData: ICertificateCreate = {
      title: data.title,
      totalPrice: +data.totalPrice,
      text: data.text || '',
      spendPrice: 0,
      templateId: +data.templateId,
      isActivated: true,
    };
    await mutateAsync(sendData);
    reset();
    navigator(`/${PAGES_URL.DASHBOARD}/${PAGES_URL.CERTIFICATES_LIST}`);
  };

  return (
    <form className='h-full' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        rules={{
          required: 'Обязательно для заполнения',
        }}
        name='title'
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            error={!!errors.title}
            helperText={errors.title?.message}
            type='text'
            size='small'
            fullWidth={true}
            label='Имя:'
            margin='normal'
          />
        )}
      />

      <Controller
        control={control}
        rules={{
          required: 'Обязательно для заполнения',
        }}
        name='totalPrice'
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            error={!!errors.totalPrice}
            helperText={errors.totalPrice?.message}
            type='number'
            size='small'
            fullWidth={true}
            label='Стоимость:'
            margin='normal'
          />
        )}
      />

      <Controller
        control={control}
        name='text'
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            error={!!errors.text}
            helperText={errors.text?.message}
            type='text'
            size='small'
            multiline={true}
            fullWidth={true}
            label='Текст:'
            margin='normal'
          />
        )}
      />

      <Controller
        control={control}
        name='templateId'
        render={({ field: { onChange, value = '1' } }) => (
          <FormControl fullWidth sx={{ minWidth: 150 }} size='small' margin='normal'>
            <InputLabel id='theme-id-for-label'>Шаблон сертификата:</InputLabel>
            <Select
              value={value}
              labelId='theme-id-for-label'
              label='Шаблон сертификата:'
              error={!!errors.templateId}
              defaultValue={'1'}
              onChange={(event: SelectChangeEvent) => {
                onChange(event.target.value);
              }}>
              {certificateThemplatesNames.map((item) => (
                <MenuItem value={item.id.toString()}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <FormControl size='small' sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }} margin='normal'>
        <LoadingButton type='submit' loading={isPending} variant='contained' loadingPosition='start' startIcon={<Send size={18} />}>
          Создать
        </LoadingButton>
      </FormControl>
    </form>
  );
};

export { AddCertificateForm };
