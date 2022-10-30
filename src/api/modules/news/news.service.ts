import { Injectable } from '@nestjs/common';
import { News } from '../../dto/news.dto';

const news: News[] = [
  {
    id: 1,
    name: 'Someitle',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    author: 'SomeBody',
    text: 'first',
    comments: [
      {
        id: 1,
        text: 'first comment',
        createdAt: new Date(Date.now()),
      },
      {
        id: 2,
        text: 'second comment',
        createdAt: new Date(Date.now()),
      },
    ],
  },
];

@Injectable()
export class NewsService {
  newsService: any;
  async getPosts(): Promise<News[]> {
    return news;
  }

  async getPost(postId: number): Promise<News> {
    const post = news[postId];

    if (post) {
      return news[postId];
    } else throw new Error('Post not found');
  }

  async createPost(data: News): Promise<News> {
    news.push(data);
    return data;
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
}
