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
import { ApproverEntityTypeorm } from 'src/modules/approver/infrastructure/entities/approver.entity.typeorm';

@Entity({ name: 'comment' })
export class CommentEntityTypeorm {
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

  @ManyToOne(() => ApproverEntityTypeorm, (approver) => approver.comments)
  approver: ApproverEntityTypeorm;

  @ManyToOne(() => DocumentEntityTypeorm, (document) => document.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'document_id' })
  document: DocumentEntityTypeorm;

  @CreateDateColumn({
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
