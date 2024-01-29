import { Injectable } from '@nestjs/common';
import { SignInApplicantUsecase } from '../../infrastructure/usecases/sign-in-applicant.usecase';
import { SignInEmailDto } from '../../domain/dto/sign-in-email.dto';
import { SignUpApplicantUsecase } from '../../infrastructure/usecases/sign-up-applicant.usecase';
import { SignUpApplicantDto } from '../../domain/dto/sign-up-applicant.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly signInApplicantUsecase: SignInApplicantUsecase,
    private readonly signUpApplicantUsecase: SignUpApplicantUsecase,
  ) {}

  signInApplicant(body: SignInEmailDto) {
    return this.signInApplicantUsecase.handle(body);
  }

  signUpApplicant(body: SignUpApplicantDto) {
    return this.signUpApplicantUsecase.handle(body);
  }
}
