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

@Injectable()
export class ApplicantService {
  constructor(
    private readonly createApplicantUsecase: CreateApplicantUsecase,
  ) {}

  async createApplicant(
    body: CreateApplicantDto,
  ): Promise<IResponse<ApplicantEntity>> {
    try {
      const data = await this.createApplicantUsecase.handle(body);

      return {
        data,
      };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server Error');
    }
  }
}
