import { Global, Module } from '@nestjs/common';

import { SecretsModule } from './secrets/module';
import { TokenHelper } from 'src/lib/utils/token/token.utils';
import { UserSessionModule } from './user-session/module';

@Global()
@Module({
  imports: [SecretsModule, UserSessionModule],
  providers: [TokenHelper],
  exports: [SecretsModule, TokenHelper, UserSessionModule],
})
export class GlobalModule {}
