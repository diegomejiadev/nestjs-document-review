import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserDatasource } from 'src/modules/user/domain/interfaces/user.datasource';
import { SignInEmailDto } from '../../domain/dto/sign-in-email.dto';
import { comparePassword } from 'src/lib/bcrypt';

@Injectable()
export class SignInUsecase {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserDatasource,
  ) {}

  async handle(body: SignInEmailDto): Promise<{ access_token: string }> {
    try {
      //* 1. Busca si el usuario existe
      const isExistingUser = await this.userRepository.findByEmail(body.email);

      //* 2. Si no existe manda un error general
      if (!isExistingUser) {
        throw new ForbiddenException(
          'El correo electrónico y/o contraseña no son válidos.',
        );
      }

      //* 3. Compara con la contraseña con el hash de la contraseña del usuario de la DB
      const isSamePassword = comparePassword(
        body.password,
        isExistingUser.getPassword(),
      );

      //* 4. Si no coincide manda un error general
      if (!isSamePassword) {
        throw new ForbiddenException(
          'El correo electrónico y/o contraseña no son válidos.',
        );
      }

      //* 5. Genera el payload
      const payload = {
        sub: isExistingUser.getId(),
        role: isExistingUser.getRole(),
      };

      //* 6. Retorna el sign del JWT del payload
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      if (e instanceof HttpException) throw e;

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
