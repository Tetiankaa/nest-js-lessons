import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { LoggerService } from '../../logger/logger.service';
import { FollowRepository } from '../../repository/services/follow.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../dto/req/update-user-req.dto';
import { UserResDto } from '../dto/res/user-res.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  // private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly loggerService: LoggerService,
    private readonly userRepository: UserRepository,
    private readonly followRepository: FollowRepository,
  ) {}

  public async isEmailUniqueOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user)
      throw new ConflictException('User with provided email already exist.');
  }
  public async getMe(userData: IUserData): Promise<UserResDto> {
    const { userId } = userData;
    const user = await this.userRepository.findOneBy({ id: userId });
    return UserMapper.toResponseDTO(user);
  }
  public async getById(id: string): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User was not found.');
    }
    return UserMapper.toResponseDTO(user);
  }
  public async updateMe(
    userData: IUserData,
    value: UpdateUserReqDto,
  ): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    const updatedUser = await this.userRepository.save({ ...user, ...value });
    return UserMapper.toResponseDTO(updatedUser);
  }
  public async follow(userData: IUserData, userId: string): Promise<void> {
    if (userData.userId === userId) {
      throw new ConflictException('You cannot follow yourself.');
    }
    const userToFollow = await this.userRepository.findOneBy({ id: userId });
    if (!userToFollow) {
      throw new NotFoundException('User not found.');
    }
    const existedFollow = await this.followRepository.findOneBy({
      follower_id: userData.userId,
      following_id: userId,
    });
    if (existedFollow) {
      throw new ConflictException('You are already following this user.');
    }
    await this.followRepository.save(
      this.followRepository.create({
        follower_id: userData.userId,
        following_id: userId,
      }),
    );
  }
  public async unfollow(userData: IUserData, userId: string): Promise<void> {
    if (userData.userId === userId) {
      throw new ConflictException('You cannot unfollow yourself.');
    }
    const userToUnfollow = await this.userRepository.findOneBy({ id: userId });
    if (!userToUnfollow) {
      throw new NotFoundException('User not found.');
    }
    const existedFollow = await this.followRepository.findOneBy({
      follower_id: userData.userId,
      following_id: userId,
    });
    if (!existedFollow) {
      throw new ConflictException(
        'You cant unfollow user you are not following',
      );
    }
    await this.followRepository.remove(existedFollow);
  }
  // public async deleteMe(userData: IUserData): Promise<void> {
  //   await this.userRepository.remove({id: userData.userId})
  // }
}
