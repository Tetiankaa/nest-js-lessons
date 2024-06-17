import { Test, TestingModule } from '@nestjs/testing';

import { UserMock } from '../../../../test/__mocks__/user.mock';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { LoggerService } from '../../logger/logger.service';
import { FollowRepository } from '../../repository/services/follow.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { mockUserProviders } from '../__mocks__/user.module';
import { UserResDto } from '../dto/res/user-res.dto';
import { UserMapper } from './user.mapper';
import { UserService } from './user.service';
import { ConflictException, NotFoundException } from "@nestjs/common";

describe(UserService.name, () => {
  let service: UserService;
  let mockLoggerService: LoggerService;
  let mockUserRepository: UserRepository;
  let mockFollowRepository: FollowRepository;
  let mockFileStorageService: FileStorageService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [...mockUserProviders, UserService],
    }).compile();
    service = module.get<UserService>(UserService);

    mockLoggerService = module.get<LoggerService>(LoggerService);
    mockUserRepository = module.get<UserRepository>(UserRepository);
    mockFollowRepository = module.get<FollowRepository>(FollowRepository);
    mockFileStorageService = module.get<FileStorageService>(FileStorageService);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getMe', () => {
    it('should return user', async () => {
      const userData: IUserData = UserMock.userData();
      const userEntity: UserEntity = UserMock.userEntity();
      const resDto: UserResDto = UserMock.toResponseDTO();
      jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(userEntity);
      jest.spyOn(UserMapper, 'toResponseDTO').mockReturnValue(resDto);

      const result = await service.getMe(userData);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        id: userData.userId,
      });
      expect(result).toEqual(resDto);
    });
  });
  describe('updateMe', () => {
    it('should return updated user', async () => {
      const userData = UserMock.userData();
      const dto = UserMock.updateUserReqDto();
      const resDto = UserMock.toResponseDTO();
      const userBeforeUpdate = UserMock.userEntity();
      const userAfterUpdate = UserMock.userEntity(dto);

      jest
        .spyOn(mockUserRepository, 'findOneBy')
        .mockResolvedValue(userBeforeUpdate);
      jest.spyOn(mockUserRepository, 'save').mockResolvedValue(userAfterUpdate);
      jest.spyOn(UserMapper, 'toResponseDTO').mockReturnValue(resDto);

      const result = await service.updateMe(userData, dto);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        id: userData.userId,
      });
      expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(resDto);
      expect(result.id).toBe(resDto.id);
      expect(result.email).toBe(resDto.email);
    });
  });

  describe('follow', () => {
    it('should throw ConflictException when user tries to follow himself', async () => {
      const userData = UserMock.userData();
      await expect(service.follow(userData, userData.userId)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw NotFoundConflictExceptionException', async () => {
      const userData = UserMock.userData();
      jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(null);
      await expect(service.follow(userData, 'testID')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ConflictException when user tries to follow himself', async () => {
      const userData = UserMock.userData();
      const userEntity = UserMock.userEntity();
      jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(userEntity);
      jest
        .spyOn(mockFollowRepository, 'findOneBy')
        .mockResolvedValue({} as any);
      await expect(service.follow(userData, 'testID')).rejects.toThrow(
        ConflictException,
      );
    });

    it('should follow user', async () => {
      const userData = UserMock.userData();
      const userEntity = UserMock.userEntity();
      jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(userEntity);
      jest.spyOn(mockFollowRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(mockFollowRepository, 'save').mockResolvedValue(null);

      await service.follow(userData, 'testID');

      expect(mockUserRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockFollowRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockFollowRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
