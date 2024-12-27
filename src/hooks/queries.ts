import { ICertificateCreate, ICertificateUpdate } from '@/models/certificate/ICertificate';
import { certificateService } from '@/services/CertificateService';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

enum QUERIES_NAMES {
  certificates = 'certificates-all',
  certificate = 'certificate',
  certificateCreate = 'certificate-create',
  certificateUpdate = 'certificate-update',
}

export function useFetchCertificates() {
  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: [`${QUERIES_NAMES.certificates}`],
    queryFn: () => certificateService.getAll(),
    select: (resp) => resp.data,
    staleTime: Infinity,
  });

  return { data, isLoading, isSuccess, error };
}

export function useFetchCertificateById(id: string) {
  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: [`${QUERIES_NAMES.certificate}`, `${id}`],
    queryFn: () => certificateService.getById(id),
    select: (resp) => resp.data,
  });

  return { data, isLoading, isSuccess, error };
}

export function useCreateCertificate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERIES_NAMES.certificateCreate],
    mutationFn: (data: ICertificateCreate) => certificateService.create(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [`${QUERIES_NAMES.certificates}`],
      });
    },
  });
}

export function useUpdateCertificate(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERIES_NAMES.certificateUpdate],
    mutationFn: ({ data }: { data: ICertificateUpdate }) => certificateService.update(id, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [`${QUERIES_NAMES.certificates}`],
      });
    },
  });
}
