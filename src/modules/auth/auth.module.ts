import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './presentation/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ApplicantModule } from '../applicant/applicant.module';
import { SignInApplicantUsecase } from './infrastructure/usecases/sign-in-applicant.usecase';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SignInApplicantUsecase],
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
