import { IApplicantDatasource } from '../../domain/interfaces/applicant.datasource';
import { UpdateBasicInfoApplicantDto } from '../../domain/dto/update-basic-applicant.dto';
import { UpdateEmailApplicantDto } from '../../domain/dto/update-email-applicant.dto';
import { CreateApplicantDto } from '../../domain/dto/create-applicant.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantEntity } from '../../domain/entities/applicant.entity';
import { ApplicantEntityTypeorm } from '../entities/applicant.entity.typeorm';
import { Repository } from 'typeorm';

export class ApplicantDatasourceTypeorm implements IApplicantDatasource {
  constructor(
    @InjectRepository(ApplicantEntityTypeorm)
    private applicantRepository: Repository<ApplicantEntityTypeorm>,
  ) {}

  async findById(applicantId: string): Promise<ApplicantEntity | null> {
    try {
      const foundApplicant = await this.applicantRepository.findOne({
        relations: ['sentDocuments'],
        where: {
          id: applicantId,
        },
      });

      if (!foundApplicant) return null;

      return new ApplicantEntity()
        .setId(foundApplicant.id)
        .setEmail(foundApplicant.email)
        .setCreatedAt(foundApplicant.createdAt)
        .setUpdatedAt(foundApplicant.updatedAt)
        .setName(foundApplicant.name)
        .setLastname(foundApplicant.lastname)
        .setPassword(foundApplicant.password);
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al buscar el aplicante',
      );
    }
  }

  //! No aplica Hasheo, eso es externo, se respeta el Principio de Responsabilidad Unica
  async create(body: CreateApplicantDto): Promise<ApplicantEntity> {
    const { email, lastname, name, password } = body;

    try {
      const newApplicant = this.applicantRepository.create({
        email,
        lastname,
        name,
        password,
      });

      const createdApplicant =
        await this.applicantRepository.save(newApplicant);

      return new ApplicantEntity()
        .setId(createdApplicant.id)
        .setEmail(createdApplicant.email)
        .setCreatedAt(createdApplicant.createdAt)
        .setUpdatedAt(createdApplicant.updatedAt)
        .setName(createdApplicant.name)
        .setLastname(createdApplicant.lastname)
        .setPassword(createdApplicant.password);
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al crear el aplicante',
      );
    }
  }

  async delete(applicantId: string): Promise<boolean> {
    try {
      await this.applicantRepository.softDelete({
        id: applicantId,
      });

      return true;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al eliminar el aplicante',
      );
    }
  }

  async findByEmail(email: string): Promise<ApplicantEntity | null> {
    try {
      const foundEmail = await this.applicantRepository.findOne({
        where: {
          email,
        },
      });

      if (!foundEmail) return null;

      return new ApplicantEntity()
        .setId(foundEmail.id)
        .setEmail(foundEmail.email)
        .setCreatedAt(foundEmail.createdAt)
        .setUpdatedAt(foundEmail.updatedAt)
        .setName(foundEmail.name)
        .setLastname(foundEmail.lastname)
        .setPassword(foundEmail.password);
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al buscar el aplicante',
      );
    }
  }

  async updateBasic(
    applicantId: string,
    body: UpdateBasicInfoApplicantDto,
  ): Promise<ApplicantEntity> {
    try {
      const updatedApplicant = await this.applicantRepository.save({
        id: applicantId,
        ...body,
      });

      return new ApplicantEntity()
        .setId(updatedApplicant.id)
        .setEmail(updatedApplicant.email)
        .setCreatedAt(updatedApplicant.createdAt)
        .setUpdatedAt(updatedApplicant.updatedAt)
        .setName(updatedApplicant.name)
        .setLastname(updatedApplicant.lastname)
        .setPassword(updatedApplicant.password);
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al actualizar la información del aplicante',
      );
    }
  }

  async updateEmail(
    applicantId: string,
    body: UpdateEmailApplicantDto,
  ): Promise<ApplicantEntity> {
    try {
      const updatedApplicant = await this.applicantRepository.save({
        id: applicantId,
        email: body.email,
      });

      return new ApplicantEntity()
        .setId(updatedApplicant.id)
        .setEmail(updatedApplicant.email)
        .setCreatedAt(updatedApplicant.createdAt)
        .setUpdatedAt(updatedApplicant.updatedAt)
        .setName(updatedApplicant.name)
        .setLastname(updatedApplicant.lastname)
        .setPassword(updatedApplicant.password);
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al actualizar el correo electrónico',
      );
    }
  }

  async updatePassword(
    applicantId: string,
    hashedPassword: string,
  ): Promise<ApplicantEntity> {
    try {
      const updatedApplicant = await this.applicantRepository.save({
        id: applicantId,
        password: hashedPassword,
      });

      return new ApplicantEntity()
        .setId(updatedApplicant.id)
        .setEmail(updatedApplicant.email)
        .setCreatedAt(updatedApplicant.createdAt)
        .setUpdatedAt(updatedApplicant.updatedAt)
        .setName(updatedApplicant.name)
        .setLastname(updatedApplicant.lastname)
        .setPassword(updatedApplicant.password);
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un error al actualizar la contraseña',
      );
    }
  }
}
