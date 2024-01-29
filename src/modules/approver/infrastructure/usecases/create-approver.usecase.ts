import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateApproverDto } from '../../domain/dto/create-approver.dto';
import { IApproverDatasource } from '../../domain/interfaces/approver.datasource';
import { hashPassword } from 'src/lib/bcrypt';
import { ApproverEntity } from '../../domain/entities/approver.entity';

@Injectable()
export class CreateApproverUsecase {
  constructor(
    @Inject('APPROVER_REPOSITORY')
    private readonly repository: IApproverDatasource,
  ) {}

  async handle(body: CreateApproverDto): Promise<ApproverEntity> {
    try {
      //* 1. Verificamos que no exista un usuario registrado con este correo
      //TODO Verificar tambien en otros tipos de usuarios
      const foundApprover = await this.repository.findByEmail(body.email);

      if (foundApprover) {
        throw new BadRequestException(
          'El correo que ha ingresado ya se encuentra registrado. Intente con un correo diferente.',
        );
      }

      //* 2. Hasheamos la contraseña
      const hashedPassword = hashPassword(body.password);

      body.password = hashedPassword;

      //* 3. Creamos el aprobador
      const createdApprover = await this.repository.create(body);

      //* 4. Retornamos el entity
      return createdApprover;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
