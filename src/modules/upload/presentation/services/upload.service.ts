import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IUploadRepository } from '../../domain/interfaces/upload.repository';

@Injectable()
export class UploadService {
  constructor(
    @Inject('UPLOAD_REPOSITORY')
    private readonly uploadRepository: IUploadRepository,
  ) {}

  async uploadSingleFile(file: Express.Multer.File) {
    try {
      return await this.uploadRepository.uploadSingleFile(file);
    } catch (e) {
      if (e instanceof HttpException) throw e;

      throw new InternalServerErrorException('Internal server error');
    }
  }

  async getFile(filename: string) {
    try {
      return await this.uploadRepository.getFile(filename);
    } catch (e) {
      if (e instanceof HttpException) throw e;

      throw new InternalServerErrorException('Internal server error');
    }
  }

  async getFileUrl(filename: string) {
    try {
      return await this.uploadRepository.getFileUrl(filename);
    } catch (e) {
      if (e instanceof HttpException) throw e;

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
