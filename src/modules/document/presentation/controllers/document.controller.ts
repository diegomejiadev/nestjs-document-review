import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateDocumentDto } from '../../domain/dto/create-document.dto';
import { DocumentService } from '../services/document.service';
import { UpdateDocumentDto } from '../../domain/dto/update-document.dto';
import { ApproveDocumentDto } from '../../domain/dto/approve-document.dto';

@ApiTags('Documento - Document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  create(@Body() body: CreateDocumentDto) {
    return this.documentService.create(body);
  }

  @Get(':id')
  findById(@Param('id') documentId: string) {
    return this.documentService.findById(documentId);
  }

  @Patch('info/:id')
  updateBasicInfo(
    @Param('id') documentId: string,
    @Body() body: UpdateDocumentDto,
  ) {
    return this.documentService.updateBasicInfo(documentId, body);
  }

  @Patch('file/:id')
  updateFileUrl(@Param('id') documentId: string) {
    return this.documentService.updateFileUrl(documentId);
  }

  @Patch('assign-reviewer/:id')
  assignReviewer(@Param('id') documentId: string) {
    return this.documentService.assignReviewer(documentId);
  }

  @Patch('proceeed-review/:id')
  proceeedReview(
    @Param('id') documentId: string,
    @Body() body: ApproveDocumentDto,
  ) {
    return this.documentService.proceedReview(documentId, body);
  }

  @Patch('approve-document/:id')
  approveDocument(
    @Param('id') documentId: string,
    @Body() body: ApproveDocumentDto,
  ) {
    return this.documentService.approveDocument(documentId, body);
  }
}
