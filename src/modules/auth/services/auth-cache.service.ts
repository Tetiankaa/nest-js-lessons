import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Configs, JWTConfig } from '../../../configs/configs.type';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class AuthCacheService {
  private jwtConfig: JWTConfig;
  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService<Configs>,
  ) {
    this.jwtConfig = configService.get<JWTConfig>('jwt');
  }

  public async saveToken(
    token: string,
    userId: string,
    deviceId: string,
  ): Promise<void> {
    const key = this.getKey(userId, deviceId);
    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, token);
    await this.redisService.expire(key, this.jwtConfig.access_expires_in);
  }
  public async isAccessTokenExist(
    token: string,
    userId: string,
    deviceId: string,
  ): Promise<boolean> {
    const key = this.getKey(userId, deviceId);
    const setOfValues = await this.redisService.sMembers(key);
    return setOfValues.includes(token);
  }
  public async deleteAccessToken(
    userId: string,
    deviceId: string,
  ): Promise<void> {
    const key = this.getKey(userId, deviceId);
    await this.redisService.deleteByKey(key);
  }

  private getKey(userId: string, deviceId: string): string {
    return `ACCESS_TOKEN:${userId}:${deviceId}`;
  }
}
