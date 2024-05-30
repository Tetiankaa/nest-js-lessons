import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ETableName } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';

@Entity({ name: ETableName.FOLLOWS })
export class FollowEntity extends BaseModel {
  @Column()
  follower_id: string;

  @Column()
  following_id: string;

  @ManyToOne(() => UserEntity, (entity) => entity.followers)
  @JoinColumn({ name: 'follower_id' })
  user_follower?: UserEntity;

  @ManyToOne(() => UserEntity, (entity) => entity.followings)
  @JoinColumn({ name: 'following_id' })
  user_following?: UserEntity;
}
