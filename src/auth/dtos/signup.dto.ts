import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class SigneUpDto {
  @IsString()
  name: string;

  @IsString()
  @IsDefined()
  image: string = '';

  @IsEmail()
  email: string;

  @IsString()
  role: string = 'user';

  @IsString()
  @MinLength(8)
  password: string;
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
}
