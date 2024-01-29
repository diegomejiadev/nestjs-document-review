import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IUserDatasource } from '../../domain/interfaces/user.datasource';
import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { UpdateBasicInfoUserDto } from '../../domain/dto/update-basic-info-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntityTypeorm } from '../entities/user.entity.typeorm';
import { Repository } from 'typeorm';
import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';

@Injectable()
export class UserDatasourceTypeorm implements IUserDatasource {
  constructor(
    @InjectRepository(UserEntityTypeorm)
    private userRepository: Repository<UserEntityTypeorm>,
  ) {}

  //! No aplica Hasheo, eso es externo, se respeta el Principio de Responsabilidad Unica
  async create(body: CreateUserDto): Promise<UserEntity> {
    const { email, lastname, name, password, role } = body;

    try {
      const newUser = this.userRepository.create({
        email,
        lastname,
        name,
        password,
        role,
      });

      const createdUser = await this.userRepository.save(newUser);

      return new UserEntity()
        .setId(createdUser.id)
        .setEmail(createdUser.email)
        .setCreatedAt(createdUser.createdAt)
        .setUpdatedAt(createdUser.updatedAt)
        .setName(createdUser.name)
        .setLastname(createdUser.lastname)
        .setPassword(createdUser.password);
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al crear el usuario',
      );
    }
  }

  async delete(userId: string): Promise<boolean> {
    try {
      await this.userRepository.softDelete({
        id: userId,
      });

      return true;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al eliminar el usuario',
      );
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const foundEmail = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      if (!foundEmail) return null;

      return new UserEntity()
        .setId(foundEmail.id)
        .setEmail(foundEmail.email)
        .setCreatedAt(foundEmail.createdAt)
        .setUpdatedAt(foundEmail.updatedAt)
        .setName(foundEmail.name)
        .setLastname(foundEmail.lastname)
        .setPassword(foundEmail.password);
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al buscar el usuario',
      );
    }
  }

  async findById(userId: string): Promise<UserEntity> {
    try {
      const foundUser = await this.userRepository.findOne({
        relations: [
          'uploadedDocuments',
          'reviewingDocuments',
          'editingDocuments',
          'approvingDocuments',
        ],
        where: {
          id: userId,
        },
      });

      if (!foundUser) return null;

      const userEntity = new UserEntity()
        .setId(foundUser.id)
        .setEmail(foundUser.email)
        .setCreatedAt(foundUser.createdAt)
        .setUpdatedAt(foundUser.updatedAt)
        .setName(foundUser.name)
        .setLastname(foundUser.lastname)
        .setPassword(foundUser.password);

      if (foundUser.uploadedDocuments) {
        const documents = foundUser.uploadedDocuments.map((document) => {
          return new DocumentEntity()
            .setApplicantId(document.applicant?.id)
            .setApproverId(document.approver?.id)
            .setCreatedAt(document.createdAt)
            .setFileUrl(document.fileUrl)
            .setId(document.id)
            .setReviewerId(document.reviewer?.id)
            .setStatus(document.status)
            .setSubmissionDate(document.submissionDate)
            .setTitle(document.title)
            .setType(document.type)
            .setUpdatedAt(document.updatedAt);
        });

        userEntity.setUploadedDocuments(documents);
      }

      if (foundUser.reviewingDocuments) {
        const documents = foundUser.reviewingDocuments.map((document) => {
          return new DocumentEntity()
            .setApplicantId(document.applicant?.id)
            .setApproverId(document.approver?.id)
            .setCreatedAt(document.createdAt)
            .setFileUrl(document.fileUrl)
            .setId(document.id)
            .setReviewerId(document.reviewer?.id)
            .setStatus(document.status)
            .setSubmissionDate(document.submissionDate)
            .setTitle(document.title)
            .setType(document.type)
            .setUpdatedAt(document.updatedAt);
        });

        userEntity.setReviewingDocuments(documents);
      }

      if (foundUser.editingDocuments) {
        const documents = foundUser.editingDocuments.map((document) => {
          return new DocumentEntity()
            .setApplicantId(document.applicant?.id)
            .setApproverId(document.approver?.id)
            .setCreatedAt(document.createdAt)
            .setFileUrl(document.fileUrl)
            .setId(document.id)
            .setReviewerId(document.reviewer?.id)
            .setStatus(document.status)
            .setSubmissionDate(document.submissionDate)
            .setTitle(document.title)
            .setType(document.type)
            .setUpdatedAt(document.updatedAt);
        });

        userEntity.setEditingDocuments(documents);
      }

      if (foundUser.approvingDocuments) {
        const documents = foundUser.approvingDocuments.map((document) => {
          return new DocumentEntity()
            .setApplicantId(document.applicant?.id)
            .setApproverId(document.approver?.id)
            .setCreatedAt(document.createdAt)
            .setFileUrl(document.fileUrl)
            .setId(document.id)
            .setReviewerId(document.reviewer?.id)
            .setStatus(document.status)
            .setSubmissionDate(document.submissionDate)
            .setTitle(document.title)
            .setType(document.type)
            .setUpdatedAt(document.updatedAt);
        });

        userEntity.setApprovingDocuments(documents);
      }

      return userEntity;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al buscar el usuario',
      );
    }
  }

  async updateBasic(
    userId: string,
    body: UpdateBasicInfoUserDto,
  ): Promise<UserEntity> {
    try {
      const updatedUser = await this.userRepository.save({
        id: userId,
        ...body,
      });

      return new UserEntity()
        .setId(updatedUser.id)
        .setEmail(updatedUser.email)
        .setCreatedAt(updatedUser.createdAt)
        .setUpdatedAt(updatedUser.updatedAt)
        .setName(updatedUser.name)
        .setLastname(updatedUser.lastname)
        .setPassword(updatedUser.password);
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al actualizar la información del usuario',
      );
    }
  }

  async updateEmail(applicantId: string, email: string): Promise<UserEntity> {
    try {
      const updatedUser = await this.userRepository.save({
        id: applicantId,
        email: email,
      });

      return new UserEntity()
        .setId(updatedUser.id)
        .setEmail(updatedUser.email)
        .setCreatedAt(updatedUser.createdAt)
        .setUpdatedAt(updatedUser.updatedAt)
        .setName(updatedUser.name)
        .setLastname(updatedUser.lastname)
        .setPassword(updatedUser.password);
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al actualizar el correo electrónico del usuario',
      );
    }
  }

  async updatePassword(
    applicantId: string,
    hashedPassword: string,
  ): Promise<UserEntity> {
    try {
      const updatedUser = await this.userRepository.save({
        id: applicantId,
        password: hashedPassword,
      });

      return new UserEntity()
        .setId(updatedUser.id)
        .setEmail(updatedUser.email)
        .setCreatedAt(updatedUser.createdAt)
        .setUpdatedAt(updatedUser.updatedAt)
        .setName(updatedUser.name)
        .setLastname(updatedUser.lastname)
        .setPassword(updatedUser.password);
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al actualizar la contraseña del usuario',
      );
    }
  }
}
