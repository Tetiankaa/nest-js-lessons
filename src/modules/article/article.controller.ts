import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateArticleReqDto } from './dto/req/create-article.req.dto';
import { ArticleResDto } from './dto/res/article.res.dto';
import { ArticleService } from './services/article.service';

@Controller('articles')
@ApiTags('Articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  public async create(
    @Body() dto: CreateArticleReqDto,
    @CurrentUser() userData: IUserData,
  ): Promise<ArticleResDto> {
    return await this.articleService.create(dto, userData);
  }
}
