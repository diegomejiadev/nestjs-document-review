import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './presentation/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ApplicantModule } from '../applicant/applicant.module';
import { SignInApplicantUsecase } from './infrastructure/usecases/sign-in-applicant.usecase';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { JwtStrategy } from 'src/core/strategies/jwt.strategy';
import { SignUpApplicantUsecase } from './infrastructure/usecases/sign-up-applicant.usecase';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    SignInApplicantUsecase,
    SignUpApplicantUsecase,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtGuard },
  ],
  imports: [
    ApplicantModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('SECRET_JWT_TOKEN'),
        signOptions: { expiresIn: '10m' },
      }),
    }),
  ],
})
export class AuthModule {}
