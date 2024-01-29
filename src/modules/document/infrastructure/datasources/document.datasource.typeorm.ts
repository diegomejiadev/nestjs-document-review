import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { CreateDocumentInfoDto } from '../../domain/dto/create-document-info.dto';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { IDocumentDatasource } from '../../domain/interfaces/document.datasource';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentEntityTypeorm } from '../entities/document.entity.typeorm';
import { Repository } from 'typeorm';
import { DOCUMENT_STATUS } from 'src/core/constants/document-status.cst';
import { UpdateDocumentDto } from '../../domain/dto/update-document.dto';
import { ApplicantEntity } from 'src/modules/applicant/domain/entities/applicant.entity';
import { ReviewerEntity } from 'src/modules/reviewer/domain/entities/reviewer.entity';
import { ApproverEntity } from 'src/modules/approver/domain/entities/approver.entity';

export class DocumentDatasourceTypeorm implements IDocumentDatasource {
  constructor(
    @InjectRepository(DocumentEntityTypeorm)
    private readonly documentRepository: Repository<DocumentEntityTypeorm>,
  ) {}

  async findById(documentId: any): Promise<DocumentEntity> {
    try {
      const foundDocument = await this.documentRepository.findOne({
        where: {
          id: documentId,
        },
        relations: ['applicant', 'reviewer', 'approver'],
      });

      if (!foundDocument) return null;

      const documentEntity = new DocumentEntity()
        .setApplicantId(foundDocument.applicant?.id)
        .setCreatedAt(foundDocument.createdAt)
        .setUpdatedAt(foundDocument.updatedAt)
        .setFileUrl(foundDocument.fileUrl)
        .setId(foundDocument.id)
        .setStatus(foundDocument.status)
        .setSubmissionDate(foundDocument.submissionDate)
        .setTitle(foundDocument.title)
        .setType(foundDocument.type)
        .setReviewerId(foundDocument.reviewer?.id)
        .setApproverId(foundDocument.approver?.id);

      if (foundDocument.applicant) {
        const applicant = new ApplicantEntity()
          .setId(foundDocument.applicant?.id)
          .setEmail(foundDocument.applicant?.email)
          .setName(foundDocument.applicant?.name)
          .setLastname(foundDocument.applicant?.lastname)
          .setPassword(foundDocument.applicant?.password);

        documentEntity.setApplicant(applicant);
      }

      if (foundDocument.reviewer) {
        const reviewer = new ReviewerEntity()
          .setId(foundDocument.reviewer.id)
          .setCreatedAt(foundDocument.reviewer.createdAt)
          .setDeletedAt(foundDocument.reviewer.deletedAt)
          .setEmail(foundDocument.reviewer.email)
          .setLastname(foundDocument.reviewer.lastname)
          .setName(foundDocument.reviewer.name)
          .setPassword(foundDocument.reviewer.password)
          .setUpdatedAt(foundDocument.reviewer.updatedAt);

        documentEntity.setReviewer(reviewer);
      }

      if (foundDocument.approver) {
        const approver = new ApproverEntity()
          .setId(foundDocument.approver.id)
          .setCreatedAt(foundDocument.approver.createdAt)
          .setId(foundDocument.approver.id)
          .setLastname(foundDocument.approver.lastname)
          .setName(foundDocument.approver.name)
          .setUpdatedAt(foundDocument.approver.updatedAt);

        documentEntity.setApprover(approver);
      }

      return documentEntity;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al buscar el documento',
      );
    }
  }

  async updateBasicInfo(
    documentId: string,
    body: UpdateDocumentDto,
  ): Promise<DocumentEntity> {
    try {
      const updateDocument = await this.documentRepository.save({
        id: documentId,
        ...body,
      });

      const documentEntity = new DocumentEntity()
        .setApplicantId(updateDocument.applicant?.id)
        .setCreatedAt(updateDocument.createdAt)
        .setUpdatedAt(updateDocument.updatedAt)
        .setFileUrl(updateDocument.fileUrl)
        .setId(updateDocument.id)
        .setStatus(updateDocument.status)
        .setSubmissionDate(updateDocument.submissionDate)
        .setTitle(updateDocument.title)
        .setType(updateDocument.type)
        .setReviewerId(updateDocument.reviewer?.id);

      if (updateDocument.applicant) {
        const applicant = new ApplicantEntity()
          .setId(updateDocument.applicant?.id)
          .setEmail(updateDocument.applicant?.email)
          .setName(updateDocument.applicant?.name)
          .setLastname(updateDocument.applicant?.lastname)
          .setPassword(updateDocument.applicant?.password);

        documentEntity.setApplicant(applicant);
      }

      if (updateDocument.reviewer) {
        const reviewer = new ReviewerEntity()
          .setId(updateDocument.reviewer.id)
          .setCreatedAt(updateDocument.reviewer.createdAt)
          .setDeletedAt(updateDocument.reviewer.deletedAt)
          .setEmail(updateDocument.reviewer.email)
          .setLastname(updateDocument.reviewer.lastname)
          .setName(updateDocument.reviewer.name)
          .setPassword(updateDocument.reviewer.password)
          .setUpdatedAt(updateDocument.reviewer.updatedAt);

        documentEntity.setReviewer(reviewer);
      }

      return documentEntity;
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

      const documentEntity = new DocumentEntity()
        .setApplicantId(updateDocument.applicant?.id)
        .setCreatedAt(updateDocument.createdAt)
        .setUpdatedAt(updateDocument.updatedAt)
        .setFileUrl(updateDocument.fileUrl)
        .setId(updateDocument.id)
        .setStatus(updateDocument.status)
        .setSubmissionDate(updateDocument.submissionDate)
        .setTitle(updateDocument.title)
        .setType(updateDocument.type)
        .setReviewerId(updateDocument.reviewer?.id);

      if (updateDocument.applicant) {
        const applicant = new ApplicantEntity()
          .setId(updateDocument.applicant?.id)
          .setEmail(updateDocument.applicant?.email)
          .setName(updateDocument.applicant?.name)
          .setLastname(updateDocument.applicant?.lastname)
          .setPassword(updateDocument.applicant?.password);

        documentEntity.setApplicant(applicant);
      }

      if (updateDocument.reviewer) {
        const reviewer = new ReviewerEntity()
          .setId(updateDocument.reviewer.id)
          .setCreatedAt(updateDocument.reviewer.createdAt)
          .setDeletedAt(updateDocument.reviewer.deletedAt)
          .setEmail(updateDocument.reviewer.email)
          .setLastname(updateDocument.reviewer.lastname)
          .setName(updateDocument.reviewer.name)
          .setPassword(updateDocument.reviewer.password)
          .setUpdatedAt(updateDocument.reviewer.updatedAt);

        documentEntity.setReviewer(reviewer);
      }

      return documentEntity;
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

      const documentEntity = new DocumentEntity()
        .setApplicantId(updateDocument.applicant?.id)
        .setCreatedAt(updateDocument.createdAt)
        .setUpdatedAt(updateDocument.updatedAt)
        .setFileUrl(updateDocument.fileUrl)
        .setId(updateDocument.id)
        .setStatus(updateDocument.status)
        .setSubmissionDate(updateDocument.submissionDate)
        .setTitle(updateDocument.title)
        .setType(updateDocument.type)
        .setReviewerId(updateDocument.reviewer?.id);

      if (updateDocument.applicant) {
        const applicant = new ApplicantEntity()
          .setId(updateDocument.applicant?.id)
          .setEmail(updateDocument.applicant?.email)
          .setName(updateDocument.applicant?.name)
          .setLastname(updateDocument.applicant?.lastname)
          .setPassword(updateDocument.applicant?.password);

        documentEntity.setApplicant(applicant);
      }

      if (updateDocument.reviewer) {
        const reviewer = new ReviewerEntity()
          .setId(updateDocument.reviewer.id)
          .setCreatedAt(updateDocument.reviewer.createdAt)
          .setDeletedAt(updateDocument.reviewer.deletedAt)
          .setEmail(updateDocument.reviewer.email)
          .setLastname(updateDocument.reviewer.lastname)
          .setName(updateDocument.reviewer.name)
          .setPassword(updateDocument.reviewer.password)
          .setUpdatedAt(updateDocument.reviewer.updatedAt);

        documentEntity.setReviewer(reviewer);
      }

      return documentEntity;
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
        status: DOCUMENT_STATUS.REVIEWER_ASSIGNED,
        reviewer: {
          id: reviewerId,
        },
      });

      const documentEntity = new DocumentEntity()
        .setApplicantId(updateDocument.applicant?.id)
        .setCreatedAt(updateDocument.createdAt)
        .setUpdatedAt(updateDocument.updatedAt)
        .setFileUrl(updateDocument.fileUrl)
        .setId(updateDocument.id)
        .setStatus(updateDocument.status)
        .setSubmissionDate(updateDocument.submissionDate)
        .setTitle(updateDocument.title)
        .setType(updateDocument.type)
        .setReviewerId(updateDocument.reviewer?.id);

      if (updateDocument.applicant) {
        const applicant = new ApplicantEntity()
          .setId(updateDocument.applicant?.id)
          .setEmail(updateDocument.applicant?.email)
          .setName(updateDocument.applicant?.name)
          .setLastname(updateDocument.applicant?.lastname)
          .setPassword(updateDocument.applicant?.password);

        documentEntity.setApplicant(applicant);
      }

      if (updateDocument.reviewer) {
        const reviewer = new ReviewerEntity()
          .setId(updateDocument.reviewer.id)
          .setCreatedAt(updateDocument.reviewer.createdAt)
          .setDeletedAt(updateDocument.reviewer.deletedAt)
          .setEmail(updateDocument.reviewer.email)
          .setLastname(updateDocument.reviewer.lastname)
          .setName(updateDocument.reviewer.name)
          .setPassword(updateDocument.reviewer.password)
          .setUpdatedAt(updateDocument.reviewer.updatedAt);

        documentEntity.setReviewer(reviewer);
      }

      return documentEntity;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al asignar un reseñador al documento',
      );
    }
  }

  async reviewingProceeeding(documentId: string): Promise<DocumentEntity> {
    try {
      const updatedDocument = await this.documentRepository.save({
        id: documentId,
        status: DOCUMENT_STATUS.REVIEW_APPROVED,
      });

      const documentEntity = new DocumentEntity()
        .setApplicantId(updatedDocument.applicant?.id)
        .setCreatedAt(updatedDocument.createdAt)
        .setUpdatedAt(updatedDocument.updatedAt)
        .setFileUrl(updatedDocument.fileUrl)
        .setId(updatedDocument.id)
        .setStatus(updatedDocument.status)
        .setSubmissionDate(updatedDocument.submissionDate)
        .setTitle(updatedDocument.title)
        .setType(updatedDocument.type)
        .setReviewerId(updatedDocument.reviewer?.id);

      if (updatedDocument.applicant) {
        const applicant = new ApplicantEntity()
          .setId(updatedDocument.applicant?.id)
          .setEmail(updatedDocument.applicant?.email)
          .setName(updatedDocument.applicant?.name)
          .setLastname(updatedDocument.applicant?.lastname)
          .setPassword(updatedDocument.applicant?.password);

        documentEntity.setApplicant(applicant);
      }

      if (updatedDocument.reviewer) {
        const reviewer = new ReviewerEntity()
          .setId(updatedDocument.reviewer.id)
          .setCreatedAt(updatedDocument.reviewer.createdAt)
          .setDeletedAt(updatedDocument.reviewer.deletedAt)
          .setEmail(updatedDocument.reviewer.email)
          .setLastname(updatedDocument.reviewer.lastname)
          .setName(updatedDocument.reviewer.name)
          .setPassword(updatedDocument.reviewer.password)
          .setUpdatedAt(updatedDocument.reviewer.updatedAt);

        documentEntity.setReviewer(reviewer);
      }

      return documentEntity;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al aprobar la reseña',
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
        status: DOCUMENT_STATUS.APPROVER_ASSIGNED,
        approver: {
          id: approverId,
        },
      });

      const documentEntity = new DocumentEntity()
        .setApplicantId(updateDocument.applicant?.id)
        .setCreatedAt(updateDocument.createdAt)
        .setUpdatedAt(updateDocument.updatedAt)
        .setFileUrl(updateDocument.fileUrl)
        .setId(updateDocument.id)
        .setStatus(updateDocument.status)
        .setSubmissionDate(updateDocument.submissionDate)
        .setTitle(updateDocument.title)
        .setType(updateDocument.type)
        .setReviewerId(updateDocument.reviewer?.id);

      if (updateDocument.applicant) {
        const applicant = new ApplicantEntity()
          .setId(updateDocument.applicant?.id)
          .setEmail(updateDocument.applicant?.email)
          .setName(updateDocument.applicant?.name)
          .setLastname(updateDocument.applicant?.lastname)
          .setPassword(updateDocument.applicant?.password);

        documentEntity.setApplicant(applicant);
      }

      if (updateDocument.reviewer) {
        const reviewer = new ReviewerEntity()
          .setId(updateDocument.reviewer.id)
          .setCreatedAt(updateDocument.reviewer.createdAt)
          .setDeletedAt(updateDocument.reviewer.deletedAt)
          .setEmail(updateDocument.reviewer.email)
          .setLastname(updateDocument.reviewer.lastname)
          .setName(updateDocument.reviewer.name)
          .setPassword(updateDocument.reviewer.password)
          .setUpdatedAt(updateDocument.reviewer.updatedAt);

        documentEntity.setReviewer(reviewer);
      }

      return documentEntity;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al asignar un aprobador al documento',
      );
    }
  }

  async approveDocument(documentId: string): Promise<DocumentEntity> {
    try {
      const updatedDocument = await this.documentRepository.save({
        id: documentId,
        status: DOCUMENT_STATUS.COMPLETED,
      });

      const documentEntity = new DocumentEntity()
        .setApplicantId(updatedDocument.applicant?.id)
        .setCreatedAt(updatedDocument.createdAt)
        .setUpdatedAt(updatedDocument.updatedAt)
        .setFileUrl(updatedDocument.fileUrl)
        .setId(updatedDocument.id)
        .setStatus(updatedDocument.status)
        .setSubmissionDate(updatedDocument.submissionDate)
        .setTitle(updatedDocument.title)
        .setType(updatedDocument.type)
        .setReviewerId(updatedDocument.reviewer?.id);

      if (updatedDocument.applicant) {
        const applicant = new ApplicantEntity()
          .setId(updatedDocument.applicant?.id)
          .setEmail(updatedDocument.applicant?.email)
          .setName(updatedDocument.applicant?.name)
          .setLastname(updatedDocument.applicant?.lastname)
          .setPassword(updatedDocument.applicant?.password);

        documentEntity.setApplicant(applicant);
      }

      if (updatedDocument.reviewer) {
        const reviewer = new ReviewerEntity()
          .setId(updatedDocument.reviewer.id)
          .setCreatedAt(updatedDocument.reviewer.createdAt)
          .setDeletedAt(updatedDocument.reviewer.deletedAt)
          .setEmail(updatedDocument.reviewer.email)
          .setLastname(updatedDocument.reviewer.lastname)
          .setName(updatedDocument.reviewer.name)
          .setPassword(updatedDocument.reviewer.password)
          .setUpdatedAt(updatedDocument.reviewer.updatedAt);

        documentEntity.setReviewer(reviewer);
      }

      return documentEntity;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al aprobar el documento',
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

  async create(applicantId: string, fileUrl: string): Promise<DocumentEntity> {

    try {
      const newDocument = this.documentRepository.create({
        applicant: {
          id: applicantId,
        },
        fileUrl,
      });

      const createdDocument = await this.documentRepository.save(newDocument);

      const documentEntity = new DocumentEntity()
        .setApplicantId(createdDocument.applicant?.id)
        .setCreatedAt(createdDocument.createdAt)
        .setUpdatedAt(createdDocument.updatedAt)
        .setFileUrl(createdDocument.fileUrl)
        .setId(createdDocument.id)
        .setStatus(createdDocument.status)
        .setSubmissionDate(createdDocument.submissionDate)
        .setTitle(createdDocument.title)
        .setType(createdDocument.type)
        .setReviewerId(createdDocument.reviewer?.id);

      if (createdDocument.applicant) {
        const applicant = new ApplicantEntity()
          .setId(createdDocument.applicant?.id)
          .setEmail(createdDocument.applicant?.email)
          .setName(createdDocument.applicant?.name)
          .setLastname(createdDocument.applicant?.lastname)
          .setPassword(createdDocument.applicant?.password);

        documentEntity.setApplicant(applicant);
      }

      if (createdDocument.reviewer) {
        const reviewer = new ReviewerEntity()
          .setId(createdDocument.reviewer.id)
          .setCreatedAt(createdDocument.reviewer.createdAt)
          .setDeletedAt(createdDocument.reviewer.deletedAt)
          .setEmail(createdDocument.reviewer.email)
          .setLastname(createdDocument.reviewer.lastname)
          .setName(createdDocument.reviewer.name)
          .setPassword(createdDocument.reviewer.password)
          .setUpdatedAt(createdDocument.reviewer.updatedAt);

        documentEntity.setReviewer(reviewer);
      }

      return documentEntity;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al crear el documento',
      );
    }
  }
}
