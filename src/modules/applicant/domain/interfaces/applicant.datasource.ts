import { CreateApplicantDto } from '../dto/create-applicant.dto';
import { UpdateBasicInfoApplicantDto } from '../dto/update-basic-applicant.dto';
import { UpdateEmailApplicantDto } from '../dto/update-email-applicant.dto';
import { ApplicantEntity } from '../entities/applicant.entity';

export interface IApplicantDatasource {
  create(body: CreateApplicantDto): Promise<ApplicantEntity>;
  findById(applicantId: string): Promise<ApplicantEntity | null>;
  updateBasic(
    applicantId: string,
    body: UpdateBasicInfoApplicantDto,
  ): Promise<ApplicantEntity>;
  updateEmail(
    applicantId: string,
    body: UpdateEmailApplicantDto,
  ): Promise<ApplicantEntity>;
  updatePassword(
    applicantId: string,
    hashedPassword: string,
  ): Promise<ApplicantEntity>;
  delete(applicantId: string): Promise<boolean>;
  findByEmail(email: string): Promise<ApplicantEntity | null>;
}
