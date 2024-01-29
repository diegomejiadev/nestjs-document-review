import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignUpApproverDto } from '../../domain/dto/sign-up-approver.dto';
import { hashPassword } from 'src/lib/bcrypt';
import { IApproverDatasource } from 'src/modules/approver/domain/interfaces/approver.datasource';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignUpApproverUsecase {
  constructor(
    @Inject('APPROVER_REPOSITORY')
    private readonly repository: IApproverDatasource,
    private jwtService: JwtService,
  ) {}

  async handle(body: SignUpApproverDto): Promise<{ access_token: string }> {
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

      //* 4. Generamos el payload del JWT
      const payload = { sub: createdApprover.getId() };

      //* 5. Retornamos el JWT
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
