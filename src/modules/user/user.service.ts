import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { UserEntity } from '../../database/entities/user.entity';
import { LoggerService } from '../logger/logger.service';
import { UserRepository } from '../repository/services/user.repository';
import { CreateUserReqDto } from './dto/req/create-user-req.dto';
import { UpdateUserReqDto } from './dto/req/update-user-req.dto';
import { PrivateUserResDto } from './dto/res/private-user-res.dto';
import { PublicUserResDto } from './dto/res/public-user-res,dto';

@Injectable()
export class UserService {
  // private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly loggerService: LoggerService,
    // @InjectRepository(UserEntity)
    // private userRepository: Repository<UserEntity>,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserReqDto): Promise<PrivateUserResDto> {
    // this.loggerService.log('This actions adds new user');
    // throw new Error('This action adds a new user......');
    const { firstName, lastName, image, password, email } = createUserDto;
    const user = await this.userRepository.save({
      firstName,
      lastName,
      image,
      email,
      password,
      isActive: true,
    });
    return user;
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number): Promise<PublicUserResDto> {
    throw new Error(`User with id ${id} was not found`);
    return;
  }

  async update(id: number, updateUserDto: UpdateUserReqDto) {
    console.log(updateUserDto);
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
