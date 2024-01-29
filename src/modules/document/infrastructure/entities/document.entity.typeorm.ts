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
import { DOCUMENT_STATUS } from 'src/core/constants/document-status.cst';
import { DOCUMENT_TYPE } from 'src/core/constants/document-type.cst';
import { ApplicantEntityTypeorm } from 'src/modules/applicant/infrastructure/entities/applicant.entity.typeorm';
import { CommentEntityTypeorm } from 'src/modules/comment/infrastructure/entities/comment.entity.typeorm';
import { ReviewerEntityTypeorm } from 'src/modules/reviewer/infrastructure/entities/reviewer.entity.typeorm';
import { EditorEntityTypeorm } from 'src/modules/editor/infrastructure/entities/editor.entity.typeorm';
import { ApproverEntityTypeorm } from 'src/modules/approver/infrastructure/entities/approver.entity.typeorm';

@Entity({
  name: 'document',
})
export class DocumentEntityTypeorm {
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

  @Column({
    name: 'file_url',
    type: 'varchar',
    length: 511,
  })
  fileUrl: string;

  @Column({ nullable: true })
  title: string;

  @Column({
    type: 'enum',
    enum: DOCUMENT_STATUS,
    default: DOCUMENT_STATUS.JUST_UPLOADED,
  })
  status: DOCUMENT_STATUS;

  @Column({
    type: 'enum',
    enum: DOCUMENT_TYPE,
    nullable: true,
  })
  type: DOCUMENT_TYPE;

  @ManyToOne(
    () => ApproverEntityTypeorm,
    (approver) => approver.assignedDocuments,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'approver_id' })
  approver: ApproverEntityTypeorm;

  @Column({
    type: 'timestamp with time zone',
    name: 'submission_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  submissionDate: Date;

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
