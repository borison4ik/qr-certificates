import { axiosWithAuth } from '@/http';
import { ICertificate, ICertificateCreate, ICertificateUpdate } from '@/models/certificate/ICertificate';

class CertificateService {
  private BASE_URL = '/certificate';

  async getAll() {
    const response = await axiosWithAuth.get<ICertificate[]>(this.BASE_URL);
    return response;
  }

  async create(data: ICertificateCreate) {
    const responce = await axiosWithAuth.post<ICertificate>(this.BASE_URL, data);
    return responce;
  }

  async update(id: string, data: ICertificateUpdate) {
    const responce = await axiosWithAuth.put<ICertificate>(`${this.BASE_URL}/${id}`, data);
    return responce;
  }

  async getById(id: string) {
    const responce = await axiosWithAuth.get<ICertificate>(`${this.BASE_URL}/${id}`);
    return responce;
  }
}

export const certificateService = new CertificateService();
