import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './presentation/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ApplicantModule } from '../applicant/applicant.module';
import { SignInApplicantUsecase } from './infrastructure/usecases/sign-in-applicant.usecase';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SignInApplicantUsecase],
  imports: [
    ApplicantModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_JWT_TOKEN,
      signOptions: { expiresIn: '10m' },
    }),
  ],
})
export class AuthModule {}
