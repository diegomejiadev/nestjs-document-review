import { IDocument } from 'src/modules/document/domain/interfaces/document.interface';

export interface IReviewer {
  id: string;
  name: string;
  lastname: string;
  // reviewedDocuments: IDocument[]
  createdAt: Date;
  updatedAt: Date;
}
