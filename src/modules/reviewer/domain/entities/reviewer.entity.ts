import { IDocument } from 'src/modules/document/domain/interfaces/document.interface';
import { IReviewer } from '../interfaces/reviewer.interface';

export class ReviewerEntity implements IReviewer {
  id: string;
  name: string;
  lastname: string;
  reviewedDocuments: IDocument[];
  createdAt: Date;
  updatedAt: Date;
}
