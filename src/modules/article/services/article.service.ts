import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { TagEntity } from '../../../database/entities/tag.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ArticleRepository } from '../../repository/services/article.repository';
import { TagRepository } from '../../repository/services/tag.repository';
import { CreateArticleReqDto } from '../dto/req/create-article.req.dto';
import { ArticleResDto } from '../dto/res/article.res.dto';
import { ArticleMapper } from './article.mapper';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly tagRepository: TagRepository,
  ) {}
  public async create(
    dto: CreateArticleReqDto,
    userData: IUserData,
  ): Promise<ArticleResDto> {
    const tags = await this.createTags(dto.tags);

    const article = await this.articleRepository.save(
      this.articleRepository.create({
        ...dto,
        user_id: userData.userId,
        tags: tags,
      }),
    );
    return ArticleMapper.toResponseDTO({ ...article, tags });
  }
  private async createTags(tags: string[]): Promise<TagEntity[]> {
    if (!tags || tags.length === 0) return [];

    const foundedTagEntities = await this.tagRepository.findBy({
      name: In(tags),
    });
    const existingTags = new Set(
      foundedTagEntities.map((entity) => entity.name),
    );
    const newTags = tags.filter((tag) => !existingTags.has(tag));

    const newEntities = await this.tagRepository.save(
      newTags.map((tag) => this.tagRepository.create({ name: tag })),
    );
    return [...foundedTagEntities, ...newEntities];
  }
}
