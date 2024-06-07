import { PickType } from '@nestjs/swagger';

import { BaseArticleReqDto } from './base-article.req.dto';

export class CreateArticleReqDto extends PickType(BaseArticleReqDto, [
  'tags',
  'title',
  'body',
  'description',
]) {}
