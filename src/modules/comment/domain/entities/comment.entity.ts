import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

export class CommentEntity {
  id: string;
  description: string;
  userId: string;
  user: UserEntity;
  documentId?: string;
  document?: DocumentEntity;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
