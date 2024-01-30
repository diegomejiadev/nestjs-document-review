import {
  BadRequestException,
  Body,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignUpEmailDto } from '../../domain/dto/sign-up-email.dto';
import { IUserDatasource } from 'src/modules/user/domain/interfaces/user.datasource';
import { ROLE } from 'src/core/constants/role.enum';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from 'src/lib/bcrypt';

@Injectable()
export class SignUpReviewerUsecase {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserDatasource,
    private readonly jwtService: JwtService,
  ) {}

  async handle(
    @Body() body: SignUpEmailDto,
  ): Promise<{ access_token: string }> {
    try {
      //* 1. Verificamos si existe un usuario
      const isExistingUser = await this.userRepository.findByEmail(body.email);

      //* 2. Si existe damos a conocer
      if (isExistingUser) {
        throw new BadRequestException(
          'El correo que ha ingresado ya se encuentra registrado. Intente con uno distinto.',
        );
      }

      //* 3. Hasheamos la contraseña
      const hashedPassword = hashPassword(body.password);

      body.password = hashedPassword;

      //* 4. Procedemos a crear el reseñador
      const createdUser = await this.userRepository.create({
        ...body,
        name: null,
        lastname: null,
        role: ROLE.REVIEWER,
      });

      //* 5. Generamos su payload
      const payload = { sub: createdUser.getId(), role: ROLE.REVIEWER };

      //* 6. Retornamos el JWT
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      if (e instanceof HttpException) throw e;

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
