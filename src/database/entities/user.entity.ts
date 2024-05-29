import { Column, Entity, OneToMany } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { ETableName } from './enums/table-name.enum';
import { LikeEntity } from './like.entity';
import { BaseModel } from './models/base.model';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity({ name: ETableName.USERS })
export class UserEntity extends BaseModel {
  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text', { nullable: true })
  image?: string;

  @Column('text', { nullable: true })
  bio?: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => ArticleEntity, (article) => article.user)
  articles?: ArticleEntity[];

  @OneToMany(() => LikeEntity, (likes) => likes.user)
  likes?: LikeEntity[];
}
