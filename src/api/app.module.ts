import { Module } from '@nestjs/common';
import { NewsModule } from './modules/news/news.module';
import { NewsController } from './controllers/news.controller';
import { CommentsModule } from './modules/comments/comments.module';
import { CommentsController } from './controllers/comments.controller';

@Module({
  imports: [NewsModule, CommentsModule],
  controllers: [NewsController, CommentsController],
  providers: [Array],
})
export class AppModule {}
