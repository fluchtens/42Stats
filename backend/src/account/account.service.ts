import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { Account } from './types/account.type';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async getAccountById(id: number): Promise<Account> {
    const query = `
      SELECT * FROM account WHERE id = ?
    `;

    const params = [id];

    try {
      const rows = await this.databaseService.query(query, params);
      return rows[0];
    } catch (error) {
      this.logger.error(`Failed to get account with id ${id}`, error.message);
      throw new Error('Failed to get account');
    }
  }

  async createAccount(account: Account): Promise<void> {
    const query = `
      INSERT INTO account (id, login, email, image, level, campus_id)
      VALUES (?, ?, ?, ?, ?, ?)
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
      throw new Error('Failed to insert account');
    }
  }

  async getAccountSession(session: Record<string, any>) {
    return await this.getAccountById(session.user.id);
  }
}
