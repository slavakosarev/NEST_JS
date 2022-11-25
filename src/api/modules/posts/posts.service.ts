import { Injectable } from '@nestjs/common';
import { Posts, CreatePost } from '../../dto/post.dto';

const posts: Posts[] = [
  {
    id: 1,
    name: 'fitst',
    description: 'first',
    text: 'first text',
    createdAt: new Date(Date.parse('2022-04-19T18:11:10.386Z')),
    updatedAt: new Date(Date.parse('2022-04-19T18:11:10.386Z')),
    comments: [
      {
        id: 1,
        text: 'comment first native',
        createdAt: new Date(Date.parse('2022-04-19T18:11:10.386Z')),
        attachments: null,
      },
      {
        id: 2,
        text: 'second native comment',
        createdAt: new Date(Date.parse('2022-04-19T18:11:10.386Z')),
        attachments: null,
      },
    ],
  },
];

@Injectable()
export class PostsService {
  async getPosts(): Promise<Posts[]> {
    return posts;
  }
  async getPost(id: number): Promise<Posts | undefined> {
    return posts[id - 1];
  }
  async createPost(data: Posts): Promise<Posts> {
    posts.push(data);
    return data;
  }
  async updatePost(data: Posts): Promise<Posts> {
    let existingPost = posts[data.id];
    existingPost = {
      ...existingPost,
      ...data,
    };
    posts[data.id] = existingPost;
    return posts[data.id];
  }
  async deletePost(id: number): Promise<Posts[]> {
    const post = posts[id];
    if (post) {
      posts.splice(id, id);
      return posts;
    } else throw new Error('Post not found');
  }
}
