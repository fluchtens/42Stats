import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { Campus } from './types/campus.type';

@Injectable()
export class CampusRepository {
  private readonly logger = new Logger(CampusRepository.name);

  constructor(private readonly databaseService: DatabaseService) {}

  public async getAll(): Promise<Campus[]> {
    const query = `
      SELECT
        *
      FROM
        campus
      `;

    try {
      return await this.databaseService.query(query);
    } catch (error) {
      this.logger.error(`Failed to get campuses: ${error.message}`);
    }
  }

  public async count(): Promise<number> {
    const query = `
      SELECT
        COUNT(*) as count
      FROM
        campus
      `;

    try {
      const rows = await this.databaseService.query(query);
      return rows[0].count;
    } catch (error) {
      this.logger.error(`Failed to get campus count: ${error.message}`);
    }
  }

  public async getById(id: number): Promise<Campus> {
    const query = `
        SELECT
          *
        FROM
          campus
        WHERE
          id = ?
      `;
    const params = [id];

    try {
      const rows = await this.databaseService.query(query, params);
      return rows[0];
    } catch (error) {
      this.logger.error(`Failed to get campus with id ${id}: ${error.message}`);
    }
  }

  public async deleteAll(): Promise<void> {
    const query = `
          DELETE FROM campus;
        `;
    try {
      await this.databaseService.query(query);
    } catch (error) {
      this.logger.error(`Failed to clean campus table: ${error.message}`);
    }
  }

  public async save(campus: Campus): Promise<void> {
    const query = `
      INSERT INTO campus (id, name, country, user_count, student_count, average_level)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const params = [
      campus.id,
      campus.name,
      campus.country,
      campus.user_count,
      campus.student_count,
      campus.average_level,
    ];

    try {
      await this.databaseService.query(query, params);
    } catch (error) {
      this.logger.error(
        `Failed to save campus with id ${campus.id}: ${error.message}`,
      );
    }
  }

  public async update(campus: Campus): Promise<void> {
    const query = `
      UPDATE campus
      SET name = ?, country = ?, user_count = ?, student_count = ?, average_level = ?
      WHERE id = ?
    `;

    const params = [
      campus.name,
      campus.country,
      campus.user_count,
      campus.student_count,
      campus.average_level,
      campus.id,
    ];

    try {
      const result = await this.databaseService.query(query, params);
      if (result.affectedRows <= 0) {
        this.logger.warn(`No campus found with id ${campus.id} to update`);
      }
    } catch (error) {
      this.logger.error(
        `Failed to update campus with id ${campus.id}: ${error.message}`,
      );
    }
  }
}
