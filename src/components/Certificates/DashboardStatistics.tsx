import { useFetchCertificates } from '@/hooks/queries';
import { FC } from 'react';
import { errorCatch } from '@/http/error';
import { ICertificateCreate } from '@/models/certificate/ICertificate';
import { priceCalc, priceFormater } from '@/utils/priceFormater';

type TStat = {
  [kay in keyof Partial<Pick<ICertificateCreate, 'totalPrice' | 'spendPrice' | 'isActivated'>>]: number;
};

const translate = {
  totalPrice: 'Выдано:',
  spendPrice: 'Использовано:',
  isActivated: 'Активных:',
  total: 'Всего сертификатов:',
};
const DashboardStatistics: FC = () => {
  const { data, error, isLoading, isSuccess } = useFetchCertificates();

  const mapingData = () => {
    if (data) {
      const res = data.reduce<TStat>((acc, item) => {
        if (item.isActivated) {
          if (acc.totalPrice) {
            acc.totalPrice += item.totalPrice;
          } else {
            acc.totalPrice = item.totalPrice;
          }

          if (acc.spendPrice) {
            acc.spendPrice += item.spendPrice;
          } else {
            acc.spendPrice = item.spendPrice;
          }

          if (acc.isActivated) {
            acc.isActivated += 1;
          } else {
            acc.isActivated = 1;
          }
        }

        return acc;
      }, {} as TStat);

      return Object.entries(res);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSuccess) {
    return <div>{errorCatch(error)}</div>;
  }

  if (!data || !data.length) {
    return <div className='texy-white text-center'>НЕТ ДАННЫХ</div>;
  }

  return (
    <div className='grid grid-cols-2 gap-3'>
      {data &&
        mapingData()?.map(([name, value]) => {
          return (
            <div key={name} className='bg-zinc-600 rounded-md p-3 '>
              <div className='text-center'>{translate[name]}</div>
              <div className='text-2xl text-center'>{['totalPrice', 'spendPrice'].includes(name) ? priceFormater.format(value) : value}</div>
            </div>
          );
        })}
      <div className='bg-zinc-600 rounded-md p-3'>
        <div className='text-center'>{translate['total']}</div>
        <div className='text-2xl text-center'>{data.length}</div>
      </div>
    </div>
  );
};

export { DashboardStatistics };
