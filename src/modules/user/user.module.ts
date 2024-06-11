import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../../database/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { RepositoryModule } from '../repository/repository.module';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { FileStorageModule } from "../file-storage/file-storage.module";

@Module({
  // imports: [TypeOrmModule.forFeature([UserEntity])],
  imports: [RepositoryModule, FileStorageModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
