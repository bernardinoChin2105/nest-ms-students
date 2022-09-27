import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { AuthService } from './auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {

    constructor(
        private authService: AuthService
    ) {
        super(
            // Ejemplo: Authorization: 'ApiKey ca03na188ame03u1d78620de67282882a84'
            { header: 'Authorization', prefix: 'Api-Key ' },
            false,
            (apikey: string, done: any) => {
                const keyExists = this.authService.validateApiKey(apikey);
                return done(!!keyExists);
            }
        );
    }
}