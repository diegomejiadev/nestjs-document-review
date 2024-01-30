import { Injectable } from '@nestjs/common';
import { SignInEmailDto } from '../../domain/dto/sign-in-email.dto';
import { SignUpReviewerUsecase } from '../../infrastructure/usecases/sign-up-reviewer.usecase';
import { SignUpEmailDto } from '../../domain/dto/sign-up-email.dto';
import { SignUpApplicantUsecase } from '../../infrastructure/usecases/sign-up-applicant.usecase';
import { SignUpApproverUsecase } from '../../infrastructure/usecases/sign-up-approver.usecase';
import { SignInUsecase } from '../../infrastructure/usecases/sign-in.usecase';

@Injectable()
export class AuthService {
  constructor(
    private readonly signUpReviewerUsecase: SignUpReviewerUsecase,
    private readonly signUpApplicantUsecase: SignUpApplicantUsecase,
    private readonly signUpApproverUsecase: SignUpApproverUsecase,
    private readonly signInUsecase: SignInUsecase,
  ) {}

  signIn(body: SignInEmailDto) {
    return this.signInUsecase.handle(body);
  }

  signUpReviewer(body: SignUpEmailDto) {
    return this.signUpReviewerUsecase.handle(body);
  }

  signUpApplicant(body: SignUpEmailDto) {
    return this.signUpApplicantUsecase.handle(body);
  }

  signUpApprover(body: SignUpEmailDto) {
    return this.signUpApproverUsecase.handle(body);
  }
}
