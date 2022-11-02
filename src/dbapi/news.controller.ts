import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { Posts } from './database/entities/post.entity';

@Controller('posts')
export class NewsController {
  constructor(private readonly NewsService: NewsService) {}

  @Get('get-all')
  async getPosts(): Promise<Posts[]> {
    return this.NewsService.getPosts();
  }

  @Get('get-one')
  async getPost(@Query() query: { id: number }): Promise<Posts | undefined> {
    return this.NewsService.getPost(query.id);
  }

  @Post('create')
  async createPost(@Body() data: Posts): Promise<Posts> {
    return this.NewsService.createPost(data);
  }

  @Delete('delete')
  async deletePost(@Body() body: { id: number }): Promise<Posts> {
    return this.NewsService.deletePost(body.id);
  }

  @Put('update')
  async updatePost(@Body() data: Posts): Promise<Posts> {
    return this.NewsService.updatePost(data);
  }
}
