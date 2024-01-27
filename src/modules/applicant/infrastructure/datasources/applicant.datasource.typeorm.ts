import { IApplicantDatasource } from '../../domain/interfaces/applicant.datasource';
import { UpdateBasicInfoApplicantDto } from '../../domain/dto/update-basic-applicant.dto';
import { UpdateEmailApplicantDto } from '../../domain/dto/update-email-applicant.dto';
import { CreateApplicantDto } from '../../domain/dto/create-applicant.dto';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantEntity } from '../../domain/entities/applicant.entity';
import { ApplicantEntityTypeorm } from '../entities/applicant.entity.typeorm';
import { Repository } from 'typeorm';

export class ApplicantDatasourceTypeorm implements IApplicantDatasource {
  constructor(
    @InjectRepository(ApplicantEntityTypeorm)
    private applicantRepository: Repository<ApplicantEntityTypeorm>,
  ) {}

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

      return {
        id: createdApplicant.id,
        email: createdApplicant.email,
        createdAt: createdApplicant.createdAt,
        lastname: createdApplicant.lastname,
        name: createdApplicant.name,
        password: createdApplicant.password,
        updatedAt: createdApplicant.updatedAt,
      };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }

  async delete(applicantId: string): Promise<boolean> {
    try {
      await this.applicantRepository.softDelete({
        id: applicantId,
      });

      return true;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
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

      return {
        email: foundEmail.email,
        id: foundEmail.id,
        lastname: foundEmail.lastname,
        name: foundEmail.name,
        password: foundEmail.password,
        createdAt: foundEmail.createdAt,
        updatedAt: foundEmail.updatedAt,
      };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
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

      return {
        email: updatedApplicant.email,
        id: updatedApplicant.id,
        lastname: updatedApplicant.lastname,
        name: updatedApplicant.name,
        password: updatedApplicant.password,
        createdAt: updatedApplicant.createdAt,
        updatedAt: updatedApplicant.updatedAt,
      };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
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

      return {
        email: updatedApplicant.email,
        id: updatedApplicant.id,
        lastname: updatedApplicant.lastname,
        name: updatedApplicant.name,
        password: updatedApplicant.password,
        createdAt: updatedApplicant.createdAt,
        updatedAt: updatedApplicant.updatedAt,
      };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
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

      return {
        email: updatedApplicant.email,
        id: updatedApplicant.id,
        lastname: updatedApplicant.lastname,
        name: updatedApplicant.name,
        password: updatedApplicant.password,
        createdAt: updatedApplicant.createdAt,
        updatedAt: updatedApplicant.updatedAt,
      };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
