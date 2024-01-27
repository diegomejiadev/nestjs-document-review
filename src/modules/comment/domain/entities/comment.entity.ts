import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';
import { ReviewerEntity } from 'src/modules/reviewer/domain/entities/reviewer.entity';

export class CommentEntity {
  id: string;
  description: string;
  reviewerId?: string;
  reviewer?: ReviewerEntity;
  documentId?: string;
  document?: DocumentEntity;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
