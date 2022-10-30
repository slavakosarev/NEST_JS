import { Injectable } from '@nestjs/common';
import { Comment } from '../../dto/comment.dto';
import { NewsService } from '../news/news.service';

@Injectable()
export class CommentsService {
  constructor(private readonly newsService: NewsService) {}

  async getComments(postId: number): Promise<Comment[]> {
    const news = await this.newsService.getPosts();
    return news[postId].comments;
  }

  async getComment(postId: number, commentId: number): Promise<Comment> {
    const news = await this.newsService.getPosts();
    return news[postId].comments[commentId];
  }
  async editComment(
    postId: number,
    commentId: number,
    newText: string,
  ): Promise<Comment> {
    const news = await this.newsService.getPosts();
    if (newText) news[postId].comments[commentId].data = newText;
    return news[postId].comments[commentId];
  }

  async createComment(postId: number, data: Comment): Promise<Comment> {
    const news = await this.newsService.getPosts();
    news[postId].comments.push(data);
    return data;
  }

  async deleteComment(postId: number, commentId: number): Promise<Comment> {
    const news = await this.newsService.getPosts();
    const post = news[postId];
    const comment = post.comments;
    if (comment) {
      comment.splice(commentId, commentId);
      return comment;
    } else throw new Error(`Comment not found`);
  }

  updateComments(data: Comment): Comment | PromiseLike<Comment> {
    throw new Error('Method not implemented.');
  }
}
