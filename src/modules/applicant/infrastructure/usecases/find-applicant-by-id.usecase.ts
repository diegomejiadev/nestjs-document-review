import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ApplicantEntity } from '../../domain/entities/applicant.entity';
import { IApplicantDatasource } from '../../domain/interfaces/applicant.datasource';

@Injectable()
export class FindApplicantByIdUsecase {
  constructor(
    @Inject('APPLICANT_REPOSITORY')
    private readonly repository: IApplicantDatasource,
  ) {}

  async handle(applicantId: string): Promise<ApplicantEntity> {
    try {
      const foundApplicant = await this.repository.findById(applicantId);

      if (!foundApplicant) {
        throw new NotFoundException('No se encontró el aplicante');
      }

      return foundApplicant;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
