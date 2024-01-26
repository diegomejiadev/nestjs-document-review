import { ApproverModule } from './modules/approver/approver.module';
import { CommentModule } from './modules/comment/comment.module';
import { ReviewerModule } from './modules/reviewer/reviewer.module';
import { EditorModule } from './modules/editor/editor.module';
import { ApplicantModule } from './modules/applicant/applicant.module';
import { DocumentModule } from './modules/document/document.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './core/config/.env.validation';
import { AuthModule } from './modules/auth/auth.module';

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
      envFilePath: [`.env.development`],
      validate,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
