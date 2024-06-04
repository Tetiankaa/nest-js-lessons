import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Configs, JWTConfig } from '../../../configs/configs.type';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { ITokenPair } from '../interfaces/token.interface';

@Injectable()
export class TokenService {
  private readonly jwtConfig: JWTConfig;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Configs>,
  ) {
    this.jwtConfig = configService.get<JWTConfig>('jwt');
  }

  public async generateAuthTokens(payload: IJwtPayload): Promise<ITokenPair> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.access_secret,
      expiresIn: this.jwtConfig.access_expires_in,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refresh_secret,
      expiresIn: this.jwtConfig.refresh_expires_in,
    });

    return { accessToken, refreshToken };
  }
}
