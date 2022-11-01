import {
  IsInt,
  IsPositive,
  IsString,
  IsDate,
  IsArray,
  IsOptional,
} from 'class-validator';
import { CommentSimple } from './comment.dto';

export class CreatePost {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  description!: string;

  @IsString()
  text!: string;

  @IsArray()
  @IsOptional()
  comments!: CommentSimple[];
}

export class News extends CreatePost {
  @IsInt()
  @IsPositive()
  id!: number;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt!: Date;
}
