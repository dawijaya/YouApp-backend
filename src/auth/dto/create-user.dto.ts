import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username pengguna',
    example: 'dandi123',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'nama pengguna',
    example: 'dandi agus wijaya',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Alamat email pengguna',
    example: 'dandi@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Kata sandi pengguna, minimal 6 karakter',
    example: 'password123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
