import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { CalculateService } from '../calculate/calculate.service';
import { CalculateController } from '../calculate/calculate.controller';

@Module({
  imports: [],
  controllers: [NewsController, CalculateController],
  providers: [NewsService, CalculateService],
})
export class NewsModule {}
