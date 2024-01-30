import { Injectable } from '@nestjs/common';
import { SignInEmailDto } from '../../domain/dto/sign-in-email.dto';

@Injectable()
export class AuthService {
  constructor(
  ) {}

  signInApplicant(body: SignInEmailDto) {
  }

  signUpApplicant(body: any) {
  }
}
