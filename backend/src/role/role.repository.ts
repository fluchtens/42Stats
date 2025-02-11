import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { Role } from './types/role.type';

@Injectable()
export class RoleRepository {
  private readonly logger = new Logger(RoleRepository.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async findByName(roleName: string): Promise<Role> {
    const query = 'SELECT * FROM role WHERE name = ?';
    const params = [roleName];

    try {
      const rows = await this.databaseService.query(query, params);
      return rows[0];
    } catch (error) {
      this.logger.error(`Failed to get role ${roleName}`, error.message);
    }
  }

  public async findRolesByAccountId(accountId: number): Promise<Role[]> {
    const query = `
      SELECT *
      FROM role r
      JOIN account_role ar ON r.id = ar.role_id
      WHERE ar.account_id = ?
    `;
    const params = [accountId];

    try {
      const rows = await this.databaseService.query(query, params);
      return rows;
    } catch (error) {
      this.logger.error(
        `Failed to get roles for account with id ${accountId}`,
        error.message,
      );
    }
  }

  public async addToAccount(
    accountId: number,
    roleName: string,
  ): Promise<void> {
    const query = `
      INSERT INTO account_role (account_id, role_id)
      VALUES (?, (SELECT id FROM role WHERE name = ?))
      ON DUPLICATE KEY UPDATE role_id = VALUES(role_id);
    `;
    const params = [accountId, roleName];

    try {
      await this.databaseService.query(query, params);
      this.logger.log(
        `Role ${roleName} successfully added to account with id ${accountId}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to add role ${roleName} to account with id ${accountId}`,
        error.message,
      );
    }
  }

  public async removeFromAccount(
    accountId: number,
    roleName: string,
  ): Promise<void> {
    const query = `
      DELETE FROM account_role
      WHERE account_id = ? 
      AND role_id = (SELECT id FROM role WHERE name = ?);
    `;
    const params = [accountId, roleName];

    try {
      await this.databaseService.query(query, params);
    } catch (error) {
      this.logger.error(
        `Failed to remove role ${roleName} from account with id ${accountId}`,
        error.message,
      );
    }
  }
}
