import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CreateApproverDto } from '../../domain/dto/create-approver.dto';
import { ApproverEntity } from '../../domain/entities/approver.entity';
import { IApproverDatasource } from '../../domain/interfaces/approver.datasource';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApproverEntityTypeorm } from '../entities/approver.entity.typeorm';
import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';
import { CommentEntity } from 'src/modules/comment/domain/entities/comment.entity';

export class ApproverDatasourceTypeorm implements IApproverDatasource {
  constructor(
    @InjectRepository(ApproverEntityTypeorm)
    private readonly approverRepository: Repository<ApproverEntityTypeorm>,
  ) {}

  async create(body: CreateApproverDto): Promise<ApproverEntity> {
    try {
      const toCreateApprover = this.approverRepository.create({
        ...body,
      });

      const createdApprover =
        await this.approverRepository.save(toCreateApprover);

      return new ApproverEntity()
        .setComments([])
        .setCreatedAt(createdApprover.createdAt)
        .setId(createdApprover.id)
        .setLastname(createdApprover.lastname)
        .setName(createdApprover.name)
        .setAssignedDocuments([])
        .setUpdatedAt(createdApprover.updatedAt);
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un problema al crear el aprobador',
      );
    }
  }

  async findById(approvedId: string): Promise<ApproverEntity | null> {
    try {
      const foundApprover = await this.approverRepository.findOne({
        where: {
          id: approvedId,
        },
        relations: ['assignedDocuments', 'comments'],
      });

      if (!foundApprover) return null;

      const approverEntity = new ApproverEntity()
        .setCreatedAt(foundApprover.createdAt)
        .setId(foundApprover.id)
        .setLastname(foundApprover.lastname)
        .setName(foundApprover.name)
        .setUpdatedAt(foundApprover.updatedAt);

      if (foundApprover.assignedDocuments) {
        const documentEntities = foundApprover.assignedDocuments.map(
          (documentItem) => {
            return new DocumentEntity()
              .setApplicantId(documentItem.applicant?.id)
              .setCreatedAt(documentItem.createdAt)
              .setFileUrl(documentItem.fileUrl)
              .setId(documentItem.id)
              .setReviewerId(documentItem.reviewer?.id)
              .setStatus(documentItem.status)
              .setSubmissionDate(documentItem.submissionDate)
              .setTitle(documentItem.title)
              .setType(documentItem.type)
              .setUpdatedAt(documentItem.updatedAt);
          },
        );

        approverEntity.setAssignedDocuments(documentEntities);
      }

      if (foundApprover.comments) {
        //TODO Agregar con respecto a los comentarios
      }

      return approverEntity;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un problema al buscar el aprobador',
      );
    }
  }

  async findByEmail(email: string): Promise<ApproverEntity> {
    try {
      const foundApprover = await this.approverRepository.findOne({
        where: {
          email,
        },
      });

      if (!foundApprover) return null;

      return new ApproverEntity()
        .setCreatedAt(foundApprover.createdAt)
        .setId(foundApprover.id)
        .setLastname(foundApprover.lastname)
        .setName(foundApprover.name)
        .setUpdatedAt(foundApprover.updatedAt);
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un problema al buscar el aprobador',
      );
    }
  }
}
