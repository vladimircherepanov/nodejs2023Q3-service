import { IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsString()
  @Length(3, 30)
  login: string;
  @IsString()
  @Length(5, 30)
  password: string;
}
