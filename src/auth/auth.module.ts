import { Module } from '@nestjs/common';
import { ApiKeyStrategy } from './api-key.strategy'
import { AuthService } from './auth.service';

import { PassportModule} from '@nestjs/passport';

@Module({
  imports:[PassportModule],
  providers: [AuthService, ApiKeyStrategy]
})
export class AuthModule {}
