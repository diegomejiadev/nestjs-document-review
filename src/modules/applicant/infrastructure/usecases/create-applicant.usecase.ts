import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IApplicantDatasource } from '../../domain/interfaces/applicant.datasource';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { CreateApplicantDto } from '../../domain/dto/create-applicant.dto';
import { hashPassword } from 'src/lib/bcrypt';
import { ApplicantEntityTypeorm } from '../entities/applicant.entity.typeorm';
import { ApplicantEntity } from '../../domain/entities/applicant.entity';

@Injectable()
export class CreateApplicantUsecase {
  constructor(
    @Inject('APPLICANT_REPOSITORY') private repository: IApplicantDatasource,
  ) {}

  async handle(body: CreateApplicantDto): Promise<ApplicantEntity> {
    try {
      //* 1. Buscamos si existe un aplicante con el mismo correo
      //TODO Verificar si existe lo mismo para los otros tipos de usuarios

      const foundApplicant = await this.repository.findByEmail(body.email);

      if (foundApplicant) {
        throw new BadRequestException(
          'El correo que ha registrado ya se encuentra registrado. Intente con uno diferente.',
        );
      }

      //* 2. Procedemos con el hasheo de la contraseña
      const hashedPassword = hashPassword(body.password);

      body.password = hashedPassword;

      //* 3. Se crea el aplicante en la base de datos
      let createdApplicant: ApplicantEntity;

      try {
        createdApplicant = await this.repository.create(body);
      } catch (e) {
        throw new BadRequestException('Hubo un error al crear el aplicante');
      }

      //* 4. Devolvemos el UserEntity
      return createdApplicant;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
