import { Body, Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { PostsService } from '../modules/posts/posts.service';
import { CreatePost, Posts } from '../dto/post.dto';
import { htmlTemplate } from '../../views/template';
import { postsTemplate } from '../../views/posts';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
  newsService: any;
  constructor(private readonly postsService: PostsService) {}

  @Get('get-all')
  async getPosts(): Promise<string> {
    const posts = await this.postsService.getPosts();
    return htmlTemplate(postsTemplate(posts));
  }

  @Get('get/:postId/detail')
  async getPost(@Req() request: Request): Promise<Posts | undefined> {
    const params = { ...request.params };
    const id = params.postId;
    console.log(id);
    return this.postsService.getPost(+params.postId - 1);
  }

  @Post('create')
  async createPost(@Body() data: CreatePost): Promise<Posts> {
    console.log(data);
    return this.postsService.createPost(data);
  }

  @Delete('delete')
  async deletePost(@Body() body: { postId: number }): Promise<Posts[]> {
    return this.postsService.deletePost(body.postId);
  }

  @Put('update')
  async updatePost(@Body() data: Posts): Promise<Posts> {
    return this.postsService.updatePost(data);
  }
}
