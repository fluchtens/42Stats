import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  private readonly logger = new Logger(DatabaseService.name);

  constructor() {}

  async onModuleInit() {
    try {
      this.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
      const client = await this.pool.connect();
      this.logger.log('Connected to PostgreSQL');
      client.release();
      await this.runMigrations();
    } catch (error) {
      this.logger.error('Failed to connect to PostgreSQL', error.message);
      throw new Error('PostgreSQL connection failed');
    }
  }

  async onModuleDestroy() {
    try {
      if (this.pool) {
        await this.pool.end();
        this.logger.log('Disconnected from PostgreSQL');
      }
    } catch (error) {
      this.logger.error('Failed to disconnect from PostgreSQL', error.message);
    }
  }

  async query(sql: string, params: any[] = []): Promise<any> {
    try {
      const result = await this.pool.query(sql, params);
      return result;
    } catch (error) {
      this.logger.error(`Query failed: ${sql}`, error.message);
      throw new Error(`Query failed: ${error.message}`);
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
