import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import * as fs from 'fs';
import { Connection, createConnection } from 'mysql2/promise';
import * as path from 'path';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;
  private readonly logger = new Logger(DatabaseService.name);

  constructor() {}

  async onModuleInit() {
    try {
      // console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);
      this.connection = await createConnection(process.env.DATABASE_URL);
      this.logger.log('Connected to MySQL');
      await this.runMigrations();
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

  private async runMigrations() {
    try {
      const migrationPath = path.resolve('./src/core/database/migrations');
      const files = fs
        .readdirSync(migrationPath)
        .filter((file) => file.endsWith('.sql'));

      for (const file of files) {
        const filePath = path.join(migrationPath, file);
        const sql = fs.readFileSync(filePath, 'utf-8');
        this.logger.log(`Running migration: ${file}`);
        await this.query(sql);
      }

      this.logger.log('All migrations executed successfully.');
    } catch (error) {
      this.logger.error('Migration failed', error.message);
      throw new Error(`Migration execution failed: ${error.message}`);
    }
  }
}
