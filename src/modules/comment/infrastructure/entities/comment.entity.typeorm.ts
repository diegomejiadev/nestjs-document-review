import { IDocument } from 'src/modules/document/domain/interfaces/document.interface';
import { IReviewer } from 'src/modules/reviewer/domain/interfaces/reviewer.interface';
import { IComment } from '../../domain/interfaces/comment.interface';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DocumentEntityTypeorm } from 'src/modules/document/infrastructure/entities/document.entity.typeorm';
import { ReviewerEntityTypeorm } from 'src/modules/reviewer/infrastructure/entities/reviewer.entity.typeorm';

@Entity({ name: 'comment' })
export class CommentEntityTypeorm implements IComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  description: string;

  @ManyToOne(() => ReviewerEntityTypeorm, (reviewer) => reviewer.comments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: ReviewerEntityTypeorm;

  @ManyToOne(() => DocumentEntityTypeorm, (document) => document.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'document_id' })
  document: DocumentEntityTypeorm;

  @CreateDateColumn( {
    type: 'timestamp with time zone',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    name: 'deleted_at',
  })
  deletedAt?: Date;
}
