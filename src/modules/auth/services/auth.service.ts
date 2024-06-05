import { Injectable, Post, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserService } from '../../user/services/user.service';
import { SignInReqDto } from '../dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../dto/req/sign-up.req.dto';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { ITokenPair } from '../interfaces/token.interface';
import { AuthMapper } from './auth.mapper';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

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
    const tokenPair = await this.generateAndSaveTokenPair(
      user.id,
      dto.deviceId,
    );
    return AuthMapper.toResponseDTO(user, tokenPair);
  }
  public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: { password: true, id: true },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    await Promise.all([
      await this.refreshTokenRepository.delete({
        deviceId: dto.deviceId,
        user_id: user.id,
      }),
      await this.authCacheService.deleteAccessToken(user.id, dto.deviceId),
    ]);
    const tokenPair = await this.generateAndSaveTokenPair(
      user.id,
      dto.deviceId,
    );
    const userForResponse = await this.userRepository.findOneBy({
      id: user.id,
    });
    return AuthMapper.toResponseDTO(userForResponse, tokenPair);
  }
  private async generateAndSaveTokenPair(
    userId: string,
    deviceId: string,
  ): Promise<ITokenPair> {
    const tokenPair = await this.tokenService.generateAuthTokens({
      userId,
      deviceId,
    });
    await Promise.all([
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          refreshToken: tokenPair.refreshToken,
          user_id: userId,
          deviceId,
        }),
      ),
      this.authCacheService.saveToken(tokenPair.accessToken, userId, deviceId),
    ]);
    return tokenPair;
  }
}
