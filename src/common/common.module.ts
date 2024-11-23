import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ValidationPipe } from './pipes/validation.pipe';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Module({
  providers: [
    JwtAuthGuard, // Guard untuk JWT
    ValidationPipe, // Pipe untuk validasi
    HttpExceptionFilter, // Filter untuk menangani error
  ],
  exports: [
    JwtAuthGuard, // Ekspor untuk digunakan di modul lain
    ValidationPipe, // Ekspor untuk digunakan di modul lain
    HttpExceptionFilter, // Ekspor untuk digunakan di modul lain
  ],
})
export class CommonModule {}
