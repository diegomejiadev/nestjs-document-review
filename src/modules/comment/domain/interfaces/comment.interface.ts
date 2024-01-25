import { IDocument } from 'src/modules/document/domain/interfaces/document.interface';
import { IReviewer } from 'src/modules/reviewer/domain/interfaces/reviewer.interface';

export interface IComment {
  id: string;
  comment: string;
  reviewerId: string;
  reviewer: IReviewer;
  documentId: string;
  document: IDocument;
  createdAt: Date;
  updatedAt: Date;
}
