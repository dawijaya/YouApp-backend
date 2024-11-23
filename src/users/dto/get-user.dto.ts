import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUserDto {
  @ApiPropertyOptional({
    description: 'ID pengguna yang ingin diambil datanya',
    example: '63fc4eb5f04e5c28d8f83f2b',
  })
  @IsString()
  @IsOptional()
  userId?: string; // Opsional, jika ingin mengambil data pengguna berdasarkan ID tertentu
}
