import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    validateApiKey(apiKey: string) {

        // VALID KEYS
        const apiKeys: string[] = [
            'ca03na188ame03u1d78620de67282882a84',
            'd2e621a6646a4211768cd68e26f21228a81'
        ];

        return apiKeys.find(x => x === apiKey);
    }
}
