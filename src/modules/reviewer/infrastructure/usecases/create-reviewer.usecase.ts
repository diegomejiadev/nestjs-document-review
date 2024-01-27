import {
  BadRequestException,
  HttpException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateReviewerDto } from '../../domain/dto/create-reviewer.dto';
import { ReviewerEntity } from '../../domain/entities/reviewer.entity';
import { IReviewerDatasource } from '../../domain/interfaces/reviewer.datasource';
import { hashPassword } from 'src/lib/bcrypt';

export class CreateReviewerUsecase {
  constructor(
    @Inject('REVIEWER_REPOSITORY')
    private readonly repository: IReviewerDatasource,
  ) {}

  async handle(body: CreateReviewerDto): Promise<ReviewerEntity> {
    try {
      //* 1. Verificamos que no exista otro reseñador con el mismo correo
      //TODO Verificar si existe lo mismo para los otros tipos de usuarios

      const foundApplicant = await this.repository.findByEmail(body.email);

      if (foundApplicant) {
        throw new BadRequestException(
          'El correo que se ha ingresado ya se encuentra registrado. Intente con un correo diferente.',
        );
      }

      //* 2. Procedemos con el hasheo de la contraseña
      const hashedPassword = hashPassword(body.password);

      body.password = hashedPassword;

      //* 3. Creamos el reseñador en la base de datos
      const createdReviewer = await this.repository.create(body);

      //* 4. Devolvemos el entity
      return createdReviewer;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
