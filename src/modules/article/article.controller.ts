import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateArticleReqDto } from './dto/req/create-article.req.dto';
import { ListArticleReqDto } from './dto/req/list-article.req.dto';
import { UpdateArticleReqDto } from './dto/req/update-article.req.dto';
import { ArticleResDto } from './dto/res/article.res.dto';
import { ArticleListResDto } from './dto/res/article-list-res.dto';
import { ArticleService } from './services/article.service';

@Controller('articles')
@ApiTags('Articles')
@ApiBearerAuth()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  public async getList(
    @CurrentUser() userData: IUserData,
    @Query() query: ListArticleReqDto,
  ): Promise<ArticleListResDto> {
    return await this.articleService.getList(userData, query);
  }

  @Post()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  public async create(
    @Body() dto: CreateArticleReqDto,
    @CurrentUser() userData: IUserData,
  ): Promise<ArticleResDto> {
    return await this.articleService.create(dto, userData);
  }

  @Get(':id')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  public async getById(
    @Param('id') id: string,
    @CurrentUser() userData: IUserData,
  ): Promise<ArticleResDto> {
    return await this.articleService.getById(id, userData);
  }

  @Patch(':id')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  public async updateById(
    @Param('id') id: string,
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateArticleReqDto,
  ): Promise<ArticleResDto> {
    return await this.articleService.updateById(id, userData, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  public async deleteById(
    @Param('id') id: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    return await this.articleService.deleteById(id, userData);
  }
}
