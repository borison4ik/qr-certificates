import { PAGES_URL } from '@/config/pages-url.config';
import { ICertificate } from '@/models/certificate/ICertificate';
import { Button } from '@/ui/buttons/Button';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { priceCalc, priceFormater } from '@/utils/priceFormater';
import { saveAs } from 'file-saver';
import { Modal } from '@/ui/modal/Modal';
import { useModal } from '@/ui/modal/useModal';
import { Field } from '@/ui/fields/Field';

interface Props {
  item: ICertificate;
}

const CertificateListItem: FC<Props> = ({ item }) => {
  const [isSpendForm, setIsSpendForm] = useState<boolean>(false);
  const { isOpen, toggle } = useModal();
  const navigate = useNavigate();
  const openHandler = () => {
    navigate(`/${PAGES_URL.CERTIFICATE}/${item.id}`);
  };

  const updateHandler = () => {
    navigate(`/${PAGES_URL.DASHBOARD}/${PAGES_URL.CERTIFICATE_UPDATE}/${item.id}`);
  };

  const spendHandler = () => {
    setIsSpendForm(!isSpendForm);
  };

  const qrDownloadClickHandler = () => {
    saveAs(`http://localhost:4200/static/images/${item.id}.svg`, 'sertificate.svg');
  };

  return (
    <div key={item.id} className='flex flex-col min-h-9 w-full mb-2 rounded-md bg-zinc-400 justify-between p-2'>
      <div className='header mb-3 flex items-start gap-x-4'>
        <img className='h-24 w-24 flex-none rounded-md' src={`http://localhost:4200/static/images/${item.id}.svg`} alt='qr' onClick={toggle} />
        <div className='desc flex-1'>
          <div className='text-xl mb-3 flex items-center font-semibold leading-6 text-gray-900'>{item.title}</div>
          <div className='text-3xl mb-3 flex items-center font-semibold leading-6 text-white/80'>{priceFormater.format(priceCalc(+item.totalPrice, +item.spendPrice))}</div>
          <div className='text-md flex items-center font-light leading-6 text-gray-300'>Выдан: {new Date(item.createdAt).toLocaleDateString('ru')}</div>
        </div>
        <div className=''>{item.isActivated ? <Check color='#58ff23' size={32} /> : <X color='#ff4f4f' size={32} />}</div>
      </div>
      <div className='text-white/80 text-sm mb-3'>{item.text}</div>
      <div className='btn-block flex gap-x-2'>
        <Button onClick={openHandler}>Посмотреть</Button>
        <Button onClick={updateHandler}>Изменить</Button>
        <Button className='ml-auto' onClick={spendHandler}>
          {isSpendForm ? 'Закрыть' : 'Списать'}
        </Button>
      </div>
      {isSpendForm && (
        <div className='pt-3'>
          <form className='w-full bg-zinc-700 p-2 rounded-md'>
            <Field id='spendPrice' placeholder='Ввести потраченую сумму: ' type='text' isNumber={true} />
          </form>
        </div>
      )}

      <Modal isOpen={isOpen} toggle={toggle}>
        <img className='h-56 w-56 flex-none' src={`http://localhost:4200/static/images/${item.id}.svg`} alt='qr' onClick={qrDownloadClickHandler} />
      </Modal>
    </div>
  );
};

export { CertificateListItem };
