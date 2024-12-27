import { useFetchCertificateById } from '@/hooks/queries';
import { ICertificateUpdate } from '@/models/certificate/ICertificate';
import { useEffect } from 'react';
import { UseFormReset } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export function useLoadCertificateData(reset: UseFormReset<ICertificateUpdate>) {
  const { id } = useParams<{ id: string }>();
  const { data: sert, isSuccess } = useFetchCertificateById(id || '');

  useEffect(() => {
    if (isSuccess && sert) {
      reset({
        title: sert.title,
        text: sert.text,
        totalPrice: sert.totalPrice,
        spendPrice: sert.spendPrice,
        templateId: sert.templateId,
        isActivated: sert.isActivated ? 1 : 0,
      });
    }
  }, [isSuccess, reset, sert]);
}
