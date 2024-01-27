import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateApplicantUsecase } from '../../infrastructure/usecases/create-applicant.usecase';
import { IResponse } from 'src/core/interfaces/response.interface';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { CreateApplicantDto } from '../../domain/dto/create-applicant.dto';
import { ApplicantEntity } from '../../domain/entities/applicant.entity';
import { FindApplicantByIdUsecase } from '../../infrastructure/usecases/find-applicant-by-id.usecase';

@Injectable()
export class ApplicantService {
  constructor(
    private readonly createApplicantUsecase: CreateApplicantUsecase,
    private readonly findApplicantByIdUsecase: FindApplicantByIdUsecase,
  ) {}

  async createApplicant(
    body: CreateApplicantDto,
  ): Promise<IResponse<ApplicantEntity>> {
    const data = await this.createApplicantUsecase.handle(body);

    return {
      data,
    };
  }

  async findApplicantById(
    applicantId: string,
  ): Promise<IResponse<ApplicantEntity>> {
    const data = await this.findApplicantByIdUsecase.handle(applicantId);

    return { data };
  }
}
