import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from './post.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: string;

  @Column({ name: 'text', type: 'text' })
  text!: string;

  @ManyToOne(() => Posts)
  @JoinColumn()
  post!: Posts;

  @Column({ name: 'post_id', type: 'int' })
  posrId!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
