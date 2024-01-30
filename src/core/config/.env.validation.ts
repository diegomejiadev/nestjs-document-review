import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
  IsOptional,
  ValidateIf,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export enum StorageProvider {
  AWS = 'aws',
  GCP = 'gcp',
  AZURE = 'azure',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASS: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsNumber()
  SALT_ROUNDS: number;

  @IsString()
  SECRET_JWT_TOKEN: string;

  @IsString()
  JWT_EXPIRATION_TIME: string;

  @IsEnum(StorageProvider)
  STORAGE_PROVIDER: StorageProvider;

  @ValidateIf((o) => o.STORAGE_PROVIDER === StorageProvider.AWS)
  @IsString()
  AWS_S3_BUCKET: string;

  @ValidateIf((o) => o.STORAGE_PROVIDER === StorageProvider.AWS)
  @IsString()
  AWS_S3_REGION: string;

  @ValidateIf((o) => o.STORAGE_PROVIDER === StorageProvider.AWS)
  @IsString()
  AWS_S3_ACCESS_KEY: string;

  @ValidateIf((o) => o.STORAGE_PROVIDER === StorageProvider.AWS)
  @IsString()
  AWS_S3_SECRET_KEY: string;

  @ValidateIf((o) => o.STORAGE_PROVIDER === StorageProvider.GCP)
  @IsString()
  GCP_BUCKET: string;
  
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
