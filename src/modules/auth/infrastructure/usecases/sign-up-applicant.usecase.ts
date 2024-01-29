import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { hashPassword } from 'src/lib/bcrypt';
import { SignUpApplicantDto } from '../../domain/dto/sign-up-applicant.dto';
import { IApplicantDatasource } from 'src/modules/applicant/domain/interfaces/applicant.datasource';
import { JwtService } from '@nestjs/jwt';
import { CreateApplicantDto } from 'src/modules/applicant/domain/dto/create-applicant.dto';

@Injectable()
export class SignUpApplicantUsecase {
  constructor(
    @Inject('APPLICANT_REPOSITORY') private repository: IApplicantDatasource,
    private jwtService: JwtService,
  ) {}

  async handle(body: SignUpApplicantDto): Promise<{ access_token: string }> {
    try {
      //* 1. Buscamos si existe un aplicante con el mismo correo
      //TODO Verificar si existe lo mismo para los otros tipos de usuarios

      const foundApplicant = await this.repository.findByEmail(body.email);

      if (foundApplicant) {
        throw new BadRequestException(
          'El correo que ha ingresado ya se encuentra registrado. Intente con un correo diferente.',
        );
      }

      //* 2. Procedemos con el hasheo de la contraseña
      const hashedPassword = hashPassword(body.password);

      body.password = hashedPassword;

      //* 3. Se crea el aplicante en la base de datos
      const basicBody: CreateApplicantDto = {
        ...body,
        lastname: null,
        name: null,
      };

      const createdApplicant = await this.repository.create(basicBody);

      //* 4. Creamos el payload
      const payload = { sub: createdApplicant.getId() };

      //* 5. Retornamos el access token ya sign
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
