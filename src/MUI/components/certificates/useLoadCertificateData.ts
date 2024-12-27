import { useFetchCertificateById } from '@/hooks/queries';
import { useEffect } from 'react';
import { UseFormReset } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ICertificateUpdateFormProps } from './update-certificate-form';

export function useLoadCertificateData(reset: UseFormReset<ICertificateUpdateFormProps>) {
  const { id } = useParams<{ id: string }>();
  const { data: sert, isSuccess } = useFetchCertificateById(id || '');

  useEffect(() => {
    if (isSuccess && sert) {
      reset({
        title: sert.title,
        totalPrice: sert.totalPrice,
        spendPrice: sert.spendPrice,
        templateId: sert.templateId.toString(),
        text: sert.text,
      } as ICertificateUpdateFormProps);
    }
  }, [isSuccess, reset, sert]);
}
