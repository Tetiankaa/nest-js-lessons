import { UserEntity } from '../../../database/entities/user.entity';
import { UserResDto } from '../dto/res/user-res.dto';

export class UserMapper {
  public static toResponseDTO(user: UserEntity): UserResDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image || null,
      bio: user.bio || null,
      isFollowed: user.followings ? user.followings.length > 0 : false,
    };
  }
}
