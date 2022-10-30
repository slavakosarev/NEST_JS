import { Module } from '@nestjs/common';
import { NewsModule } from '../news/news.module';
import { CommentsService } from './comments.service';
import { CommentsController } from '../../controllers/comments.controller';

@Module({
  imports: [NewsModule],
  controllers: [CommentsController],
  providers: [Array, CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
