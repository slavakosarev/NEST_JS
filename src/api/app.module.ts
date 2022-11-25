import { Module } from '@nestjs/common';
import { PostsController } from '../api/controllers/posts.controller';
import { CommentsController } from '../api/controllers/comments.controller';
import { PostsService } from '../api/modules/posts/posts.service';
import { CommentsService } from '../api/modules/comments/comments.service';
import { PostsModule } from '../api/modules/posts/posts.module';
import { CalcModule } from '../calculate/calculate.module';
import { CommentsModule } from '../api/modules/comments/comments.module';
import { MulterModule } from '@nestjs/platform-express';
import { LoggerModule } from './modules/logger/logger.module';
import { MailModule } from '../mail/mail.module';
import { MailController } from '../mail/mail.controller';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    PostsModule,
    LoggerModule,
    CommentsModule,
    CalcModule,
    MailModule,
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [PostsController, CommentsController, MailController],
  providers: [PostsService, CommentsService, MailService],
})
export class AppModule {}
