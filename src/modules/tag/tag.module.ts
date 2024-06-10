import { Module } from '@nestjs/common';

import { RepositoryModule } from '../repository/repository.module';
import { TagService } from './services/tag.service';
import { TagController } from './tag.controller';

@Module({
  imports: [RepositoryModule],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
