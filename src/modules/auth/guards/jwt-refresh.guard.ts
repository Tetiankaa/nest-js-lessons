import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { TokenTypeEnum } from '../enums/token-type.enum';
import { AuthMapper } from '../services/auth.mapper';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const refreshToken = req.get('Authorization')?.split('Bearer ')[1];
    console.log(refreshToken);
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const payload = await this.tokenService.verifyToken(
      refreshToken,
      TokenTypeEnum.REFRESH,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }
    const isTokenExist =
      await this.refreshTokenRepository.isTokenExist(refreshToken);

    if (!isTokenExist) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({ id: payload.userId });

    if (!user) {
      throw new UnauthorizedException();
    }

    req.user = AuthMapper.toUserDataDTO(user, payload.deviceId);

    return true;
  }
}
