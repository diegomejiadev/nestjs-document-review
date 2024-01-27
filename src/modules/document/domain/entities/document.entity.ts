import { ApplicantEntity } from 'src/modules/applicant/domain/entities/applicant.entity';
import { DOCUMENT_STATUS } from '../../../../core/constants/document-status.cst';
import { DOCUMENT_TYPE } from 'src/core/constants/document-type.cst';
import { CommentEntity } from 'src/modules/comment/domain/entities/comment.entity';

export class DocumentEntity {
  id: string;
  title: string;
  fileUrl: string;
  applicant?: ApplicantEntity;
  applicantId?: string;
  type: DOCUMENT_TYPE;
  submissionDate: Date;
  status: DOCUMENT_STATUS;
  comments?: CommentEntity[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
