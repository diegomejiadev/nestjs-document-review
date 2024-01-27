import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CreateReviewerDto } from '../../domain/dto/create-reviewer.dto';
import { UpdateReviewerBasicInfoDto } from '../../domain/dto/update-reviewer-basic-info.dto';
import { ReviewerEntity } from '../../domain/entities/reviewer.entity';
import { IReviewerDatasource } from '../../domain/interfaces/reviewer.datasource';
import { ReviewerEntityTypeorm } from '../entities/reviewer.entity.typeorm';
import { Repository } from 'typeorm';
import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';

export class ReviewerDatasourceTypeorm implements IReviewerDatasource {
  constructor(
    @Inject(ReviewerEntityTypeorm)
    private readonly reviewerRepository: Repository<ReviewerEntityTypeorm>,
  ) {}

  //! No realiza el hasheo, se espera venga hasheada la contraseña
  async create(body: CreateReviewerDto): Promise<ReviewerEntity> {
    try {
      const newReviewer = this.reviewerRepository.create({
        ...body,
      });

      const createdReviewer = await this.reviewerRepository.save(newReviewer);

      return new ReviewerEntity()
        .setCreatedAt(createdReviewer.createdAt)
        .setUpdatedAt(createdReviewer.updatedAt)
        .setEmail(createdReviewer.email)
        .setPassword(createdReviewer.password)
        .setId(createdReviewer.id)
        .setLastname(createdReviewer.lastname)
        .setName(createdReviewer.name);
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al crear el reseñador',
      );
    }
  }

  async delete(reviewerId: string): Promise<boolean> {
    try {
      await this.reviewerRepository.delete({
        id: reviewerId,
      });

      return true;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al eliminar el reseñador',
      );
    }
  }

  async findByEmail(email: string): Promise<ReviewerEntity | null> {
    try {
      const foundReviewer = await this.reviewerRepository.findOne({
        relations: ['document'],
        where: {
          email,
        },
      });

      if (!foundReviewer) return null;

      const reviewerEntity = new ReviewerEntity()
        .setCreatedAt(foundReviewer.createdAt)
        .setUpdatedAt(foundReviewer.updatedAt)
        .setEmail(foundReviewer.email)
        .setPassword(foundReviewer.password)
        .setId(foundReviewer.id)
        .setLastname(foundReviewer.lastname)
        .setName(foundReviewer.name);

      if (foundReviewer.assignedDocuments) {
        const documentsEntity = foundReviewer.assignedDocuments?.map(
          (documentItem) => {
            return new DocumentEntity()
              .setApplicantId(documentItem.applicant?.id)
              .setCreatedAt(documentItem.createdAt)
              .setUpdatedAt(documentItem.updatedAt)
              .setFileUrl(documentItem.fileUrl)
              .setId(documentItem.id)
              .setStatus(documentItem.status)
              .setSubmissionDate(documentItem.submissionDate)
              .setTitle(documentItem.title)
              .setType(documentItem.type);
          },
        );

        reviewerEntity.setAssignedDocuments(documentsEntity);
      }

      return reviewerEntity;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al buscar el reseñador',
      );
    }
  }

  async findById(reviewerId: any): Promise<ReviewerEntity | null> {
    try {
      const foundReviewer = await this.reviewerRepository.findOne({
        relations: ['document'],
        where: {
          id: reviewerId,
        },
      });

      if (!foundReviewer) return null;

      const reviewerEntity = new ReviewerEntity()
        .setCreatedAt(foundReviewer.createdAt)
        .setUpdatedAt(foundReviewer.updatedAt)
        .setEmail(foundReviewer.email)
        .setPassword(foundReviewer.password)
        .setId(foundReviewer.id)
        .setLastname(foundReviewer.lastname)
        .setName(foundReviewer.name);

      if (foundReviewer.assignedDocuments) {
        const documentsEntity = foundReviewer.assignedDocuments?.map(
          (documentItem) => {
            return new DocumentEntity()
              .setApplicantId(documentItem.applicant?.id)
              .setCreatedAt(documentItem.createdAt)
              .setUpdatedAt(documentItem.updatedAt)
              .setFileUrl(documentItem.fileUrl)
              .setId(documentItem.id)
              .setStatus(documentItem.status)
              .setSubmissionDate(documentItem.submissionDate)
              .setTitle(documentItem.title)
              .setType(documentItem.type);
          },
        );

        reviewerEntity.setAssignedDocuments(documentsEntity);
      }

      return reviewerEntity;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al buscar el reseñador',
      );
    }
  }

  async updateBasicInfo(
    reviewerId: string,
    body: UpdateReviewerBasicInfoDto,
  ): Promise<ReviewerEntity> {
    try {
      const updatedReviewer = await this.reviewerRepository.save({
        id: reviewerId,
        ...body,
      });

      const reviewerEntity = new ReviewerEntity()
        .setCreatedAt(updatedReviewer.createdAt)
        .setUpdatedAt(updatedReviewer.updatedAt)
        .setEmail(updatedReviewer.email)
        .setPassword(updatedReviewer.password)
        .setId(updatedReviewer.id)
        .setLastname(updatedReviewer.lastname)
        .setName(updatedReviewer.name);

      if (updatedReviewer.assignedDocuments) {
        const documentsEntity = updatedReviewer.assignedDocuments?.map(
          (documentItem) => {
            return new DocumentEntity()
              .setApplicantId(documentItem.applicant?.id)
              .setCreatedAt(documentItem.createdAt)
              .setUpdatedAt(documentItem.updatedAt)
              .setFileUrl(documentItem.fileUrl)
              .setId(documentItem.id)
              .setStatus(documentItem.status)
              .setSubmissionDate(documentItem.submissionDate)
              .setTitle(documentItem.title)
              .setType(documentItem.type);
          },
        );

        reviewerEntity.setAssignedDocuments(documentsEntity);
      }

      return reviewerEntity;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al actualizar la información del reseñador',
      );
    }
  }

  async updateEmail(
    reviewerId: string,
    email: string,
  ): Promise<ReviewerEntity> {
    const updatedReviewer = await this.reviewerRepository.save({
      id: reviewerId,
      email,
    });

    const reviewerEntity = new ReviewerEntity()
      .setCreatedAt(updatedReviewer.createdAt)
      .setUpdatedAt(updatedReviewer.updatedAt)
      .setEmail(updatedReviewer.email)
      .setPassword(updatedReviewer.password)
      .setId(updatedReviewer.id)
      .setLastname(updatedReviewer.lastname)
      .setName(updatedReviewer.name);

    if (updatedReviewer.assignedDocuments) {
      const documentsEntity = updatedReviewer.assignedDocuments?.map(
        (documentItem) => {
          return new DocumentEntity()
            .setApplicantId(documentItem.applicant?.id)
            .setCreatedAt(documentItem.createdAt)
            .setUpdatedAt(documentItem.updatedAt)
            .setFileUrl(documentItem.fileUrl)
            .setId(documentItem.id)
            .setStatus(documentItem.status)
            .setSubmissionDate(documentItem.submissionDate)
            .setTitle(documentItem.title)
            .setType(documentItem.type);
        },
      );

      reviewerEntity.setAssignedDocuments(documentsEntity);
    }

    return reviewerEntity;
  }

  async updatePassword(
    reviewerId: string,
    hashedPassword: string,
  ): Promise<ReviewerEntity> {
    const updatedReviewer = await this.reviewerRepository.save({
      id: reviewerId,
      password: hashedPassword,
    });

    const reviewerEntity = new ReviewerEntity()
      .setCreatedAt(updatedReviewer.createdAt)
      .setUpdatedAt(updatedReviewer.updatedAt)
      .setEmail(updatedReviewer.email)
      .setPassword(updatedReviewer.password)
      .setId(updatedReviewer.id)
      .setLastname(updatedReviewer.lastname)
      .setName(updatedReviewer.name);

    if (updatedReviewer.assignedDocuments) {
      const documentsEntity = updatedReviewer.assignedDocuments?.map(
        (documentItem) => {
          return new DocumentEntity()
            .setApplicantId(documentItem.applicant?.id)
            .setCreatedAt(documentItem.createdAt)
            .setUpdatedAt(documentItem.updatedAt)
            .setFileUrl(documentItem.fileUrl)
            .setId(documentItem.id)
            .setStatus(documentItem.status)
            .setSubmissionDate(documentItem.submissionDate)
            .setTitle(documentItem.title)
            .setType(documentItem.type);
        },
      );

      reviewerEntity.setAssignedDocuments(documentsEntity);
    }

    return reviewerEntity;
  }
}
