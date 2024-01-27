import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateDocumentUsecase } from '../../infrastructure/usecases/create-document.usecase';
import { CreateDocumentDto } from '../../domain/dto/create-document.dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { DocumentEntity } from '../../domain/entities/document.entity';

@Injectable()
export class DocumentService {
  constructor(private readonly createDocumentUsecase: CreateDocumentUsecase) {}

  async create(body: CreateDocumentDto): Promise<IResponse<DocumentEntity>> {
    try {
      const data = await this.createDocumentUsecase.handle(body);

      return { data };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server Error');
    }
  }
}
