import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Pastikan token expired akan ditolak
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret', // Hanya gunakan secret dari environment variable
    });
  }

  async validate(payload: any) {
    // Mengembalikan data user yang valid
    return { userId: payload.sub, username: payload.username };
  }
}
