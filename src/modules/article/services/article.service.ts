import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { In } from 'typeorm';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { TagEntity } from '../../../database/entities/tag.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ArticleRepository } from '../../repository/services/article.repository';
import { LikeRepository } from '../../repository/services/like.repository';
import { TagRepository } from '../../repository/services/tag.repository';
import { CreateArticleReqDto } from '../dto/req/create-article.req.dto';
import { ListArticleReqDto } from '../dto/req/list-article.req.dto';
import { UpdateArticleReqDto } from '../dto/req/update-article.req.dto';
import { ArticleResDto } from '../dto/res/article.res.dto';
import { ArticleListResDto } from '../dto/res/article-list-res.dto';
import { ArticleMapper } from './article.mapper';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly tagRepository: TagRepository,
    private readonly likeRepository: LikeRepository,
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
  public async getById(
    articleId: string,
    userData: IUserData,
  ): Promise<ArticleResDto> {
    const article = await this.articleRepository.findArticleById(
      articleId,
      userData,
    );
    if (!article) {
      throw new NotFoundException('Articles was not found');
    }
    return ArticleMapper.toResponseDTO(article);
  }
  public async updateById(
    articleId: string,
    userData: IUserData,
    dto: UpdateArticleReqDto,
  ): Promise<ArticleResDto> {
    const article = await this.findMyArticleOrThrow(userData.userId, articleId);

    let tags: TagEntity[] = [];

    if (dto.tags) {
      tags = await this.createTags(dto.tags);
    }
    await this.articleRepository.save({
      ...article,
      ...dto,
      tags: tags.length > 0 ? tags : article.tags,
    });
    const updatedArticle = await this.articleRepository.findArticleById(
      articleId,
      userData,
    );

    return ArticleMapper.toResponseDTO(updatedArticle);
  }
  public async deleteById(
    articleId: string,
    userData: IUserData,
  ): Promise<void> {
    const article = await this.findMyArticleOrThrow(userData.userId, articleId);
    await this.articleRepository.remove(article);
  }

  public async getList(
    userData: IUserData,
    query: ListArticleReqDto,
  ): Promise<ArticleListResDto> {
    const [entities, total] = await this.articleRepository.getList(
      userData,
      query,
    );
    return ArticleMapper.toListResponseDTO(entities, total, query);
  }

  public async like(userData: IUserData, articleId: string): Promise<void> {
    await this.findArticleByIdOrThrow(articleId);
    const like = await this.likeRepository.findOneBy({
      article_id: articleId,
      user_id: userData.userId,
    });
    if (like) {
      throw new ConflictException('Already liked');
    }
    await this.likeRepository.save(
      this.likeRepository.create({
        article_id: articleId,
        user_id: userData.userId,
      }),
    );
  }

  public async unlike(userData: IUserData, articleId: string): Promise<void> {
    await this.findArticleByIdOrThrow(articleId);
    const like = await this.likeRepository.findOneBy({
      article_id: articleId,
      user_id: userData.userId,
    });
    if (!like) {
      throw new ConflictException('Not liked yet');
    }
    await this.likeRepository.remove(like);
  }
  private async findArticleByIdOrThrow(
    articleId: string,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOneBy({ id: articleId });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }
  private async findMyArticleOrThrow(
    userId: string,
    articleId: string,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOneBy({
      id: articleId,
    });
    if (!article) {
      throw new NotFoundException('Article was not found');
    }
    if (article.user_id !== userId) {
      throw new ForbiddenException();
    }
    return article;
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
