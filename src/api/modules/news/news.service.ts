import { Injectable } from '@nestjs/common';
import { News, CreatePost } from '../../dto/news.dto';

const news: News[] = [
  {
    id: 1,
    name: 'fitst',
    description: 'first',
    text: 'first text',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    comments: [
      {
        id: 1,
        text: 'comment first native',
        createdAt: new Date(Date.now()),
        attachments: null,
      },
      {
        id: 2,
        text: 'second native comment',
        createdAt: new Date(Date.now()),
        attachments: null,
      },
    ],
  },
];

let postId = 2;

@Injectable()
export class NewsService {
  newsService: any;
  async getPosts(): Promise<News[]> {
    return news;
  }

  async createPost(data: CreatePost): Promise<News> {
    const post: News = {
      ...data,
      id: postId++,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      comments: [],
    };

    news.push(post);
    return post;
  }

  async updatePost(data: News): Promise<News> {
    let existingPost = news[data.id];
    existingPost = {
      ...existingPost,
      ...data,
    };
    news[data.id] = existingPost;
    return news[data.id];
  }
  async deletePost(id: number): Promise<News[]> {
    const post = news[id];
    if (post) {
      news.splice(id - 1, 1);
      return news;
    } else throw new Error('Post not found');
  }

  async getPost(postId: number): Promise<News> {
    const post = news[postId];

    if (post) {
      return news[postId];
    } else throw new Error('Post not found');
  }
}
