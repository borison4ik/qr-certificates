import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Send } from 'lucide-react';
import { ICertificateUpdate } from '@/models/certificate/ICertificate';
import { useUpdateCertificate } from '@/hooks/queries';
import { PAGES_URL } from '@/config/pages-url.config';
import { FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField } from '@mui/material';
import { certificateThemplatesNames } from '../data';
import LoadingButton from '@mui/lab/LoadingButton';
import { useLoadCertificateData } from '../useLoadCertificateData';

export type ICertificateUpdateFormProps = Omit<ICertificateUpdate, 'templateId'> & { templateId: string };

const UpdateCertificateForm: FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ICertificateUpdateFormProps>({
    mode: 'onChange',
    defaultValues: {
      templateId: '1',
    },
  });
  const { id } = useParams();

  useLoadCertificateData(reset);

  const navigator = useNavigate();
  const { mutateAsync, isPending } = useUpdateCertificate(id || '');
  const [checked, setChecked] = useState(true);
  const handleActiveSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const onSubmit: SubmitHandler<ICertificateUpdateFormProps> = async (data) => {
    const sendData: ICertificateUpdate = {
      title: data.title,
      totalPrice: data.totalPrice ? +data.totalPrice : 0,
      text: data.text,
      spendPrice: data.spendPrice ? +data.spendPrice : 0,
      templateId: +data.templateId,
      isActivated: checked,
    };
    if (id) {
      await mutateAsync({ data: sendData });
      navigator(`/${PAGES_URL.DASHBOARD}/${PAGES_URL.CERTIFICATES_LIST}`);
    }
  };

  return (
    <form className='h-full' onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <FormControlLabel control={<Switch checked={checked} onChange={handleActiveSwitch} inputProps={{ 'aria-label': 'controlled' }} />} label='Активен' />
      </FormGroup>

      <Controller
        control={control}
        name='title'
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            error={!!errors.title}
            helperText={errors.title?.message}
            type='text'
            size='small'
            focused={!!value}
            fullWidth={true}
            label='Название:'
            margin='normal'
          />
        )}
      />

      <Controller
        control={control}
        name='totalPrice'
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            error={!!errors.totalPrice}
            helperText={errors.totalPrice?.message}
            type='number'
            size='small'
            focused={true}
            fullWidth={true}
            label='Стоимость:'
            margin='normal'
          />
        )}
      />

      <Controller
        control={control}
        name='spendPrice'
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            error={!!errors.spendPrice}
            helperText={errors.spendPrice?.message}
            type='number'
            size='small'
            focused={true}
            fullWidth={true}
            label='Потрачено:'
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
            focused={!!value}
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
          Обновить
        </LoadingButton>
      </FormControl>
    </form>
  );
};

export { UpdateCertificateForm };
