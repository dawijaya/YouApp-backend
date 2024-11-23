import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    // Memeriksa apakah endpoint bersifat publik (menggunakan custom decorator)
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true; // Izinkan akses jika endpoint bersifat publik
    }

    // Jika tidak publik, gunakan mekanisme default AuthGuard
    return super.canActivate(context) as boolean;
  }

  handleRequest(err: any, user: any) {
    // Tangani error dengan pesan spesifik
    if (err || !user) {
      throw err || new UnauthorizedException('Token tidak valid atau sudah kedaluwarsa');
    }
    return user; // Kembalikan user jika valid
  }
}
