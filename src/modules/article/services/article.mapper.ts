import { ArticleEntity } from '../../../database/entities/article.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { ListArticleReqDto } from '../dto/req/list-article.req.dto';
import { ArticleResDto } from '../dto/res/article.res.dto';
import { ArticleListResDto } from '../dto/res/article-list-res.dto';

export class ArticleMapper {
  public static toResponseDTO(article: ArticleEntity): ArticleResDto {
    return {
      id: article.id,
      body: article.body,
      title: article.title,
      description: article.description,
      updatedAt: article.updatedAt,
      createdAt: article.createdAt,
      tags: article.tags ? article.tags.map((tag) => tag.name) : [],
      user: article.user ? UserMapper.toResponseDTO(article.user) : null,
      isLiked: article.likes?.length > 0,
    };
  }

  public static toListResponseDTO(
    entities: ArticleEntity[],
    total: number,
    query: ListArticleReqDto,
  ): ArticleListResDto {
    return {
      data: entities.map(this.toResponseDTO),
      meta: {
        total,
        skip: query.skip,
        limit: query.limit,
      },
    };
  }
}
