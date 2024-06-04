import { PickType } from '@nestjs/swagger';

import { BaseAuthReqDto } from './base-auth.req.dto';

export class SignUpReqDto extends PickType(BaseAuthReqDto, [
  'bio',
  'image',
  'name',
  'email',
  'password',
  'deviceId',
]) {}
