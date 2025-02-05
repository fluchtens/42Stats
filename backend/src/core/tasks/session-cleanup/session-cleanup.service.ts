import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class SessionCleanupService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(SessionCleanupService.name);
  private redisClient: RedisClientType;

  async onModuleInit() {
    this.redisClient = createClient({
      socket: { host: 'redis', port: 6379 },
    });
    await this.redisClient.connect();
  }

  async onModuleDestroy() {
    await this.redisClient.quit();
  }

  @Cron('0 0 0 1 * *')
  async cleanupSessions() {
    try {
      const keys = await this.redisClient.keys('sess:*');
      if (keys.length > 0) {
        await this.redisClient.del(keys);
        this.logger.log(`${keys.length} sessions deleted.`);
      } else {
        this.logger.log('No sessions to delete.');
      }
    } catch (error) {
      this.logger.error('Error while deleting sessions:', error);
    }
  }
}
