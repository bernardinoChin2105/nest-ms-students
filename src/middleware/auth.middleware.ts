import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import passport from 'passport';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/api/unauthorized'
    }, async (promiseValue: any) => {
      const value = await promiseValue;
      if (value) {
        next();
      }
      else {
        throw new UnauthorizedException();
      }
    })(req, res, next);
  }
}