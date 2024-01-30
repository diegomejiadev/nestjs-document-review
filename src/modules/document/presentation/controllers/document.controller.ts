import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDocumentInfoDto } from '../../domain/dto/create-document-info.dto';
import { DocumentService } from '../services/document.service';
import { UpdateDocumentDto } from '../../domain/dto/update-document.dto';
import { ApproveDocumentDto } from '../../domain/dto/approve-document.dto';
import { RoleGuard } from 'src/core/guards/role.guard';
import { Roles } from 'src/core/metadata/role.metadata';
import { ROLE } from '../../../../core/constants/role.enum';

@ApiBearerAuth()
@ApiTags('Documento - Document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Patch('check/:id')
  @Roles(ROLE.APPLICANT)
  sendToCheck(
    @Param('id') documentId: string,
    @Body() body: CreateDocumentInfoDto,
  ) {
    return this.documentService.sendDocumentToCheck(documentId, body);
  }

  @Get(':id')
  @Roles(ROLE.APPLICANT, ROLE.APPROVER, ROLE.REVIEWER)
  findById(@Param('id') documentId: string) {
    return this.documentService.findById(documentId);
  }

  @Patch('info/:id')
  @Roles(ROLE.APPLICANT)
  updateBasicInfo(
    @Param('id') documentId: string,
    @Body() body: UpdateDocumentDto,
  ) {
    return this.documentService.updateBasicInfo(documentId, body);
  }

  @Patch('file/:id')
  @Roles(ROLE.APPLICANT)
  updateFileUrl(@Param('id') documentId: string) {
    return this.documentService.updateFileUrl(documentId);
  }

  @Patch('assign-reviewer/:id')
  @Roles(ROLE.REVIEWER)
  assignReviewer(@Param('id') documentId: string) {
    return this.documentService.assignReviewer(documentId);
  }

  @Patch('proceeed-review/:id')
  @Roles(ROLE.REVIEWER)
  proceeedReview(
    @Param('id') documentId: string,
    @Body() body: ApproveDocumentDto,
  ) {
    return this.documentService.proceedReview(documentId, body);
  }

  @Patch('assign-approver/:id')
  @Roles(ROLE.APPROVER)
  assignApprover(@Param('id') documentId: string) {
    return this.documentService.assignApprover(documentId);
  }

  @Patch('approve-document/:id')
  @Roles(ROLE.APPROVER)
  approveDocument(
    @Param('id') documentId: string,
    @Body() body: ApproveDocumentDto,
  ) {
    return this.documentService.approveDocument(documentId, body);
  }
}
