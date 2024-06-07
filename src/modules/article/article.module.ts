import { Module } from '@nestjs/common';

import { RepositoryModule } from '../repository/repository.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './services/article.service';

@Module({
  imports: [RepositoryModule],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
