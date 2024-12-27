import { useFetchCertificateById } from '@/hooks/queries';
import { useAuth } from '@/hooks/useAuth';
import { errorCatch } from '@/http/error';
import { priceCalc, priceFormater } from '@/utils/priceFormater';
import { FileDown } from 'lucide-react';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoadingButton from '@mui/lab/LoadingButton';
import { PAGES_URL } from '@/config/pages-url.config';

const PublicCertificate: FC = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  console.log('isAuth', isAuth);
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
      className={`text-white min-h-full p-5 bg-gradient-to-b ${
        sert?.templateId === 1 ? 'from-purple-500 to-pink-500' : ' from-sky-500 to-indigo-800'
      } flex flex-col content-center pt-20 relative`}>
      {sert?.isActivated ? (
        <>
          <div className='flex mb-12 p-2 rounded-md bg-white w-fit mx-auto'>
            <img className='h-48 w-48 flex-none rounded-md' src={`http://localhost:4200/static/images/qr/${sert.id}.png`} alt='qr' />
          </div>
          <div className='font-medium text-2xl text-center mb-12'>ПОДАРОЧНЫЙ СЕРТИФИКАТ</div>
          <div className='mx-auto mb-3 p-3'>
            <a className='flex gap-3' href={`http://localhost:4200/static/images/pdf/${sert.id}.pdf`} target='_blank' title='Скачать PDF' download='certificate.pdf'>
              скачать PDF <FileDown color='white' />
            </a>
          </div>
          <div className='font-semibold text-5xl text-center mb-12'>{priceFormater.format(priceCalc(+sert?.totalPrice, +sert?.spendPrice))}</div>
          <div className='font-normal text-3xl text-center mb-10'>{sert?.title}</div>
          <div className='font-thin text-xl text-center'>
            <p className='whitespace-pre-wrap'>{sert?.text}</p>
          </div>
        </>
      ) : (
        <div className='h-full font-medium text-3xl text-center flex items-center'>СЕРТИФИКАТ НЕ АКТИВЕН</div>
      )}
      {isAuth && sert && (
        <div className='fixed z-50 bottom-5 right-5'>
          <LoadingButton
            onClick={() => navigate(`/${PAGES_URL.DASHBOARD}/${PAGES_URL.CERTIFICATE_UPDATE}/${sert.id}`)}
            type='button'
            variant='contained'
            loadingPosition='start'
            startIcon={<DashboardIcon />}>
            Перейти
          </LoadingButton>
        </div>
      )}
    </div>
  );
};

export { PublicCertificate };
