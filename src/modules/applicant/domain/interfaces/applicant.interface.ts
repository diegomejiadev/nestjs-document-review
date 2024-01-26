import { IDocument } from 'src/modules/document/domain/interfaces/document.interface';

export interface IApplicant {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  // sentDocuments: IDocument[];
  createdAt: Date;
  updatedAt: Date;
}
