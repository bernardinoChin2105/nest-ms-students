import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import passport from 'passport';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/api/unauthorized'
    }, (value: any) => {
      // Si la autenticación fué correcta procede con la solicitud: next();
      if (value) {
        next();
      }
      // En caso contrario retorna un error de autorización
      else {
        throw new UnauthorizedException();
      }
    })(req, res, next);
  }
}