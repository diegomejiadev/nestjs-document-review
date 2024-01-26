import { IDatabaseConfig } from './database.interface';
import * as dotenv from 'dotenv';
dotenv.config();

export const developmentDatabaseConfig: IDatabaseConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  type: process.env.DB_DIALECT,
};

export const testDatabaseConfig: IDatabaseConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  type: process.env.DB_DIALECT,
};

export const productionDatabaseConfig: IDatabaseConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  type: process.env.DB_DIALECT,
};
