import {
  IsBoolean,
  IsEmail,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class SigneUpDto {
  @IsString()
  name: string;

  @IsString()
  image?: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  admin: boolean = false;

  @IsString()
  @MinLength(6)
  password: string;
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
}
