import { UserEntity } from '../../../database/entities/user.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { ITokenPair } from '../interfaces/token.interface';
import { IUserData } from '../interfaces/user-data.interface';
import { TokenPairResDto } from "../dto/res/token-pair.res.dto";

export class AuthMapper {
  public static toResponseDTO(
    user: UserEntity,
    tokenPair: ITokenPair,
  ): AuthResDto {
    return {
      tokens: this.toResponseTokenDTO(tokenPair),
      user: UserMapper.toResponseDTO(user),
    };
  }
  public static toUserDataDTO(user: UserEntity, deviceId: string): IUserData {
    return {
      userId: user.id,
      email: user.email,
      deviceId,
    };
  }
  public static toResponseTokenDTO(tokens: ITokenPair): TokenPairResDto {
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }

}
