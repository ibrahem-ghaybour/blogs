import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name?: string;

  @IsString()
  @IsDefined()
  image?: string = '';

  @IsBoolean()
  admin?: boolean = false;
}
