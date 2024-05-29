import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../../database/entities/user.entity';
import { RepositoryModule } from '../repository/repository.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  // imports: [TypeOrmModule.forFeature([UserEntity])],
  imports: [RepositoryModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
