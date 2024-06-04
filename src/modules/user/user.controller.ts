import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  // constructor(private readonly userService: UserService) {}
  //
  // @ApiForbiddenResponse({ description: 'Request forbidden' })
  // @ApiBadRequestResponse({ description: ' Bad request' })
  // @Post()
  // async create(
  //   @Body() createUserDto: BaseUserReqDto,
  // ): Promise<PrivateUserResDto> {
  //   return await this.userService.create(createUserDto);
  // }
  //
  // @Get()
  // async findAll() {
  //   return await this.userService.findAll();
  // }
  //
  // @Get(':id')
  // @ApiBadRequestResponse({ description: ' Bad request' })
  // @ApiNotFoundResponse({ description: 'Not Found' })
  // async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<PublicUserResDto> {
  //   return await this.userService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // async update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updateUserDto: UpdateUserReqDto,
  // ) {
  //   return await this.userService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // async remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return await this.userService.remove(+id);
  // }
}
