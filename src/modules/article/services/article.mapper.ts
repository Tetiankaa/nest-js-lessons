import { ArticleEntity } from '../../../database/entities/article.entity';
import { ArticleResDto } from '../dto/res/article.res.dto';

export class ArticleMapper {
  public static toResponseDTO(article: ArticleEntity): ArticleResDto {
    return {
      id: article.id,
      body: article.body,
      title: article.title,
      description: article.description,
      updatedAt: article.updatedAt,
      createdAt: article.createdAt,
      tags: article.tags.map((tag) => tag.name),
    };
  }
}
