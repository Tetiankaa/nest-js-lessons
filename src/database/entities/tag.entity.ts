import { Column, Entity, JoinTable, ManyToMany, VirtualColumn } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { ETableName } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';

@Entity({ name: ETableName.TAGS })
export class TagEntity extends BaseModel {
  @Column('text')
  name: string;

  @ManyToMany(() => ArticleEntity, (entity) => entity.tags)
  @JoinTable()
  articles?: ArticleEntity[];

  @VirtualColumn({ query: () => 'NULL' })
  articlesCount: number;
}
