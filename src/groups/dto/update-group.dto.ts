import { IsString, IsOptional, IsArray } from 'class-validator';
// import { Types } from 'mongoose';

export class UpdateGroupDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  // @IsOptional()
  // @IsArray()
  // blogs?: Types.ObjectId[];
  @IsOptional()
  @IsString()
  icon?: string;
}
