import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { Comment } from '../dto/comment.dto';
import { CommentsService } from '../modules/comments/comments.service';
import { DecrementId } from '../utils/decrement-id.decorator';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('/')
  async getComments(
    @Query() @DecrementId(['postId']) query: { postId: number },
  ): Promise<Comment[]> {
    return this.commentsService.getComments(query.postId);
  }

  @Get('get-one')
  async getComment(
    @Query()
    @DecrementId(['postId', 'commentId'])
    query: {
      postId: number;
      commentId: number;
    },
  ): Promise<Comment | undefined> {
    return this.commentsService.getComment(query.postId, query.commentId);
  }

  @Get('/edit')
  async editComment(
    @Query()
    @DecrementId(['postId', 'commentId'])
    query: {
      postId: number;
      commentId: number;
      newText: string;
    },
  ): Promise<Comment | undefined> {
    return this.commentsService.editComment(
      query.postId,
      query.commentId,
      query.newText,
    );
  }

  @Post('create')
  async createComment(
    @Query() @DecrementId(['id']) query: { commentId: number },
    @Body() data: Comment,
  ): Promise<Comment> {
    return this.commentsService.createComment(query.commentId, data);
  }

  @Delete('delete')
  async deleteComment(
    @Body() body: { postId: number; commentId: number },
  ): Promise<Comment> {
    return this.commentsService.deleteComment(body.postId, body.commentId);
  }
}
