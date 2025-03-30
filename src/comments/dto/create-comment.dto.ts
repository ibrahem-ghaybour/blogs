import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  blogId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsOptional() // Ensures it is truly optional
  @IsString() // Ensures avatar it's a string if provided
  avatar?: string;
}
