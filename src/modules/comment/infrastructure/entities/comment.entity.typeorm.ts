import { IDocument } from 'src/modules/document/domain/interfaces/document.interface';
import { IReviewer } from 'src/modules/reviewer/domain/interfaces/reviewer.interface';
import { IComment } from '../../domain/interfaces/comment.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'comment' })
export class CommentEntityTypeorm implements IComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  comment: string;
  reviewerId: string;
  documentId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
