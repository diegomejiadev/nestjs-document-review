import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './presentation/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { JwtStrategy } from 'src/core/strategies/jwt.strategy';
import { RoleGuard } from 'src/core/guards/role.guard';
import { UserModule } from '../user/user.module';
import { SignUpApplicantUsecase } from './infrastructure/usecases/sign-up-applicant.usecase';
import { SignUpApproverUsecase } from './infrastructure/usecases/sign-up-approver.usecase';
import { SignUpReviewerUsecase } from './infrastructure/usecases/sign-up-reviewer.usecase';
import { SignInUsecase } from './infrastructure/usecases/sign-in.usecase';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    SignUpApplicantUsecase,
    SignUpApproverUsecase,
    SignUpReviewerUsecase,
    SignInUsecase,
  ],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('SECRET_JWT_TOKEN'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION_TIME') },
      }),
    }),
  ],
})
export class AuthModule {}
