export interface ICertificate {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  text: string;
  totalPrice: number;
  spendPrice: number;
  templateId: number;
  isActivated: boolean;
}

export type ICertificateCreate = Omit<ICertificate, 'id' | 'createdAt' | 'updatedAt'>;
export type ICertificateUpdate = Partial<Omit<ICertificate, 'id' | 'createdAt' | 'updatedAt'>>;
