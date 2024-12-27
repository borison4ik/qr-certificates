import { useFetchCertificateById } from '@/hooks/queries';
import { errorCatch } from '@/http/error';
import { priceCalc, priceFormater } from '@/utils/priceFormater';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const Certificate: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: sert, error, isLoading, isSuccess } = useFetchCertificateById(id || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSuccess) {
    return <div>{errorCatch(error)}</div>;
  }
  return (
    <div
      className={`text-white p-5 bg-gradient-to-b ${
        sert?.templateId === 1 ? 'from-purple-500 to-pink-500' : ' from-sky-500 to-indigo-800'
      } flex flex-col content-center h-full pt-20`}>
      {sert?.isActivated ? (
        <>
          <div className='font-medium text-3xl text-center mb-24'>ПОДАРОЧНЫЙ СЕРТИФИКАТ</div>
          <div className='font-semibold text-5xl text-center mb-20'>{priceFormater.format(priceCalc(+sert?.totalPrice, +sert?.spendPrice))}</div>
          <div className='font-normal text-3xl text-center mb-10'>{sert?.title}</div>
          <div className='font-thin text-xl text-center'>{sert?.text}</div>
        </>
      ) : (
        <div className='h-full font-medium text-3xl text-center flex items-center'>СЕРТИФИКАТ НЕ АКТИВЕН</div>
      )}
    </div>
  );
};

export { Certificate };
