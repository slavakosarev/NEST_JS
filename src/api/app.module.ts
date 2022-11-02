import { Module } from '@nestjs/common';
import { NewsModule } from './modules/news/news.module';
import { NewsService } from './modules/news/news.service';
import { NewsController } from './controllers/news.controller';
import { CommentsModule } from './modules/comments/comments.module';
import { CommentsService } from './modules/comments/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { LoggerModule } from './modules/logger/logger.module';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    NewsModule,
    LoggerModule,
    CommentsModule,
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [NewsController, CommentsController],
  providers: [NewsService, CommentsService],
})
export class AppModule {}
