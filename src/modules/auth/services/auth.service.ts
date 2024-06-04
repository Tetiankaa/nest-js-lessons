import { Injectable, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserService } from '../../user/services/user.service';
import { SignInReqDto } from '../dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../dto/req/sign-up.req.dto';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';
import { AuthMapper } from "./auth.mapper";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly authCacheService: AuthCacheService,
  ) {}
  public async signUp(dto: SignUpReqDto): Promise<AuthResDto> {
    await this.userService.isEmailUniqueOrThrow(dto.email);
    const hashedPassword = await bcrypt.hash(dto.password, 8);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password: hashedPassword }),
    );
    const tokenPair = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });
    await Promise.all([
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          refreshToken: tokenPair.refreshToken,
          user_id: user.id,
          deviceId: dto.deviceId,
        }),
      ),
      this.authCacheService.saveToken(
        tokenPair.accessToken,
        user.id,
        dto.deviceId,
      ),
    ]);
    return AuthMapper.toResponseDTO(user, tokenPair);
  }
  public async signIn(dto: SignInReqDto): Promise<any> {
    return 'sign in';
  }
}
