import { ICertificate } from '@/models/certificate/ICertificate';
import { FC, useRef, useState } from 'react';

import { priceCalc, priceFormater } from '@/utils/priceFormater';
import { ActionButton } from './action-button';
import { Modal } from '@/ui/modal/Modal';
import { useModal } from '@/ui/modal/useModal';
import { Button, IconButton } from '@mui/material';
import { copyImageToClipboard } from 'copy-image-clipboard';
import { useSnackbar } from 'notistack';
import { CertificateSpendForm } from './certificate-spend-form';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  item: ICertificate;
}

const CertificateListItem: FC<Props> = ({ item }) => {
  const [isSpendModalOpen, setSpendModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { isOpen, toggle } = useModal();
  const imageRef = useRef<HTMLImageElement>(null);

  function copyQrHandler() {
    if (!imageRef.current) return;
    copyImageToClipboard(`http://localhost:4200/static/images/qr/${item.id}.png`)
      .then(() => {
        enqueueSnackbar('QR код скопирован', { variant: 'success', autoHideDuration: 1000 });
      })
      .catch((e) => {
        console.log('Error: ', e.message);
        enqueueSnackbar('Ошибка копирования QR', { variant: 'error', autoHideDuration: 1000 });
      })
      .finally(() => toggle());
  }
  return (
    <div
      key={item.id}
      className={`${!item.isActivated && 'opacity-20'} flex flex-col min-h-9 w-full rounded-md border-solid border-2 border-slate-300 mb-1 bg- justify-between p-2`}>
      <div className='header flex items-center gap-x-4'>
        <div className='flex basis-12'>
          {item.isActivated && <img className='h-12 w-12 flex-none rounded-md' src={`http://localhost:4200/static/images/qr/${item.id}.png`} alt='qr' onClick={toggle} />}
        </div>
        <div className='flexx flex-col flex-1'>
          <div className='text-md flex items-center font-light text-gray-600 italic mb-1'>{item.title}</div>
          <div className='flex items-center justify-between'>
            <div className='desc flex-1'>
              <div className='text-2xl mb-1 flex items-center font-semibold text-gray-600'>{priceFormater.format(priceCalc(+item.totalPrice, +item.spendPrice))}</div>
              <div className='text-xs flex items-center font-light text-gray-600'>Выдан: {new Date(item.createdAt).toLocaleDateString('ru')}</div>
            </div>

            <ActionButton certificate={item} setSpendModalOpen={setSpendModalOpen} />
          </div>
        </div>
      </div>
      {isSpendModalOpen && (
        <div className='pt-3 flex gap-3'>
          <div className='flex-1'>
            <CertificateSpendForm item={item} setSpendModalOpen={setSpendModalOpen} />
          </div>
          <div className='basis-10'>
            <IconButton aria-label='toggle password visibility' onClick={() => setSpendModalOpen(false)} sx={{ padding: 0, width: 40, height: 40 }} type='button'>
              <CloseIcon color='error' />
            </IconButton>
          </div>
        </div>
      )}

      {item.isActivated && (
        <Modal isOpen={isOpen} toggle={toggle}>
          <img className='h-56 w-56 flex-none' ref={imageRef} src={`http://localhost:4200/static/images/qr/${item.id}.png`} alt='qr' />
          <Button type='button' onClick={copyQrHandler}>
            Скопировать
          </Button>
        </Modal>
      )}
    </div>
  );
};

export { CertificateListItem };
