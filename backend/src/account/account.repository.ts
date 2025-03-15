import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/core/database/database.service";
import { Account } from "./types/account.type";

@Injectable()
export class AccountRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findAll(): Promise<Account[]> {
    const query = "SELECT * FROM account";
    return await this.databaseService.query(query);
  }

  public async findById(id: number): Promise<Account | null> {
    const query = `
      SELECT *
      FROM account
      WHERE id = ?
    `;
    const params = [id];
    const rows = await this.databaseService.query(query, params);
    if (rows.length === 0) {
      return null;
    } else {
      return {
        ...rows[0],
        is_admin: Boolean(rows[0].is_admin)
      };
    }
  }

  public async save(account: Account): Promise<void> {
    const query = `
      INSERT INTO account (id, login, email, image, level, campus_id, is_admin)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [account.id, account.login, account.email, account.image, account.level, account.campus_id, account.is_admin];
    await this.databaseService.query(query, params);
  }

  public async update(account: Account): Promise<void> {
    const query = `
      UPDATE account
      SET id = ?, login = ?, email = ?, image = ?, level = ?, campus_id = ?, updated_at = NOW()
      WHERE id = ?
    `;
    const params = [account.id, account.login, account.email, account.image, account.level, account.campus_id, account.id];
    await this.databaseService.query(query, params);
  }

  public async delete(id: number): Promise<void> {
    const query = `
      DELETE FROM account
      WHERE id = ?
    `;
    const params = [id];
    await this.databaseService.query(query, params);
  }

  public async count(): Promise<number> {
    const query = `
      SELECT COUNT(*) as count
      FROM account
    `;
    const rows = await this.databaseService.query(query);
    return rows[0].count;
  }

  public async countActive(startOfMonth: Date, endOfMonth: Date): Promise<number> {
    const query = `
      SELECT COUNT(*) as count
      FROM account
      WHERE updated_at BETWEEN ? AND ?
    `;
    const params = [startOfMonth, endOfMonth];
    const rows = await this.databaseService.query(query, params);
    return rows[0].count;
  }

  public async findMonthlyRegistrations(startDate: Date): Promise<{ year: number; month: number; count: number }[]> {
    const query = `
      SELECT YEAR(created_at) AS year, MONTH(created_at) AS month, COUNT(*) AS count
      FROM account
      WHERE created_at >= ?
      GROUP BY YEAR(created_at), MONTH(created_at)
      ORDER BY YEAR(created_at), MONTH(created_at)
    `;
    const params = [startDate];
    const rows = await this.databaseService.query(query, params);
    return rows.map((row) => ({
      year: row.year,
      month: row.month,
      count: row.count
    }));
  }

  public async countBeforeCreatedDate(date: Date): Promise<number> {
    const query = `
      SELECT COUNT(*) AS count
      FROM account
      WHERE created_at < ?
    `;
    const params = [date];
    const rows = await this.databaseService.query(query, params);
    return rows[0].count;
  }

  public async countAllCampuses(page: number, pageSize: number): Promise<{ campus: string; count: number }[]> {
    const query = `
      SELECT campus.name as campus, COUNT(account.id) as count
      FROM account
      JOIN campus ON account.campus_id = campus.id
      GROUP BY campus.name
      ORDER BY count DESC
      LIMIT ?
      OFFSET ?
    `;
    const offset = (page - 1) * pageSize;
    const params = [`${pageSize}`, `${offset}`];
    return await this.databaseService.query(query, params);
  }
}
