import { Injectable } from '@nestjs/common';
import { CreateUserReqDto } from './dto/req/create-user-req.dto';
import { UpdateUserReqDto } from './dto/req/update-user-req.dto';
import { BaseUserResDto } from './dto/res/base-user-res.dto';
import { v4 as uuidv4 } from 'uuid';
import { PublicUserResDto } from './dto/res/public-user-res,dto';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserReqDto): Promise<BaseUserResDto> {
    return {
      id: uuidv4(),
      email: createUserDto.email,
      name: createUserDto.name,
      password: createUserDto.password,
      avatar: createUserDto.avatar,
    };
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number): Promise<PublicUserResDto> {
    return {
      id: `${id}`,
      name: 'Naame',
      avatar: 'avatar.png',
    };
  }

  async update(id: number, updateUserDto: UpdateUserReqDto) {
    console.log(updateUserDto);
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
