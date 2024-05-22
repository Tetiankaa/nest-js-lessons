import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { TransformHelper } from "../../../common/helpers/transform.helper";

class CarReqDto {
  @IsString()
  @Length(2, 30)
  producer: string;
  @IsString()
  @Length(2, 30)
  model: string;
}

export class CreateUserReqDto {
  @IsString({ message: 'Name must be a string' })
  @Length(2, 30, {
    message:
      'Name must be minimum 2 characters long and maximum 30 characters long',
  })
  @IsOptional()
  @Transform(TransformHelper.trim)
  public readonly name?: string;
  @IsString()
  @IsEmail()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  public readonly email: string;
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must have minimum 8 characters, at least one lowercase  letter, one uppercase letter and at least one digit',
  })
  public readonly password: string;

  @IsString()
  @MaxLength(255)
  @ValidateIf((object) => object.age >= 25)
  public readonly avatar?: string;
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(18)
  @Max(150)
  @Type(() => Number)
  public readonly age: number;
  @IsObject()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CarReqDto)
  car?: CarReqDto;
}
