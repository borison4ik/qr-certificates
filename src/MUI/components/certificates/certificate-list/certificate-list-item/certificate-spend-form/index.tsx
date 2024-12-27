import { useUpdateCertificate } from '@/hooks/queries';
import { ICertificate, ICertificateUpdate } from '@/models/certificate/ICertificate';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type ISpendForm = Pick<ICertificateUpdate, 'spendPrice'>;
interface ISpendFormProps {
  item: ICertificate;
  setSpendModalOpen: (open: boolean) => void;
}
const CertificateSpendForm: FC<ISpendFormProps> = ({ item, setSpendModalOpen }) => {
  const { handleSubmit, control, reset } = useForm<ISpendForm>({
    mode: 'onChange',
    defaultValues: {
      spendPrice: item.totalPrice - item.spendPrice,
    },
  });

  const { mutateAsync, isPending } = useUpdateCertificate(item.id || '');

  const onSubmit: SubmitHandler<ISpendForm> = async (data) => {
    if (!data.spendPrice) return;
    const totalSpend = +data.spendPrice + item.spendPrice;
    const sendData: ICertificateUpdate = { ...item, spendPrice: totalSpend };

    console.log(sendData);
    await mutateAsync({ data: sendData });
    reset({ spendPrice: 0 });
    setSpendModalOpen(false);
  };

  return (
    <form className='h-full flex items-center' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name='spendPrice'
        render={({ field: { onChange, value } }) => (
          <FormControl sx={{ width: '100%' }} size='small' variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-spend-input'>Списать:</InputLabel>
            <OutlinedInput
              id='outlined-adornment-spend-input'
              type={'number'}
              onChange={onChange}
              value={value}
              autoFocus={true}
              endAdornment={
                <InputAdornment position='end'>
                  {!isPending && (
                    <IconButton aria-label='toggle password visibility' type='submit' edge='end'>
                      <SendIcon color='primary' />
                    </IconButton>
                  )}
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
        )}
      />
    </form>
  );
};

export { CertificateSpendForm };
