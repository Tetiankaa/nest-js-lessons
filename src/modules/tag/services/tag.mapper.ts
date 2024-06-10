import { TagEntity } from '../../../database/entities/tag.entity';
import { TagResDto } from '../dto/res/tag.res.dto';

export class TagMapper {
  public static toResponseDTO(entity: TagEntity): TagResDto {
    return {
      name: entity.name,
    };
  }
  public static toListResponseDTO(entities: TagEntity[]): TagResDto[] {
    return entities.map((entity) => this.toResponseDTO(entity));
  }
}
