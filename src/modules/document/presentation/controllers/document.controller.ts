import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateDocumentInfoDto } from '../../domain/dto/create-document-info.dto';
import { DocumentService } from '../services/document.service';
import { UpdateDocumentDto } from '../../domain/dto/update-document.dto';
import { ApproveDocumentDto } from '../../domain/dto/approve-document.dto';
import { Roles } from 'src/core/metadata/role.metadata';
import { ROLE } from '../../../../core/constants/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

// Size max size
const MAX_SIZE_IN_BYTES = 5 * 1024 * 1024;

// Mimetype
const MIMETYPE = {
  PDF: 'application/pdf',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

// Multer upload options
export const multerOptions = {
  // Enable file size limits
  limits: {
    fileSize: MAX_SIZE_IN_BYTES,
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if ([MIMETYPE.DOC, MIMETYPE.DOCX, MIMETYPE.PDF].includes(file.mimetype)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new BadRequestException(`Solo se permite archivos .pdf, .doc y .docx`),
        false,
      );
    }
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = process.env.UPLOAD_LOCATION;
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    // File modification details
    filename: (req: any, file: any, cb: any) => {
      // Calling the callback passing the random name generated with the original extension name
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};

@ApiBearerAuth()
@ApiTags('Documento - Document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @Roles(ROLE.APPLICANT)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      ...multerOptions,
    }),
  )
  uploadFile(
    @UploadedFile('file')
    file: Express.Multer.File,
  ) {
    return this.documentService.uploadFile(file);
  }

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
