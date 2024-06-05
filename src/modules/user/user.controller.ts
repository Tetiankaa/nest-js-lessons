import {
  Body,
  Controller, Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards
} from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiTags } from "@nestjs/swagger";

import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { UpdateUserReqDto } from './dto/req/update-user-req.dto';
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { IUserData } from "../auth/interfaces/user-data.interface";
import { SkipAuth } from "../auth/decorators/skip-auth.decorator";


// @UseGuards(JwtAccessGuard)
@ApiTags('users')
@Controller('users')
export class UserController {
  // constructor(private readonly userService: UserService) {}
  //
  //
  // @Get()
  // async findAll() {
  //   return await this.userService.findAll();
  // }

  @Get(':id')
  @SkipAuth()
  @ApiBadRequestResponse({ description: ' Bad request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return `get by id`;
  }

  @Patch(':id')
  @ApiBearerAuth()
  async update(
    @CurrentUser() user: IUserData,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserReqDto,
  ) {
    return updateUserDto;
  }
  //
  // @Delete(':id')
  // async remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return await this.userService.remove(+id);
  // }
}
