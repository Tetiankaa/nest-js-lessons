import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../../database/entities/user.entity';
import { RepositoryModule } from '../repository/repository.module';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  // imports: [TypeOrmModule.forFeature([UserEntity])],
  imports: [RepositoryModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
