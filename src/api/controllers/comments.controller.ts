import {
  Controller,
  Get,
  Body,
  Delete,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { News } from '../dto/news.dto';
import { DecrementId } from '../utils/decrement-id.decorator';
import { CommentSimple } from '../dto/comment.dto';
import { CommentsService } from '../modules/comments/comments.service';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Express, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoggingInterceptor } from '../modules/logger/logger.interceptor';

@UseInterceptors(new LoggingInterceptor())
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('/')
  async getComments(
    @Query() @DecrementId(['id']) query: { id: number },
  ): Promise<CommentSimple[]> {
    return this.commentsService.getComments(query.id);
  }

  @Get('get-one')
  async getComment(
    @Query()
    @DecrementId(['postId', 'commentId'])
    query: {
      postId: number;
      commentId: number;
    },
  ): Promise<CommentSimple | undefined> {
    return this.commentsService.getComment(query.postId, query.commentId);
  }

  @Get('edit')
  async editComment(
    @Query()
    @DecrementId(['postId', 'commentId'])
    query: {
      postId: number;
      commentId: number;
      newText: string;
    },
  ): Promise<CommentSimple | undefined> {
    return this.commentsService.editComment(
      query.postId,
      query.commentId,
      query.newText,
    );
  }

  @Post('create')
  async createComment(
    @Query() @DecrementId(['id']) query: { id: number },
    @Body() data: CommentSimple,
  ): Promise<CommentSimple> {
    return this.commentsService.createComment(query.id, data);
  }

  @Delete('delete')
  async deleteComment(
    @Body() body: { postId: number; commentId: number },
  ): Promise<News[]> {
    return this.commentsService.deleteComment(body.postId, body.commentId);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() body: { postId: number; commentId: number },
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.commentsService.assignFile(
      body.postId,
      body.commentId,
      file.path,
    );
    console.log(body.postId);
    console.log(file);
    // this.commentsService.saveFile('files/receipt.pdf', file.buffer);
  }

  @Get('file')
  async getFile(
    @Query()
    @DecrementId(['postId', 'commentId'])
    query: {
      postId: number;
      commentId: number;
    },
    @Res() res: Response,
  ) {
    const path = await this.commentsService.getPath(
      query.postId,
      query.commentId,
    );
    if (!path) throw new Error('No attachment file');

    const file = createReadStream(join(process.cwd(), path));
    //return new StreamableFile(file);
    file.pipe(res);
  }
}
