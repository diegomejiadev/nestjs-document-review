import { Body, Controller, Post } from '@nestjs/common';
import { SignInEmailDto } from '../../domain/dto/sign-in-email.dto';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticación - Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('applicant/sign-in')
  applicantSignIn(@Body() body: SignInEmailDto) {
    return this.authService.signInApplicant(body);
  }
}
