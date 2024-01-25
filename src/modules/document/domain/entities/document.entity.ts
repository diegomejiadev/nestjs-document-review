import { IApplicant } from 'src/modules/applicant/domain/interfaces/applicant.interface';
import { IDocument } from '../interfaces/document.interface';
import { ApplicantEntity } from 'src/modules/applicant/domain/entities/applicant.entity';
import { DOCUMENT_STATUS } from '../../../../core/constants/document-status.cst';
import { DOCUMENT_TYPE } from 'src/core/constants/document-type.cst';
import { IComment } from 'src/modules/comment/domain/interfaces/comment.interface';
import { CommentEntity } from 'src/modules/comment/domain/entities/comment.entity';

export class DocumentEntity implements IDocument {
  id: string;
  title: string;
  fileUrl: string;
  applicant: ApplicantEntity;
  applicantId: string;
  type: DOCUMENT_TYPE;
  submissionDate: Date;
  status: DOCUMENT_STATUS;
  comments: CommentEntity[];
  createdAt: Date;
  updatedAt: Date;
}
