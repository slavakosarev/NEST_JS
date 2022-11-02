import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from '../../controllers/news.controller';
import { CalculateService } from '../../calculate/calculate.service';
import { CalculateController } from '../../calculate/calculate.controller';

@Module({
  imports: [],
  controllers: [NewsController, CalculateController],
  providers: [Array, NewsService, CalculateService],
  exports: [NewsService],
})
export class NewsModule {}
