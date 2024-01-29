import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ApproverEntity } from '../../domain/entities/approver.entity';
import { IApproverDatasource } from '../../domain/interfaces/approver.datasource';

@Injectable()
export class FindApproverByIdUsecase {
  constructor(
    @Inject('APPROVER_REPOSITORY')
    private readonly repository: IApproverDatasource,
  ) {}

  async handle(approverId: string): Promise<ApproverEntity> {
    try {
      //* 1. Buscamos el aprobador por id
      const foundApprover = await this.repository.findById(approverId);

      //* 2. Si no lo encontramos mandamos una excepcion
      if (!foundApprover) {
        throw new NotFoundException('No se encontró el aprobador');
      }
      //* 3. Retornamos el entity
      return foundApprover;
    } catch (e) {
      if (e instanceof HttpException) throw e;

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
