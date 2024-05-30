import { Global, Module } from '@nestjs/common';

import { ArticleRepository } from './services/article.repository';
import { CommentRepository } from './services/comment.repository';
import { LikeRepository } from './services/like.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { TagRepository } from './services/tag.repository';
import { UserRepository } from './services/user.repository';

@Global()
@Module({
  exports: [
    UserRepository,
    ArticleRepository,
    CommentRepository,
    LikeRepository,
    RefreshTokenRepository,
    TagRepository,
  ],
  providers: [
    UserRepository,
    ArticleRepository,
    CommentRepository,
    LikeRepository,
    RefreshTokenRepository,
    TagRepository,
  ],
})
export class RepositoryModule {}
