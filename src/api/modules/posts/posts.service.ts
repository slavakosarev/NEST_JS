import { Injectable } from '@nestjs/common';
import { Posts, CreatePost } from '../../dto/post.dto';

const posts: Posts[] = [
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
export class PostsService {
  postsService: any;
  async getPosts(): Promise<Posts[]> {
    return posts;
  }

  async createPost(data: CreatePost): Promise<Posts> {
    const post: Posts = {
      ...data,
      id: postId++,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      comments: [],
    };

    posts.push(post);
    return post;
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
      posts.splice(id - 1, 1);
      return posts;
    } else throw new Error('Post not found');
  }

  async getPost(postId: number): Promise<Posts> {
    const post = posts[postId];

    if (post) {
      return posts[postId];
    } else throw new Error('Post not found');
  }
}
