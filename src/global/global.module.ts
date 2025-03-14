import { Global, Module } from '@nestjs/common';

import { SecretsModule } from './secrets/module';

@Global()
@Module({
  imports: [SecretsModule],
  providers: [],
  exports: [SecretsModule],
})
export class GlobalModule {}
