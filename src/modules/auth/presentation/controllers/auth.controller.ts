import { Body, Controller, Post } from '@nestjs/common';
import { SignInEmailDto } from '../../domain/dto/sign-in-email.dto';
import { AuthService } from '../services/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/metadata/public.metadata';
import { SignUpEmailDto } from '../../domain/dto/sign-up-email.dto';

@ApiBearerAuth()
@ApiTags('Autenticación - Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in')
  applicantSignIn(@Body() body: SignInEmailDto) {
    return this.authService.signIn(body);
  }

  @Public()
  @Post('sign-up/reviewer')
  reviewerSignUp(@Body() body: SignUpEmailDto) {
    return this.authService.signUpReviewer(body);
  }

  @Public()
  @Post('sign-up/applicant')
  applicantSignUp(@Body() body: SignUpEmailDto) {
    return this.authService.signUpApplicant(body);
  }

  @Public()
  @Post('sign-up/approver')
  approverSignUp(@Body() body: SignUpEmailDto) {
    return this.authService.signUpApprover(body);
  }
}
