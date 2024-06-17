import { UserEntity } from '../../src/database/entities/user.entity';
import { IUserData } from '../../src/modules/auth/interfaces/user-data.interface';
import { UpdateUserReqDto } from '../../src/modules/user/dto/req/update-user-req.dto';
import { UserResDto } from '../../src/modules/user/dto/res/user-res.dto';

export class UserMock {
  static userData(properties?: Partial<IUserData>): IUserData {
    return {
      userId: 'testId',
      email: 'test@mail.com',
      deviceId: 'testDeviceId',
      ...(properties || {}),
    };
  }

  static userEntity(properties?: Partial<UserEntity>): UserEntity {
    return {
      id: 'testId',
      email: 'test@mail.com',
      image: 'testImage',
      name: 'testName',
      password: 'testPassword',
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
      bio: 'testBio',
      ...(properties || {}),
    };
  }

  static updateUserReqDto(
    properties?: Partial<UpdateUserReqDto>,
  ): UpdateUserReqDto {
    return {
      name: 'testName',
      bio: 'testBio',
      ...(properties || {}),
    };
  }

  static toResponseDTO(properties?: Partial<UserResDto>): UserResDto {
    return {
      id: 'testId',
      email: 'test@mail.com',
      image: 'https://example-bucket-url.com/testImage',
      name: 'testName',
      bio: 'testBio',
      isFollowed: false,
      ...(properties || {}),
    };
  }
}
