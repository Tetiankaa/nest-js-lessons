import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserReqDto } from './dto/req/create-user-req.dto';
import { UpdateUserReqDto } from './dto/req/update-user-req.dto';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrivateUserResDto } from './dto/res/private-user-res.dto';
import { PublicUserResDto } from './dto/res/public-user-res,dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiForbiddenResponse({ description: 'Request forbidden' })
  @ApiBadRequestResponse({ description: ' Bad request' })
  @Post()
  async create(
    @Body() createUserDto: CreateUserReqDto,
  ): Promise<PrivateUserResDto> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PublicUserResDto> {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserReqDto,
  ) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
