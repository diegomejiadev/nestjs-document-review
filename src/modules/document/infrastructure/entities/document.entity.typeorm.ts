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
import { DOCUMENT_STATUS } from 'src/core/constants/document-status.enum';
import { DOCUMENT_TYPE } from 'src/core/constants/document-type.enum';
import { CommentEntityTypeorm } from 'src/modules/comment/infrastructure/entities/comment.entity.typeorm';
import { UserEntityTypeorm } from 'src/modules/user/infrastructure/entities/user.entity.typeorm';

@Entity({
  name: 'document',
})
export class DocumentEntityTypeorm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => UserEntityTypeorm,
    (applicant) => applicant.uploadedDocuments,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'applicant_id' })
  applicant: UserEntityTypeorm;

  @OneToMany(() => CommentEntityTypeorm, (comment) => comment.document)
  comments: CommentEntityTypeorm[];

  @ManyToOne(
    () => UserEntityTypeorm,
    (reviewer) => reviewer.reviewingDocuments,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: UserEntityTypeorm;

  @ManyToOne(() => UserEntityTypeorm, (editor) => editor.editingDocuments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'editor_id' })
  editor: UserEntityTypeorm;

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
    () => UserEntityTypeorm,
    (approver) => approver.approvingDocuments,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'approver_id' })
  approver: UserEntityTypeorm;

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
