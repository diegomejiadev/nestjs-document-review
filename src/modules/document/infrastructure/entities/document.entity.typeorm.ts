import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IDocument } from '../../domain/interfaces/document.interface';
import { DOCUMENT_STATUS } from 'src/core/constants/document-status.cst';
import { DOCUMENT_TYPE } from 'src/core/constants/document-type.cst';
import { ApplicantEntityTypeorm } from 'src/modules/applicant/infrastructure/entities/applicant.entity.typeorm';
import { CommentEntityTypeorm } from 'src/modules/comment/infrastructure/entities/comment.entity.typeorm';
import { ReviewerEntityTypeorm } from 'src/modules/reviewer/infrastructure/entities/reviewer.entity.typeorm';
import { EditorEntityTypeorm } from 'src/modules/editor/infrastructure/entities/editor.entity.typeorm';

@Entity({
  name: 'document',
})
export class DocumentEntityTypeorm implements IDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => ApplicantEntityTypeorm,
    (applicant) => applicant.sentDocuments,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'applicant_id' })
  applicant: ApplicantEntityTypeorm;

  @OneToMany(() => CommentEntityTypeorm, (comment) => comment.document)
  comments: CommentEntityTypeorm[];

  @ManyToOne(
    () => ReviewerEntityTypeorm,
    (reviewer) => reviewer.assignedDocuments,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: ReviewerEntityTypeorm;

  @ManyToOne(() => EditorEntityTypeorm, (editor) => editor.editingDocuments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'editor_id' })
  editor: EditorEntityTypeorm;

  @Column()
  fileUrl: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: DOCUMENT_STATUS,
    default: DOCUMENT_STATUS.PENDING_REVISION,
  })
  status: DOCUMENT_STATUS;

  @Column({
    type: 'enum',
    enum: DOCUMENT_TYPE,
  })
  type: DOCUMENT_TYPE;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt?: Date;
}
