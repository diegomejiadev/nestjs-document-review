import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignInEmailDto } from '../../domain/dto/sign-in-email.dto';
import { IApplicantDatasource } from 'src/modules/applicant/domain/interfaces/applicant.datasource';
import { comparePassword } from 'src/lib/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ROLE } from 'src/core/constants/role.enum';

@Injectable()
export class SignInApplicantUsecase {
  constructor(
    @Inject('APPLICANT_REPOSITORY')
    private readonly applicantRepository: IApplicantDatasource,
    private jwtService: JwtService,
  ) {}

  async handle(body: SignInEmailDto): Promise<{ access_token: string }> {
    try {
      //* 1. Buscamos el usuario applicant
      const foundApplicant = await this.applicantRepository.findByEmail(
        body.email,
      );

      //* 2. Si no existe mandamos error general
      if (!foundApplicant) {
        throw new BadRequestException(
          'El correo electrónico y/o la contraseña son inválidas.',
        );
      }

      //* 3. Comparamos el hash de las contraseñas
      const hasSamePassword = comparePassword(
        body.password,
        foundApplicant.getPassword(),
      );

      //* 4. Si la comparacion no es la misma mandamos el mismo error general
      if (!hasSamePassword) {
        throw new BadRequestException(
          'El correo electrónico y/o la contraseña son inválidas.',
        );
      }

      //* 5. Realizamos el sign del JWT
      const payload = { sub: foundApplicant.getId(), role: ROLE.APPLICANT };

      //* 6. Retornamos el jwt_token
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      if (e instanceof HttpException) throw e;

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
