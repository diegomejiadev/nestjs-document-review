import { IApplicant } from '../interfaces/applicant.interface';
import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';
import { Exclude } from 'class-transformer';

export class ApplicantEntity implements IApplicant {
  id: string;
  name: string;
  lastname: string;
  email: string;

  @Exclude()
  password: string;

  sentDocuments?: DocumentEntity[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
