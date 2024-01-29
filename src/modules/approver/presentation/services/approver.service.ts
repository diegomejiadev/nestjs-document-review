import { Injectable } from '@nestjs/common';
import { FindApproverByIdUsecase } from '../../infrastructure/usecases/find-approver-by-id.usecase';
import { CreateApproverUsecase } from '../../infrastructure/usecases/create-approver.usecase';
import { CreateApproverDto } from '../../domain/dto/create-approver.dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { ApproverEntity } from '../../domain/entities/approver.entity';

@Injectable()
export class ApproverService {
  constructor(
    private readonly createApproverUsecase: CreateApproverUsecase,
    private readonly findApproverByIdUsecase: FindApproverByIdUsecase,
  ) {}

  async createApprover(
    body: CreateApproverDto,
  ): Promise<IResponse<ApproverEntity>> {
    const data = await this.createApproverUsecase.handle(body);

    return { data };
  }

  async findApproverById(
    approverId: string,
  ): Promise<IResponse<ApproverEntity>> {
    const data = await this.findApproverByIdUsecase.handle(approverId);

    return { data };
  }
}
