import { ICertificate } from '@/models/certificate/ICertificate';

export type TField = keyof Pick<ICertificate, 'totalPrice' | 'createdAt' | 'title'>;
export type TSortOptions = {
  field: TField;
  order: 'asc' | 'desc';
};

export const getSortData = (data: ICertificate[], options: TSortOptions): ICertificate[] => {
  switch (options.field) {
    case 'title': {
      return data.sort((a, b) => {
        if (options.order === 'asc') {
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        }
        return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
      });
    }
    case 'totalPrice': {
      return data.sort((a, b) => {
        if (options.order === 'asc') {
          return a.totalPrice - b.totalPrice;
        }
        return b.totalPrice - a.totalPrice;
      });
    }

    case 'createdAt': {
      return data.sort((a, b) => {
        if (options.order === 'asc') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }

    default:
      return data;
  }
};
