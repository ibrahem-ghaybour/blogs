import { IsString, IsOptional, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  // @IsOptional()
  // @IsArray()
  // blogs?: Types.ObjectId[];

  @IsString()
  icon?: string;
}
// TOPIC
