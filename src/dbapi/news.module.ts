import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { Posts } from './database/entities/post.entity';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Posts])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
