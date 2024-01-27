import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { CreateDocumentDto } from '../../domain/dto/create-document.dto';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { IDocumentDatasource } from '../../domain/interfaces/document.datasource';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentEntityTypeorm } from '../entities/document.entity.typeorm';
import { Repository } from 'typeorm';
import { DOCUMENT_STATUS } from 'src/core/constants/document-status.cst';
import { UpdateDocumentDto } from '../../domain/dto/update-document.dto';

export class DocumentDatasourceTypeorm implements IDocumentDatasource {
  constructor(
    @InjectRepository(DocumentEntityTypeorm)
    private readonly documentRepository: Repository<DocumentEntityTypeorm>,
  ) {}

  async updateBasicInfo(
    documentId: string,
    body: UpdateDocumentDto,
  ): Promise<DocumentEntity> {
    try {
      const updateDocument = await this.documentRepository.save({
        ...body,
      });

      return {
        applicant: {
          id: updateDocument.applicant?.id,
          email: updateDocument.applicant?.email,
          name: updateDocument.applicant?.name,
          lastname: updateDocument.applicant?.lastname,
          password: updateDocument.applicant?.password,
        },
        applicantId: updateDocument.applicant?.id,
        createdAt: updateDocument.createdAt,
        updatedAt: updateDocument.updatedAt,
        fileUrl: updateDocument.fileUrl,
        id: updateDocument.id,
        status: updateDocument.status,
        submissionDate: updateDocument.submissionDate,
        title: updateDocument.title,
        type: updateDocument.type,
      };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException(
        'Hubo un error al actualizar la información del documento',
      );
    }
  }

  async updateFileUrl(
    documentId: string,
    newFileUrl: string,
  ): Promise<DocumentEntity> {
    try {
      const updateDocument = await this.documentRepository.save({
        id: documentId,
        fileUrl: newFileUrl,
      });

      return {
        applicant: {
          id: updateDocument.applicant?.id,
          email: updateDocument.applicant?.email,
          name: updateDocument.applicant?.name,
          lastname: updateDocument.applicant?.lastname,
          password: updateDocument.applicant?.password,
        },
        applicantId: updateDocument.applicant?.id,
        createdAt: updateDocument.createdAt,
        updatedAt: updateDocument.updatedAt,
        fileUrl: updateDocument.fileUrl,
        id: updateDocument.id,
        status: updateDocument.status,
        submissionDate: updateDocument.submissionDate,
        title: updateDocument.title,
        type: updateDocument.type,
      };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException(
        'Hubo un error al actualizar el enlace del documento',
      );
    }
  }

  async updateStatus(
    documentId: string,
    status: DOCUMENT_STATUS,
  ): Promise<DocumentEntity> {
    try {
      const updateDocument = await this.documentRepository.save({
        id: documentId,
        status,
      });

      return {
        applicant: {
          id: updateDocument.applicant?.id,
          email: updateDocument.applicant?.email,
          name: updateDocument.applicant?.name,
          lastname: updateDocument.applicant?.lastname,
          password: updateDocument.applicant?.password,
        },
        applicantId: updateDocument.applicant?.id,
        createdAt: updateDocument.createdAt,
        updatedAt: updateDocument.updatedAt,
        fileUrl: updateDocument.fileUrl,
        id: updateDocument.id,
        status: updateDocument.status,
        submissionDate: updateDocument.submissionDate,
        title: updateDocument.title,
        type: updateDocument.type,
      };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException(
        'Hubo un error al actualizaro el estado del documento',
      );
    }
  }
  async assignReviewer(
    documentId: string,
    reviewerId: string,
  ): Promise<DocumentEntity> {
    try {
      const updateDocument = await this.documentRepository.save({
        id: documentId,
        reviewer: {
          id: reviewerId,
        },
      });

      return {
        applicant: {
          id: updateDocument.applicant?.id,
          email: updateDocument.applicant?.email,
          name: updateDocument.applicant?.name,
          lastname: updateDocument.applicant?.lastname,
          password: updateDocument.applicant?.password,
        },
        applicantId: updateDocument.applicant?.id,
        createdAt: updateDocument.createdAt,
        updatedAt: updateDocument.updatedAt,
        fileUrl: updateDocument.fileUrl,
        id: updateDocument.id,
        status: updateDocument.status,
        submissionDate: updateDocument.submissionDate,
        title: updateDocument.title,
        type: updateDocument.type,
      };
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al asignar un reseñador al documento',
      );
    }
  }

  async assignApprover(
    documentId: string,
    approverId: string,
  ): Promise<DocumentEntity> {
    try {
      const updateDocument = await this.documentRepository.save({
        id: documentId,
        approver: {
          id: approverId,
        },
      });

      return {
        applicant: {
          id: updateDocument.applicant?.id,
          email: updateDocument.applicant?.email,
          name: updateDocument.applicant?.name,
          lastname: updateDocument.applicant?.lastname,
          password: updateDocument.applicant?.password,
        },
        applicantId: updateDocument.applicant?.id,
        createdAt: updateDocument.createdAt,
        updatedAt: updateDocument.updatedAt,
        fileUrl: updateDocument.fileUrl,
        id: updateDocument.id,
        status: updateDocument.status,
        submissionDate: updateDocument.submissionDate,
        title: updateDocument.title,
        type: updateDocument.type,
      };
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al asignar un aprobador al documento',
      );
    }
  }

  async delete(documentId: string): Promise<boolean> {
    try {
      await this.documentRepository.softDelete({
        id: documentId,
      });

      return true;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al eliminar el documento',
      );
    }
  }

  async create(
    applicantId: string,
    fileUrl: string,
    body: CreateDocumentDto,
  ): Promise<DocumentEntity> {
    const { title, type } = body;

    try {
      const newDocument = this.documentRepository.create({
        applicant: {
          id: applicantId,
        },
        fileUrl,
        title,
        type,
      });

      const createdDocument = await this.documentRepository.save(newDocument);

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
      throw new InternalServerErrorException(
        'Hubo un error al crear el documento',
      );
    }
  }
}
