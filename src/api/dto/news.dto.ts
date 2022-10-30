export class News {
  id!: number;

  name!: string;

  createdAt!: Date;

  updatedAt!: Date;

  text!: string;

  author!: string;

  comments!: Comment[];
}
