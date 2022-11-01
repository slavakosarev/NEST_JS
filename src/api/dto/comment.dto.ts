import { IsInt, IsString, IsDate, IsOptional } from 'class-validator';

export class Comment {
  @IsInt()
  @IsOptional()
  id!: number;

  @IsDate()
  @IsOptional()
  createdAt!: Date;
}

export class CommentSimple extends Comment {
  @IsString()
  text!: string;
  attachments!: string | null;
}
