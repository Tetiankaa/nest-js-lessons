import { Global, Module } from '@nestjs/common';

import { UserRepository } from './services/user.repository';

@Global()
@Module({
  exports: [UserRepository],
  providers: [UserRepository],
})
export class RepositoryModule {}
