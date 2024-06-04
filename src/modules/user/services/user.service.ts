import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { UserEntity } from '../../../database/entities/user.entity';
import { LoggerService } from '../../logger/logger.service';
import { UserRepository } from '../../repository/services/user.repository';


@Injectable()
export class UserService {
  // private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly loggerService: LoggerService,
    // @InjectRepository(UserEntity)
    // private userRepository: Repository<UserEntity>,
    private readonly userRepository: UserRepository,
  ) {}
  //
  // async create(createUserDto: BaseUserReqDto): Promise<PrivateUserResDto> {
  //   // this.loggerService.log('This actions adds new user');
  //   // throw new Error('This action adds a new user......');
  //   const { name, image, password, email } = createUserDto;
  //   const user = await this.userRepository.save({
  //     name,
  //     image,
  //     email,
  //     password,
  //     isActive: true,
  //   });
  //   return null;
  // }

  public async isEmailUniqueOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user)
      throw new ConflictException('User with provided email already exist.');
  }
}
