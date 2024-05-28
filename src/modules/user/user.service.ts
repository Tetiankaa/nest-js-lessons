import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { LoggerService } from '../logger/logger.service';
import { CreateUserReqDto } from './dto/req/create-user-req.dto';
import { UpdateUserReqDto } from './dto/req/update-user-req.dto';
import { BaseUserResDto } from './dto/res/base-user-res.dto';
import { PublicUserResDto } from './dto/res/public-user-res,dto';

@Injectable()
export class UserService {
  // private readonly logger = new Logger(UserService.name);

  constructor(private readonly loggerService: LoggerService) {}
  async create(createUserDto: CreateUserReqDto): Promise<BaseUserResDto> {
    this.loggerService.log('This actions adds new user');
    throw new Error('This action adds a new user......');
    return {
      id: uuidv4(),
      email: createUserDto.email,
      name: createUserDto.name,
      password: createUserDto.password,
      avatar: createUserDto.avatar,
      age: createUserDto.age,
    };
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number): Promise<PublicUserResDto> {
    throw new Error(`User with id ${id} was not found`);
    return {
      id: `${id}`,
      name: 'Naame',
      avatar: 'avatar.png',
      age: 55,
    };
  }

  async update(id: number, updateUserDto: UpdateUserReqDto) {
    console.log(updateUserDto);
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
