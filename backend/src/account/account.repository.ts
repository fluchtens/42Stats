import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { Account } from './types/account.type';

@Injectable()
export class AccountRepository {
  private readonly logger = new Logger(AccountRepository.name);

  constructor(private readonly databaseService: DatabaseService) {}

  public async getAccountById(id: number): Promise<Account> {
    const query = `
        SELECT
          *
        FROM
          account
        WHERE
          id = ?
      `;

    const params = [id];

    try {
      const rows = await this.databaseService.query(query, params);
      return rows[0];
    } catch (error) {
      this.logger.error(`Failed to get account with id ${id}`, error.message);
    }
  }

  public async createAccount(account: Account): Promise<void> {
    const query = `
      INSERT INTO
        account (id, login, email, image, level, campus_id)
      VALUES
        (?, ?, ?, ?, ?, ?)
    `;

    const params = [
      account.id,
      account.login,
      account.email,
      account.image,
      account.level,
      account.campus_id,
    ];

    try {
      await this.databaseService.query(query, params);
      this.logger.log(`Account ${account.login} inserted`);
    } catch (error) {
      this.logger.error(
        `Failed to insert account ${account.login}`,
        error.message,
      );
    }
  }

  public async deleteAccount(id: number): Promise<void> {
    const query = `
      DELETE FROM
        account
      WHERE
        id = ?
    `;
    const params = [id];

    try {
      await this.databaseService.query(query, params);
      this.logger.log(`Account with id ${id} deleted`);
    } catch (error) {
      this.logger.error(
        `Failed to delete account with id ${id}`,
        error.message,
      );
    }
  }

  public async getAccountCount(): Promise<number> {
    const query = `
      SELECT
        COUNT(*) as count
      FROM
        account
    `;

    try {
      const rows = await this.databaseService.query(query);
      return rows[0].count;
    } catch (error) {
      this.logger.error(`Failed to get account count`, error.message);
    }
  }

  public async getActiveAccountCount(
    startOfMonth: Date,
    endOfMonth: Date,
  ): Promise<number> {
    const query = `
      SELECT
        COUNT(*) as count
      FROM
        account
      WHERE
        updated_at BETWEEN ? AND ?
    `;
    const params = [startOfMonth, endOfMonth];

    try {
      const rows = await this.databaseService.query(query, params);
      return rows[0].count;
    } catch (error) {
      this.logger.error(`Failed to get active account count`, error.message);
    }
  }

  public async findMonthlyRegistrations(
    startDate: Date,
  ): Promise<{ year: number; month: number; count: number }[]> {
    const query = `
      SELECT 
        YEAR(created_at) AS year, 
        MONTH(created_at) AS month, 
        COUNT(*) AS count
      FROM
        account
      WHERE
        created_at >= ?
      GROUP BY
        YEAR(created_at),
        MONTH(created_at)
      ORDER BY
        YEAR(created_at),
        MONTH(created_at)
    `;
    const params = [startDate];

    try {
      const rows = await this.databaseService.query(query, params);
      return rows.map((row) => ({
        year: row.year,
        month: row.month,
        count: row.count,
      }));
    } catch (error) {
      this.logger.error(`Failed to fetch monthly registrations`, error.message);
    }
  }

  public async countAccountBeforeDate(date: Date): Promise<number> {
    const query = `
      SELECT
        COUNT(*) AS count
      FROM
        account
      WHERE
        created_at < ?
    `;
    const params = [date];

    try {
      const rows = await this.databaseService.query(query, params);
      return rows[0].count;
    } catch (error) {
      this.logger.error('Failed to count users before date');
    }
  }

  public async getCampusAccountCounts(
    page: number,
    pageSize: number,
  ): Promise<{ campus: string; count: number }[]> {
    const query = `
      SELECT
        campus.name as campus,
        COUNT(account.id) as count
      FROM
        account
      JOIN
        campus ON account.campus_id = campus.id
      GROUP BY
        campus.name
      ORDER BY
        count DESC
      LIMIT
        ?
      OFFSET
        ?
    `;
    const offset = (page - 1) * pageSize;
    const params = [`${pageSize}`, `${offset}`];

    try {
      return await this.databaseService.query(query, params);
    } catch (error) {
      this.logger.error('Failed to get campus account counts');
    }
  }
}
