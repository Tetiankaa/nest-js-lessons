import { Test } from '@nestjs/testing';

import { UserMock } from '../../../test/__mocks__/user.mock';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { mockUserProviders } from './__mocks__/user.module';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

describe(UserController.name, () => {
  let controller: UserController;
  let mockService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [...mockUserProviders],
    }).compile();
    controller = module.get<UserController>(UserController);
    mockService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getMe', () => {
    it('should return user', async () => {
      const userData: IUserData = UserMock.userData();
      const resDto = UserMock.toResponseDTO();

      const result = await controller.getMe(userData);
      expect(mockService.getMe).toHaveBeenCalledWith(userData);
      expect(result).toEqual(resDto);
    });
  });
});
