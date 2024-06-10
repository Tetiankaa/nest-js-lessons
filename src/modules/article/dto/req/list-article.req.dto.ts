import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, MAX, Max, Min } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class ListArticleReqDto {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 10;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  @IsOptional()
  skip?: number = 0;

  @IsString()
  @IsOptional()
  @Transform(TransformHelper.toLowerCase)
  @Transform(TransformHelper.trim)
  search?: string;

  @IsString()
  @IsOptional()
  tag?: string;
}
