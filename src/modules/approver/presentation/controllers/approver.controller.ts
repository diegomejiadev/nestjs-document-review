import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApproverService } from '../services/approver.service';
import { CreateApproverDto } from '../../domain/dto/create-approver.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Aprobador - Approver')
@Controller('approver')
export class ApproverController {
  constructor(private readonly approverService: ApproverService) {}

  @Post()
  create(@Body() body: CreateApproverDto) {
    return this.approverService.createApprover(body);
  }

  @Get(':id')
  findById(@Param('id') approverId: string) {
    return this.approverService.findApproverById(approverId);
  }
}
