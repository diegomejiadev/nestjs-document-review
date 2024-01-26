import { IDocument } from 'src/modules/document/domain/interfaces/document.interface';

export interface IEditor {
  id: string;
  name: string;
  lastname: string;
  // editingDocuments: IDocument[];
  createdAt: Date;
  updatedAt: Date;
}
