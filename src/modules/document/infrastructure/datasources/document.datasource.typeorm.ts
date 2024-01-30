import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { IDocumentDatasource } from '../../domain/interfaces/document.datasource';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentEntityTypeorm } from '../entities/document.entity.typeorm';
import { Repository } from 'typeorm';
import { DOCUMENT_STATUS } from 'src/core/constants/document-status.enum';
import { UpdateDocumentDto } from '../../domain/dto/update-document.dto';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

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
        .setApproverId(foundDocument.approver?.id)
        .setOriginalName(foundDocument.originalName);

      if (foundDocument.applicant) {
        const applicant = new UserEntity()
          .setId(foundDocument.applicant.id)
          .setEmail(foundDocument.applicant.email)
          .setName(foundDocument.applicant.name)
          .setLastname(foundDocument.applicant.lastname)
          .setPassword(foundDocument.applicant.password)
          .setCreatedAt(foundDocument.applicant.createdAt)
          .setUpdatedAt(foundDocument.applicant.updatedAt)
          .setRole(foundDocument.applicant.role);

        documentEntity.setApplicant(applicant);
      }

      if (foundDocument.reviewer) {
        const reviewer = new UserEntity()
          .setId(foundDocument.reviewer.id)
          .setEmail(foundDocument.reviewer.email)
          .setName(foundDocument.reviewer.name)
          .setLastname(foundDocument.reviewer.lastname)
          .setPassword(foundDocument.reviewer.password)
          .setCreatedAt(foundDocument.reviewer.createdAt)
          .setUpdatedAt(foundDocument.reviewer.updatedAt)
          .setRole(foundDocument.reviewer.role);

        documentEntity.setReviewer(reviewer);
      }

      if (foundDocument.approver) {
        const approver = new UserEntity()
          .setId(foundDocument.approver.id)
          .setEmail(foundDocument.approver.email)
          .setName(foundDocument.approver.name)
          .setLastname(foundDocument.approver.lastname)
          .setPassword(foundDocument.approver.password)
          .setCreatedAt(foundDocument.approver.createdAt)
          .setUpdatedAt(foundDocument.approver.updatedAt)
          .setRole(foundDocument.approver.role);

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
    console.log(documentId, body);

    try {
      const updatedDocument = await this.documentRepository.save({
        id: documentId,
        ...body,
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
        .setReviewerId(updatedDocument.reviewer?.id)
        .setApproverId(updatedDocument.approver?.id)
        .setOriginalName(updatedDocument.originalName);

      if (updatedDocument.applicant) {
        const applicant = new UserEntity()
          .setId(updatedDocument.applicant.id)
          .setEmail(updatedDocument.applicant.email)
          .setName(updatedDocument.applicant.name)
          .setLastname(updatedDocument.applicant.lastname)
          .setPassword(updatedDocument.applicant.password)
          .setCreatedAt(updatedDocument.applicant.createdAt)
          .setUpdatedAt(updatedDocument.applicant.updatedAt)
          .setRole(updatedDocument.applicant.role);

        documentEntity.setApplicant(applicant);
      }

      if (updatedDocument.reviewer) {
        const reviewer = new UserEntity()
          .setId(updatedDocument.reviewer.id)
          .setEmail(updatedDocument.reviewer.email)
          .setName(updatedDocument.reviewer.name)
          .setLastname(updatedDocument.reviewer.lastname)
          .setPassword(updatedDocument.reviewer.password)
          .setCreatedAt(updatedDocument.reviewer.createdAt)
          .setUpdatedAt(updatedDocument.reviewer.updatedAt)
          .setRole(updatedDocument.reviewer.role);

        documentEntity.setReviewer(reviewer);
      }

      if (updatedDocument.approver) {
        const approver = new UserEntity()
          .setId(updatedDocument.approver.id)
          .setEmail(updatedDocument.approver.email)
          .setName(updatedDocument.approver.name)
          .setLastname(updatedDocument.approver.lastname)
          .setPassword(updatedDocument.approver.password)
          .setCreatedAt(updatedDocument.approver.createdAt)
          .setUpdatedAt(updatedDocument.approver.updatedAt)
          .setRole(updatedDocument.approver.role);

        documentEntity.setApprover(approver);
      }

      return documentEntity;
    } catch (e) {
      console.log(e);
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
      const updatedDocument = await this.documentRepository.save({
        id: documentId,
        fileUrl: newFileUrl,
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
        .setReviewerId(updatedDocument.reviewer?.id)
        .setApproverId(updatedDocument.approver?.id)
        .setOriginalName(updatedDocument.originalName);

      if (updatedDocument.applicant) {
        const applicant = new UserEntity()
          .setId(updatedDocument.applicant.id)
          .setEmail(updatedDocument.applicant.email)
          .setName(updatedDocument.applicant.name)
          .setLastname(updatedDocument.applicant.lastname)
          .setPassword(updatedDocument.applicant.password)
          .setCreatedAt(updatedDocument.applicant.createdAt)
          .setUpdatedAt(updatedDocument.applicant.updatedAt)
          .setRole(updatedDocument.applicant.role);

        documentEntity.setApplicant(applicant);
      }

      if (updatedDocument.reviewer) {
        const reviewer = new UserEntity()
          .setId(updatedDocument.reviewer.id)
          .setEmail(updatedDocument.reviewer.email)
          .setName(updatedDocument.reviewer.name)
          .setLastname(updatedDocument.reviewer.lastname)
          .setPassword(updatedDocument.reviewer.password)
          .setCreatedAt(updatedDocument.reviewer.createdAt)
          .setUpdatedAt(updatedDocument.reviewer.updatedAt)
          .setRole(updatedDocument.reviewer.role);

        documentEntity.setReviewer(reviewer);
      }

      if (updatedDocument.approver) {
        const approver = new UserEntity()
          .setId(updatedDocument.approver.id)
          .setEmail(updatedDocument.approver.email)
          .setName(updatedDocument.approver.name)
          .setLastname(updatedDocument.approver.lastname)
          .setPassword(updatedDocument.approver.password)
          .setCreatedAt(updatedDocument.approver.createdAt)
          .setUpdatedAt(updatedDocument.approver.updatedAt)
          .setRole(updatedDocument.approver.role);

        documentEntity.setApprover(approver);
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
      const updatedDocument = await this.documentRepository.save({
        id: documentId,
        status,
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
        .setReviewerId(updatedDocument.reviewer?.id)
        .setApproverId(updatedDocument.approver?.id)
        .setOriginalName(updatedDocument.originalName);

      if (updatedDocument.applicant) {
        const applicant = new UserEntity()
          .setId(updatedDocument.applicant.id)
          .setEmail(updatedDocument.applicant.email)
          .setName(updatedDocument.applicant.name)
          .setLastname(updatedDocument.applicant.lastname)
          .setPassword(updatedDocument.applicant.password)
          .setCreatedAt(updatedDocument.applicant.createdAt)
          .setUpdatedAt(updatedDocument.applicant.updatedAt)
          .setRole(updatedDocument.applicant.role);

        documentEntity.setApplicant(applicant);
      }

      if (updatedDocument.reviewer) {
        const reviewer = new UserEntity()
          .setId(updatedDocument.reviewer.id)
          .setEmail(updatedDocument.reviewer.email)
          .setName(updatedDocument.reviewer.name)
          .setLastname(updatedDocument.reviewer.lastname)
          .setPassword(updatedDocument.reviewer.password)
          .setCreatedAt(updatedDocument.reviewer.createdAt)
          .setUpdatedAt(updatedDocument.reviewer.updatedAt)
          .setRole(updatedDocument.reviewer.role);

        documentEntity.setReviewer(reviewer);
      }

      if (updatedDocument.approver) {
        const approver = new UserEntity()
          .setId(updatedDocument.approver.id)
          .setEmail(updatedDocument.approver.email)
          .setName(updatedDocument.approver.name)
          .setLastname(updatedDocument.approver.lastname)
          .setPassword(updatedDocument.approver.password)
          .setCreatedAt(updatedDocument.approver.createdAt)
          .setUpdatedAt(updatedDocument.approver.updatedAt)
          .setRole(updatedDocument.approver.role);

        documentEntity.setApprover(approver);
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
      const updatedDocument = await this.documentRepository.save({
        id: documentId,
        status: DOCUMENT_STATUS.REVIEWER_ASSIGNED,
        reviewer: {
          id: reviewerId,
        },
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
        .setReviewerId(updatedDocument.reviewer?.id)
        .setApproverId(updatedDocument.approver?.id)
        .setOriginalName(updatedDocument.originalName);

      if (updatedDocument.applicant) {
        const applicant = new UserEntity()
          .setId(updatedDocument.applicant.id)
          .setEmail(updatedDocument.applicant.email)
          .setName(updatedDocument.applicant.name)
          .setLastname(updatedDocument.applicant.lastname)
          .setPassword(updatedDocument.applicant.password)
          .setCreatedAt(updatedDocument.applicant.createdAt)
          .setUpdatedAt(updatedDocument.applicant.updatedAt)
          .setRole(updatedDocument.applicant.role);

        documentEntity.setApplicant(applicant);
      }

      if (updatedDocument.reviewer) {
        const reviewer = new UserEntity()
          .setId(updatedDocument.reviewer.id)
          .setEmail(updatedDocument.reviewer.email)
          .setName(updatedDocument.reviewer.name)
          .setLastname(updatedDocument.reviewer.lastname)
          .setPassword(updatedDocument.reviewer.password)
          .setCreatedAt(updatedDocument.reviewer.createdAt)
          .setUpdatedAt(updatedDocument.reviewer.updatedAt)
          .setRole(updatedDocument.reviewer.role);

        documentEntity.setReviewer(reviewer);
      }

      if (updatedDocument.approver) {
        const approver = new UserEntity()
          .setId(updatedDocument.approver.id)
          .setEmail(updatedDocument.approver.email)
          .setName(updatedDocument.approver.name)
          .setLastname(updatedDocument.approver.lastname)
          .setPassword(updatedDocument.approver.password)
          .setCreatedAt(updatedDocument.approver.createdAt)
          .setUpdatedAt(updatedDocument.approver.updatedAt)
          .setRole(updatedDocument.approver.role);

        documentEntity.setApprover(approver);
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
        .setReviewerId(updatedDocument.reviewer?.id)
        .setApproverId(updatedDocument.approver?.id)
        .setOriginalName(updatedDocument.originalName);

      if (updatedDocument.applicant) {
        const applicant = new UserEntity()
          .setId(updatedDocument.applicant.id)
          .setEmail(updatedDocument.applicant.email)
          .setName(updatedDocument.applicant.name)
          .setLastname(updatedDocument.applicant.lastname)
          .setPassword(updatedDocument.applicant.password)
          .setCreatedAt(updatedDocument.applicant.createdAt)
          .setUpdatedAt(updatedDocument.applicant.updatedAt)
          .setRole(updatedDocument.applicant.role);

        documentEntity.setApplicant(applicant);
      }

      if (updatedDocument.reviewer) {
        const reviewer = new UserEntity()
          .setId(updatedDocument.reviewer.id)
          .setEmail(updatedDocument.reviewer.email)
          .setName(updatedDocument.reviewer.name)
          .setLastname(updatedDocument.reviewer.lastname)
          .setPassword(updatedDocument.reviewer.password)
          .setCreatedAt(updatedDocument.reviewer.createdAt)
          .setUpdatedAt(updatedDocument.reviewer.updatedAt)
          .setRole(updatedDocument.reviewer.role);

        documentEntity.setReviewer(reviewer);
      }

      if (updatedDocument.approver) {
        const approver = new UserEntity()
          .setId(updatedDocument.approver.id)
          .setEmail(updatedDocument.approver.email)
          .setName(updatedDocument.approver.name)
          .setLastname(updatedDocument.approver.lastname)
          .setPassword(updatedDocument.approver.password)
          .setCreatedAt(updatedDocument.approver.createdAt)
          .setUpdatedAt(updatedDocument.approver.updatedAt)
          .setRole(updatedDocument.approver.role);

        documentEntity.setApprover(approver);
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
      const updatedDocument = await this.documentRepository.save({
        id: documentId,
        status: DOCUMENT_STATUS.APPROVER_ASSIGNED,
        approver: {
          id: approverId,
        },
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
        .setReviewerId(updatedDocument.reviewer?.id)
        .setApproverId(updatedDocument.approver?.id)
        .setOriginalName(updatedDocument.originalName);

      if (updatedDocument.applicant) {
        const applicant = new UserEntity()
          .setId(updatedDocument.applicant.id)
          .setEmail(updatedDocument.applicant.email)
          .setName(updatedDocument.applicant.name)
          .setLastname(updatedDocument.applicant.lastname)
          .setPassword(updatedDocument.applicant.password)
          .setCreatedAt(updatedDocument.applicant.createdAt)
          .setUpdatedAt(updatedDocument.applicant.updatedAt)
          .setRole(updatedDocument.applicant.role);

        documentEntity.setApplicant(applicant);
      }

      if (updatedDocument.reviewer) {
        const reviewer = new UserEntity()
          .setId(updatedDocument.reviewer.id)
          .setEmail(updatedDocument.reviewer.email)
          .setName(updatedDocument.reviewer.name)
          .setLastname(updatedDocument.reviewer.lastname)
          .setPassword(updatedDocument.reviewer.password)
          .setCreatedAt(updatedDocument.reviewer.createdAt)
          .setUpdatedAt(updatedDocument.reviewer.updatedAt)
          .setRole(updatedDocument.reviewer.role);

        documentEntity.setReviewer(reviewer);
      }

      if (updatedDocument.approver) {
        const approver = new UserEntity()
          .setId(updatedDocument.approver.id)
          .setEmail(updatedDocument.approver.email)
          .setName(updatedDocument.approver.name)
          .setLastname(updatedDocument.approver.lastname)
          .setPassword(updatedDocument.approver.password)
          .setCreatedAt(updatedDocument.approver.createdAt)
          .setUpdatedAt(updatedDocument.approver.updatedAt)
          .setRole(updatedDocument.approver.role);

        documentEntity.setApprover(approver);
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
        .setReviewerId(updatedDocument.reviewer?.id)
        .setApproverId(updatedDocument.approver?.id)
        .setOriginalName(updatedDocument.originalName);

      if (updatedDocument.applicant) {
        const applicant = new UserEntity()
          .setId(updatedDocument.applicant.id)
          .setEmail(updatedDocument.applicant.email)
          .setName(updatedDocument.applicant.name)
          .setLastname(updatedDocument.applicant.lastname)
          .setPassword(updatedDocument.applicant.password)
          .setCreatedAt(updatedDocument.applicant.createdAt)
          .setUpdatedAt(updatedDocument.applicant.updatedAt)
          .setRole(updatedDocument.applicant.role);

        documentEntity.setApplicant(applicant);
      }

      if (updatedDocument.reviewer) {
        const reviewer = new UserEntity()
          .setId(updatedDocument.reviewer.id)
          .setEmail(updatedDocument.reviewer.email)
          .setName(updatedDocument.reviewer.name)
          .setLastname(updatedDocument.reviewer.lastname)
          .setPassword(updatedDocument.reviewer.password)
          .setCreatedAt(updatedDocument.reviewer.createdAt)
          .setUpdatedAt(updatedDocument.reviewer.updatedAt)
          .setRole(updatedDocument.reviewer.role);

        documentEntity.setReviewer(reviewer);
      }

      if (updatedDocument.approver) {
        const approver = new UserEntity()
          .setId(updatedDocument.approver.id)
          .setEmail(updatedDocument.approver.email)
          .setName(updatedDocument.approver.name)
          .setLastname(updatedDocument.approver.lastname)
          .setPassword(updatedDocument.approver.password)
          .setCreatedAt(updatedDocument.approver.createdAt)
          .setUpdatedAt(updatedDocument.approver.updatedAt)
          .setRole(updatedDocument.approver.role);

        documentEntity.setApprover(approver);
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

  async create(
    applicantId: string,
    fileUrl: string,
    originalName: string,
  ): Promise<DocumentEntity> {
    try {
      const newDocument = this.documentRepository.create({
        applicant: {
          id: applicantId,
        },
        fileUrl,
        originalName,
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
        .setReviewerId(createdDocument.reviewer?.id)
        .setApproverId(createdDocument.approver?.id)
        .setOriginalName(createdDocument.originalName);

      if (createdDocument.applicant) {
        const applicant = new UserEntity()
          .setId(createdDocument.applicant.id)
          .setEmail(createdDocument.applicant.email)
          .setName(createdDocument.applicant.name)
          .setLastname(createdDocument.applicant.lastname)
          .setPassword(createdDocument.applicant.password)
          .setCreatedAt(createdDocument.applicant.createdAt)
          .setUpdatedAt(createdDocument.applicant.updatedAt)
          .setRole(createdDocument.applicant.role);

        documentEntity.setApplicant(applicant);
      }

      if (createdDocument.reviewer) {
        const reviewer = new UserEntity()
          .setId(createdDocument.reviewer.id)
          .setEmail(createdDocument.reviewer.email)
          .setName(createdDocument.reviewer.name)
          .setLastname(createdDocument.reviewer.lastname)
          .setPassword(createdDocument.reviewer.password)
          .setCreatedAt(createdDocument.reviewer.createdAt)
          .setUpdatedAt(createdDocument.reviewer.updatedAt)
          .setRole(createdDocument.reviewer.role);

        documentEntity.setReviewer(reviewer);
      }

      if (createdDocument.approver) {
        const approver = new UserEntity()
          .setId(createdDocument.approver.id)
          .setEmail(createdDocument.approver.email)
          .setName(createdDocument.approver.name)
          .setLastname(createdDocument.approver.lastname)
          .setPassword(createdDocument.approver.password)
          .setCreatedAt(createdDocument.approver.createdAt)
          .setUpdatedAt(createdDocument.approver.updatedAt)
          .setRole(createdDocument.approver.role);

        documentEntity.setApprover(approver);
      }

      return documentEntity;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al crear el documento',
      );
    }
  }
}
