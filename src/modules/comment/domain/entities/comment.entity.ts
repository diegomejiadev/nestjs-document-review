import { IDocument } from 'src/modules/document/domain/interfaces/document.interface';
import { IComment } from '../interfaces/comment.interface';
import { IReviewer } from 'src/modules/reviewer/domain/interfaces/reviewer.interface';
import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';
import { ReviewerEntity } from 'src/modules/reviewer/domain/entities/reviewer.entity';

export class CommentEntity implements IComment {
  id: string;
  description: string;
  reviewerId: string;
  reviewer: ReviewerEntity;
  documentId: string;
  document: DocumentEntity;
  createdAt: Date;
  updatedAt: Date;
}
