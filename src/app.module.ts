import { ApproverModule } from './modules/approver/approver.module';
import { CommentModule } from './modules/comment/comment.module';
import { ReviewerModule } from './modules/reviewer/reviewer.module';
import { EditorModule } from './modules/editor/editor.module';
import { ApplicantModule } from './modules/applicant/applicant.module';
import { DocumentModule } from './modules/document/document.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './core/config/.env.validation';
import { AuthModule } from './modules/auth/auth.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ApproverModule,
    CommentModule,
    ReviewerModule,
    EditorModule,
    ApplicantModule,
    DocumentModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      validate,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
