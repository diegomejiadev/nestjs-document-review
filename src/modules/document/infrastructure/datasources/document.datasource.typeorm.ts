import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { CreateDocumentDto } from '../../domain/dto/create-document.dto';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { IDocumentDatasource } from '../../domain/interfaces/document.datasource';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentEntityTypeorm } from '../entities/document.entity.typeorm';
import { Repository } from 'typeorm';

export class DocumentDatasourceTypeorm implements IDocumentDatasource {
  constructor(
    @InjectRepository(DocumentEntityTypeorm)
    private readonly repository: Repository<DocumentEntityTypeorm>,
  ) {}

  async create(
    applicantId: string,
    fileUrl: string,
    body: CreateDocumentDto,
  ): Promise<DocumentEntity> {
    const { title, type } = body;

    try {
      const newDocument = this.repository.create({
        applicant: {
          id: applicantId,
        },
        fileUrl,
        title,
        type,
      });

      const createdDocument = await this.repository.save(newDocument);

      return {
        applicant: {
          id: createdDocument.applicant?.id,
          email: createdDocument.applicant?.email,
          name: createdDocument.applicant?.name,
          lastname: createdDocument.applicant?.lastname,
          password: createdDocument.applicant?.password,
        },
        applicantId: createdDocument.applicant?.id,
        createdAt: createdDocument.createdAt,
        updatedAt: createdDocument.updatedAt,
        fileUrl: createdDocument.fileUrl,
        id: createdDocument.id,
        status: createdDocument.status,
        submissionDate: createdDocument.submissionDate,
        title: createdDocument.title,
        type: createdDocument.type,
      };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
