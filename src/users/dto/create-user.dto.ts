import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nama lengkap pengguna',
    example: 'JohnDoe12',
  })
  @IsString()
  @IsNotEmpty({ message: 'Nama pengguna tidak boleh kosong' })
  username: string;
    
  @ApiProperty({
    description: 'Nama lengkap pengguna',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty({ message: 'Nama pengguna tidak boleh kosong' })
  name: string;

  @ApiProperty({
    description: 'Email pengguna',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email: string;

  @ApiProperty({
    description: 'Kata sandi pengguna',
    example: 'password123',
  })
  @IsString()
  @Length(6, 20, { message: 'Kata sandi harus antara 6 hingga 20 karakter' })
  password: string;
}
