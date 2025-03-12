import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY', // استبدلها بمفتاح سري أكثر أمانًا في env
    });
  }

  async validate(payload: any) {
    return {
      ...payload,
      // userId: payload._id,
      // name: payload.name,
      // email: payload.email,
      // admin: payload.admin,
    };
  }
}
