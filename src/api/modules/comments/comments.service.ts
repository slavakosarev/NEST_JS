import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { MailService } from '../../../mail/mail.service';
import { CommentSimple } from '../../dto/comment.dto';
import { MyLogger } from '../logger/logger.service';
import { NewsService } from '../news/news.service';
import { News } from '../../dto/news.dto';

let commentId = 3;

@Injectable()
export class CommentsService {
  constructor(
    private readonly newsService: NewsService,
    private readonly mailService: MailService,
    private readonly logger: MyLogger,
  ) {
    this.logger.setContext('CommentsService');
  }

  async getComments(postId: number): Promise<CommentSimple[]> {
    const news = await this.newsService.getPosts();
    return news[postId].comments;
  }

  async getComment(postId: number, commentId: number): Promise<CommentSimple> {
    const news = await this.newsService.getPosts();
    return news[postId].comments[commentId];
  }
  async editComment(
    postId: number,
    commentId: number,
    newText: string,
  ): Promise<CommentSimple> {
    const news = await this.newsService.getPosts();
    if (newText) news[postId].comments[commentId].text = newText;
    return news[postId].comments[commentId];
  }

  async createComment(
    postId: number,
    data: CommentSimple,
  ): Promise<CommentSimple> {
    await this.mailService.sendLogMessage('slava_kosarev@mail.ru');
    const news = await this.newsService.getPosts();
    const post: CommentSimple = {
      ...data,
      id: commentId++,
      createdAt: new Date(Date.now()),
    };
    news[postId].comments.push(post);
    return data;
  }

  async assignFile(postId: number, commentId: number, path: string) {
    this.logger.warn(
      `New pdf file assigned to post id ${postId} to comment id ${commentId}`,
    );
    const news = await this.newsService.getPosts();
    news[postId - 1].comments[commentId - 1].attachments = path;
    return news;
  }

  async saveFile(path: string, data: Buffer) {
    fs.writeFile(path, data, (error) => {
      if (error) throw new Error(error.message);
    });
  }

  async getPath(postId: number, commentId: number): Promise<string | null> {
    const news = await this.newsService.getPosts();
    return news[postId].comments[commentId].attachments;
  }

  async deleteComment(postId: number, commentId: number): Promise<News[]> {
    const news = await this.newsService.getPosts();
    const post = news[postId];
    const comment = post.comments[commentId];
    if (comment) {
      post.comments.splice(commentId, 1);
      return news;
    } else throw new Error('Comment not found');
  }

  updateComments(
    data: CommentSimple,
  ): CommentSimple | PromiseLike<CommentSimple> {
    throw new Error('Method not implemented.');
  }
}
