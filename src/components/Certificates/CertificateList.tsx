import { useFetchCertificates } from '@/hooks/queries';
import { FC } from 'react';
import { errorCatch } from '@/http/error';
import { CertificateListItem } from './CertificateListItem';

const CertificateList: FC = () => {
  const { data: list, error, isLoading, isSuccess } = useFetchCertificates();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSuccess) {
    return <div>{errorCatch(error)}</div>;
  }

  if (!list || !list?.length) {
    return <div className='text-white text-center'>НЕТ ДАННЫХ</div>;
  }
  return (
    <div role='list' className='flex flex-col'>
      {list && list.map((item) => <CertificateListItem key={item.id} item={item} />)}
    </div>
  );
};

export { CertificateList };
