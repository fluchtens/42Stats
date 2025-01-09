import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { User } from './types/user.type';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async getUserById(id: number): Promise<User> {
    const query = `
      SELECT * FROM account WHERE id = ?
    `;

    const params = [id];

    try {
      const rows = await this.databaseService.query(query, params);
      return rows[0];
    } catch (error) {
      this.logger.error(`Failed to get user with id ${id}`, error.message);
      throw new Error('Failed to get user');
    }
  }

  async createUser(user: User): Promise<void> {
    const query = `
      INSERT INTO account (id, login, email, image, level, campus_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const params = [
      user.id,
      user.login,
      user.email,
      user.image,
      user.level,
      user.campus_id,
    ];

    try {
      await this.databaseService.query(query, params);
      this.logger.log(`User ${user.login} inserted`);
    } catch (error) {
      this.logger.error(`Failed to insert user ${user.login}`, error.message);
      throw new Error('Failed to insert user');
    }
  }
}
