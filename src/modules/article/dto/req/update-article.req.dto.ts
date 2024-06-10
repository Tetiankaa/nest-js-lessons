import { PartialType, PickType } from '@nestjs/swagger';

import { BaseArticleReqDto } from './base-article.req.dto';

export class UpdateArticleReqDto extends PartialType(
  PickType(BaseArticleReqDto, ['title', 'body', 'description', 'tags']),
) {}
