import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateDocumentDto } from '../../domain/dto/create-document.dto';
import { DocumentService } from '../services/document.service';

@ApiTags('Documento - Document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  create(@Body() body: CreateDocumentDto) {
    return this.documentService.create(body);
  }
}
