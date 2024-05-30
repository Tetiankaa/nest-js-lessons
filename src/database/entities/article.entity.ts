import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { CommentEntity } from './comment.entity';
import { ETableName } from './enums/table-name.enum';
import { LikeEntity } from './like.entity';
import { BaseModel } from './models/base.model';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';

@Entity({ name: ETableName.ARTICLES })
export class ArticleEntity extends BaseModel {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  body: string;

  @Column('text')
  user_id: string;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @OneToMany(() => LikeEntity, (entity) => entity.article)
  likes?: LikeEntity[];

  @ManyToMany(() => TagEntity, (entity) => entity.articles)
  tags?: TagEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.article)
  comments: CommentEntity[];
}
