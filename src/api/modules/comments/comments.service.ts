import { Injectable } from '@nestjs/common';
import { Posts } from 'src/api/dto/post.dto';
import { CommentSimple } from '../../../api/dto/comment.dto';
import { PostsService } from '../posts/posts.service';
import * as fs from 'fs';
import { MyLogger } from '../logger/logger.service';
import { MailService } from '../../../mail/mail.service';

let commentId = 3;

@Injectable()
export class CommentsService {
  constructor(
    private readonly postsService: PostsService,
    private readonly mailService: MailService,
    private readonly logger: MyLogger,
  ) {
    this.logger.setContext('CommentsService');
  }

  async getComments(postId: number): Promise<CommentSimple[]> {
    const posts = await this.postsService.getPosts();
    return posts[postId].comments;
  }

  async getComment(postId: number, commentId: number): Promise<CommentSimple> {
    const posts = await this.postsService.getPosts();
    return posts[postId].comments[commentId];
  }

  async editComment(
    postId: number,
    commentId: number,
    newText: string,
  ): Promise<CommentSimple> {
    const posts = await this.postsService.getPosts();
    if (newText) posts[postId].comments[commentId].text = newText;
    return posts[postId].comments[commentId];
  }

  async createComment(
    postId: number,
    data: CommentSimple,
  ): Promise<CommentSimple> {
    await this.mailService.sendLogMessage('maksimkukushkin@inbox.ru');
    const posts = await this.postsService.getPosts();
    const post: CommentSimple = {
      ...data,
      id: commentId++,
      createdAt: new Date(Date.now()),
    };
    posts[postId].comments.push(post);
    return data;
  }

  async assignFile(postId: number, commentId: number, path: string) {
    this.logger.warn(
      `New pdf file assigned to post id ${postId} to comment id ${commentId}`,
    );
    const posts = await this.postsService.getPosts();
    posts[postId - 1].comments[commentId - 1].attachments = path;
    return posts;
  }

  async saveFile(path: string, data: Buffer) {
    fs.writeFile(path, data, (error) => {
      if (error) throw new Error(error.message);
    });
  }

  async getPath(postId: number, commentId: number): Promise<string | null> {
    const posts = await this.postsService.getPosts();
    return posts[postId].comments[commentId].attachments;
  }

  async deleteComment(postId: number, commentId: number): Promise<Posts[]> {
    const posts = await this.postsService.getPosts();
    const post = posts[postId];
    const comment = post.comments[commentId];
    if (comment) {
      post.comments.splice(commentId, 1);
      return posts;
    } else throw new Error('Comment not found');
  }

  updateComments(
    data: CommentSimple,
  ): CommentSimple | PromiseLike<CommentSimple> {
    throw new Error('Method not implemented.');
  }
}
