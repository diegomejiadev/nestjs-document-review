import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IUploadRepository } from '../../domain/interfaces/upload.repository';
import {
  S3Client,
  PutObjectCommandInput,
  PutObjectCommand,
  GetObjectCommandInput,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class UploadRepositoryS3 implements IUploadRepository {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),

    credentials: {
      secretAccessKey: this.configService.getOrThrow('AWS_S3_SECRET_KEY'),
      accessKeyId: this.configService.getOrThrow('AWS_S3_ACCESS_KEY'),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadSingleFile(file: Express.Multer.File): Promise<any> {
    try {
      const stream = fs.createReadStream(file.path);

      const uploadParams: PutObjectCommandInput = {
        Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
        Key: file.filename,
        Body: stream,
      };

      const command = new PutObjectCommand(uploadParams);

      return await this.s3Client.send(command);
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un problema al subir el archivo',
      );
    }
  }

  async getFile(originalName: string): Promise<any> {
    try {
      const getParams: GetObjectCommandInput = {
        Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
        Key: originalName,
      };

      const command = new GetObjectCommand({
        ...getParams,
      });

      return await this.s3Client.send(command);
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un problema al obtener el archivo',
      );
    }
  }

  async getFileUrl(originalName: string): Promise<string> {
    try {
      const prefix = this.configService.getOrThrow('AWS_S3_BUCKET');
      const region = this.configService.getOrThrow('AWS_S3_REGION');

      return `https://${prefix}.s3.${region}.amazonaws.com/${originalName}`;
    } catch (e) {
      throw new InternalServerErrorException(
        'Hubo un problema al obtener el enlace del archivo',
      );
    }
  }
}
