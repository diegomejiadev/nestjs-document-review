import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IDocument } from '../../domain/interfaces/document.interface';
import { IApplicant } from 'src/modules/applicant/domain/interfaces/applicant.interface';
import { IComment } from 'src/modules/comment/domain/interfaces/comment.interface';
import { DOCUMENT_STATUS } from 'src/core/constants/document-status.cst';
import { DOCUMENT_TYPE } from 'src/core/constants/document-type.cst';

@Entity({
  name: 'document',
})
export class DocumentEntityTypeorm implements IDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // applicant: IApplicant;

  applicantId: string;

  // comments: IComment[];

  @Column()
  fileUrl: string;

  @Column()
  title: string;

  status: DOCUMENT_STATUS;

  type: DOCUMENT_TYPE;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
