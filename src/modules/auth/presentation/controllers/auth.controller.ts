import { Body, Controller, Post } from '@nestjs/common';
import { SignInEmailDto } from '../../domain/dto/sign-in-email.dto';
import { AuthService } from '../services/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/metadata/public.metadata';
import { SignUpApplicantDto } from '../../domain/dto/sign-up-applicant.dto';

@ApiBearerAuth()
@ApiTags('Autenticación - Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('applicant/sign-in')
  applicantSignIn(@Body() body: SignInEmailDto) {
    return this.authService.signInApplicant(body);
  }

  @Public()
  @Post('applicant/sign-up')
  applicantSignUp(@Body() body: SignUpApplicantDto) {
    return this.authService.signUpApplicant(body);
  }
}
