import { forwardRef, Module } from '@nestjs/common';

import { FileStorageModule } from '../file-storage/file-storage.module';
import { RepositoryModule } from '../repository/repository.module';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  // imports: [TypeOrmModule.forFeature([UserEntity])],
  imports: [RepositoryModule, FileStorageModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
