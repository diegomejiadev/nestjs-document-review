import { ApproverEntity } from 'src/modules/approver/domain/entities/approver.entity';
import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';
import { ReviewerEntity } from 'src/modules/reviewer/domain/entities/reviewer.entity';

export class CommentEntity {
  id: string;
  description: string;
  reviewerId?: string;
  reviewer?: ReviewerEntity;
  approverId?: string;
  approver: ApproverEntity;
  documentId?: string;
  document?: DocumentEntity;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
