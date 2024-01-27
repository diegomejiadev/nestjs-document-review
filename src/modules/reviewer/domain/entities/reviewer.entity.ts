import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';

export class ReviewerEntity {
  id: string;
  name: string;
  lastname: string;
  reviewedDocuments: DocumentEntity[];
  createdAt: Date;
  updatedAt: Date;
}
