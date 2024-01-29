import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApplicantService } from '../services/applicant.service';
import { CreateApplicantDto } from '../../domain/dto/create-applicant.dto';
import { Public } from 'src/core/metadata/public.metadata';

@ApiBearerAuth()
@ApiTags('Aplicante - Applicant')
@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Post()
  create(@Body() body: CreateApplicantDto) {
    return this.applicantService.createApplicant(body);
  }

  @Get(':id')
  findById(@Param('id') applicantId: string) {
    return this.applicantService.findApplicantById(applicantId);
  }
}
