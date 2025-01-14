import { Injectable, Logger } from '@nestjs/common';
import { PoolDate } from 'src/campus/types/pool-date.type';
import { DatabaseService } from 'src/core/database/database.service';
import { User } from './types/user.type';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(private readonly databaseService: DatabaseService) {}

  public async getUsers(): Promise<User[]> {
    const query = `
      SELECT
        *
      FROM
        user
    `;

    try {
      return await this.databaseService.query(query);
    } catch (error) {
      this.logger.error(`Failed to get users: ${error.message}`);
    }
  }

  public async getUserCount(): Promise<number> {
    const query = `
      SELECT
        COUNT(*) as count
      FROM
        user
      `;

    try {
      const rows = await this.databaseService.query(query);
      return rows[0].count;
    } catch (error) {
      this.logger.error(`Failed to get user count: ${error.message}`);
    }
  }

  public async getUserAverageLevel(): Promise<number> {
    const query = `
      SELECT
        AVG(level) as level
      FROM
        user
      `;

    try {
      const rows = await this.databaseService.query(query);
      return rows[0].level;
    } catch (error) {
      this.logger.error(`Failed to get user average level: ${error.message}`);
    }
  }

  public async getCampusUsers(
    campusId: number,
    poolMonth: string,
    poolYear: string,
    page: number,
    pageSize: number,
  ): Promise<User[]> {
    let query = `
      SELECT
        *
      FROM
        user
      WHERE
        campus_id = ?
    `;
    const params: (string | number)[] = [campusId];

    if (poolMonth && poolYear) {
      query += `
        AND pool_month = ? AND pool_year = ?
      `;
      params.push(poolMonth, poolYear);
    }

    query += `
      ORDER BY
        level DESC
      LIMIT
        ?
      OFFSET
        ?
    `;
    const offset = (page - 1) * pageSize;
    params.push(`${pageSize}`, `${offset}`);

    try {
      return await this.databaseService.query(query, params);
    } catch (error) {
      this.logger.error(`Failed to get campus users: ${error.message}`);
    }
  }

  public async getCampusUsersCount(
    campusId: number,
    poolMonth: string,
    poolYear: string,
  ): Promise<number> {
    let query = `
      SELECT
        COUNT(*) as count
      FROM
        user
      WHERE
        campus_id = ?
    `;
    const params: (string | number)[] = [campusId];

    if (poolMonth && poolYear) {
      query += `
        AND pool_month = ? AND pool_year = ?
      `;
      params.push(poolMonth, poolYear);
    }

    try {
      const rows = await this.databaseService.query(query, params);
      return rows[0].count;
    } catch (error) {
      this.logger.error(`Failed to get campus users: ${error.message}`);
    }
  }

  public async getUserCampusPoolDate(campusId: number): Promise<PoolDate[]> {
    const query = `
          SELECT
            pool_month as month,
            pool_year as year
          FROM
            user
          WHERE
            campus_id = ?
        `;
    const params = [campusId];

    try {
      return await this.databaseService.query(query, params);
    } catch (error) {
      this.logger.error(
        `Failed to get pool date for campus with id ${campusId}: ${error.message}`,
      );
    }
  }

  public async deleteAllUsers(): Promise<void> {
    const query = `
          DELETE FROM user;
        `;
    try {
      await this.databaseService.query(query);
    } catch (error) {
      this.logger.error(`Failed to clean user table: ${error.message}`);
    }
  }
}
