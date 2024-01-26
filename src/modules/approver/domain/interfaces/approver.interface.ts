import { IDocument } from 'src/modules/document/domain/interfaces/document.interface';

export interface IApprover {
  id: string;
  name: string; //* No se debe mostrar los nombres del aprobador
  lastname: string;
  // approvedDocuments: IDocument[];
  // rejectedDocuments: IDocument[];
  createdAt: Date;
  updatedAt: Date;
}
