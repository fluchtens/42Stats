import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Connection, createConnection } from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;
  private readonly logger = new Logger(DatabaseService.name);

  constructor() {}

  async onModuleInit() {
    try {
      this.connection = await createConnection(process.env.MYSQL_DB_URL);
      this.logger.log('Connected to MySQL');
    } catch (error) {
      this.logger.error('Failed to connect to MySQL', error.message);
      throw new Error('MySQL connection failed');
    }
  }

  async onModuleDestroy() {
    try {
      if (this.connection) {
        await this.connection.end();
        this.logger.log('Disconnected from MySQL');
      }
    } catch (error) {
      this.logger.error('Failed to disconnect from MySQL', error.message);
    }
  }

  async query(sql: string, params: any[] = []): Promise<any> {
    try {
      const [rows] = await this.connection.execute(sql, params);
      return rows;
    } catch (error) {
      this.logger.error(`Query failed: ${sql}`, error.message);
      throw new Error(`MySQL query failed: ${error.message}`);
    }
  }
}
