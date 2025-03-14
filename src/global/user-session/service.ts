/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { IUser } from 'src/core/interfaces';

@Injectable()
export class UserSessionService {
  private logger = new Logger(UserSessionService.name);
  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  async create(
    payload: IUser,
    data: {
      sessionId: string;
      rememberMe?: boolean;
    },
  ) {
    const key = `session:${payload._id}`;

    const twoWeeksInSeconds = 1209600;
    await this.redisClient.set(
      key,
      JSON.stringify({
        sessionId: data.sessionId,
        rememberMe: data.rememberMe,
      }),
      'EX',
      twoWeeksInSeconds,
    );

    this.logger.log(`create: Session created for user ${payload._id}`);

    return payload._id;
  }

  async get(id: string | number): Promise<{
    sessionId: string;
    rememberMe: boolean;
  }> {
    const key = `session:${id}`;
    const session = await this.redisClient.get(key);

    if (!session) {
      this.logger.error(`get: Session not found`);
      return null;
    }

    try {
      return JSON.parse(session);
    } catch (error) {
      this.logger.error(`get: ${error.name} - ${error.message}`);
      await this.redisClient.del(key);
      return null;
    }
  }

  async checkSession(id: string | number): Promise<boolean> {
    const key = `session:${id}`;
    const exist = await this.redisClient.get(key);

    if (!exist) {
      return false;
    }

    let parsed = null;
    try {
      parsed = JSON.parse(exist);
    } catch (error) {
      return false;
    }

    if (!parsed.rememberMe) {
      // Delete session if remember me is false
      await this.redisClient.del(key);
      return false;
    }

    return true;
  }

  async delete(id: string): Promise<boolean> {
    const key = `session:${id}`;

    try {
      await this.redisClient.del(key);
    } catch (error) {
      return false;
    }

    return true;
  }
}
