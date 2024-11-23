import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Email pengguna untuk login',
    example: 'dandi@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password pengguna untuk login',
    example: 'yourpassword123',
  })
  @IsNotEmpty()
  password: string;
}
