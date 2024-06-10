import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { ListArticleReqDto } from '../../article/dto/req/list-article.req.dto';
import { IUserData } from '../../auth/interfaces/user-data.interface';

@Injectable()
export class ArticleRepository extends Repository<ArticleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticleEntity, dataSource.manager);
  }
  public async findArticleById(
    articleId: string,
    userData: IUserData,
  ): Promise<ArticleEntity> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect(
      'user.followings',
      'follow',
      'follow.follower_id = :myId',
      { myId: userData.userId },
    );
    qb.where('article.id = :articleId', { articleId });

    return await qb.getOne();
  }

  public async getList(
    userData: IUserData,
    query: ListArticleReqDto,
  ): Promise<[ArticleEntity[], number]> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect(
      'user.followings',
      'follow',
      'follow.follower_id = :myId',
      { myId: userData.userId },
    );
    if (query.tag) {
      qb.andWhere('tag.name = :tag', { tag: query.tag });
    }
    if (query.search) {
      qb.andWhere(
        'CONCAT(LOWER(article.title), LOWER(article.body), LOWER(article.description)) LIKE :search',
        { search: `%${query.search}%` },
      );
    }
    qb.orderBy('article.createdAt', 'DESC');
    qb.take(query.limit);
    qb.skip(query.skip);

    return await qb.getManyAndCount();
  }
}
