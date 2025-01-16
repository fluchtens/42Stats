import { Injectable, Logger } from '@nestjs/common';
import { PoolDate } from 'src/campus/types/pool-date.type';
import { DatabaseService } from 'src/core/database/database.service';
import { User } from './types/user.type';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(private readonly databaseService: DatabaseService) {}

  public async count(): Promise<number> {
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

  public async findAverageLevel(): Promise<number> {
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

  public async findByCampus(
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

  public async countByCampusAndPool(
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

  public async findPoolDateByCampus(campusId: number): Promise<PoolDate[]> {
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

  public async deleteAll(): Promise<void> {
    const query = `
          DELETE FROM user;
        `;
    try {
      await this.databaseService.query(query);
    } catch (error) {
      this.logger.error(`Failed to clean user table: ${error.message}`);
    }
  }

  public async save(user: User): Promise<void> {
    const query = `
        INSERT INTO user (id, email, login, first_name, last_name, image, pool_month, pool_year, level, campus_id, blackholed)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

    const params = [
      user.id,
      user.email,
      user.login,
      user.first_name,
      user.last_name,
      user.image,
      user.pool_month,
      user.pool_year,
      user.level,
      user.campus_id,
      user.blackholed,
    ];

    try {
      await this.databaseService.query(query, params);
      this.logger.log(`User with id ${user.id} saved successfully`);
    } catch (error) {
      this.logger.error(
        `Failed to save user with id ${user.id}: ${error.message}`,
      );
    }
  }

  public async countByCampus(campusId: number): Promise<number> {
    const query = `
      SELECT
        COUNT(*) as count
      FROM
        user
      WHERE campus_id = ?
      `;
    const params = [campusId];

    try {
      const rows = await this.databaseService.query(query, params);
      return rows[0].count;
    } catch (error) {
      this.logger.error(`Failed to get user count: ${error.message}`);
    }
  }

  public async findAverageLevelByCampus(campusId: number): Promise<number> {
    const query = `
      SELECT
        AVG(level) as level
      FROM
        user
      WHERE campus_id = ?
      `;
    const params = [campusId];

    try {
      const rows = await this.databaseService.query(query, params);
      return rows[0].level;
    } catch (error) {
      this.logger.error(`Failed to get user average level: ${error.message}`);
    }
  }
}
