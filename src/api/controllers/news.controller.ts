import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NewsService } from '../modules/news/news.service';
import { News } from '../dto/news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('get-all')
  async getPosts(): Promise<News[]> {
    return this.newsService.getPosts();
  }

  @Get('get-one')
  async getPost(@Query() query: { id: number }): Promise<News | undefined> {
    return this.newsService.getPost(query.id);
  }

  @Post('create')
  async createPost(@Body() data: News): Promise<News> {
    return this.newsService.createPost(data);
  }

  @Delete('delete')
  async deletePost(@Body() body: { id: number }): Promise<News[]> {
    return this.newsService.deletePost(body.id);
  }

  @Put('update')
  async updatePost(@Body() data: News): Promise<News> {
    return this.newsService.updatePost(data);
  }
}
