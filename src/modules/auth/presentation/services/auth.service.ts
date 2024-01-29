import { Injectable } from '@nestjs/common';
import { SignInApplicantUsecase } from '../../infrastructure/usecases/sign-in-applicant.usecase';
import { SignInEmailDto } from '../../domain/dto/sign-in-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly signInApplicantUsecase: SignInApplicantUsecase,
  ) {}

  signInApplicant(body: SignInEmailDto) {
    return this.signInApplicantUsecase.handle(body);
  }
}
