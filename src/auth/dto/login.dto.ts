import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from 'src/entities/user.entitiy';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class LoginResponse {
  user?: User;
  message?: string;
}
