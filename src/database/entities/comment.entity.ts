import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { ETableName } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';

@Entity({ name: ETableName.COMMENTS })
export class CommentEntity extends BaseModel {
  @Column('text')
  body: string;

  @Column()
  user_id: string;

  @Column()
  article_id: string;

  @ManyToOne(() => UserEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ArticleEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'article_id' })
  article: ArticleEntity;
}
