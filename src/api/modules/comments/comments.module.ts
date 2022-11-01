import { Module } from '@nestjs/common';
import { NewsModule } from '../news/news.module';
import { LoggerModule } from '../logger/logger.module';
import { CommentsService } from './comments.service';
import { NewsController } from '../../controllers/news.controller';

@Module({
  imports: [NewsModule, LoggerModule],
  controllers: [NewsController],
  providers: [Array, CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
