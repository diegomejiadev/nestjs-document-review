import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApplicantService } from '../services/applicant.service';
import { CreateApplicantDto } from '../../domain/dto/create-applicant.dto';

@ApiTags('Aplicante - Applicant')
@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Post()
  create(@Body() body: CreateApplicantDto) {
    return this.applicantService.createApplicant(body);
  }
}
