import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { Campus } from './types/campus.type';

@Injectable()
export class CampusRepository {
  private readonly logger = new Logger(CampusRepository.name);

  constructor(private readonly databaseService: DatabaseService) {}

  public async getCampuses(): Promise<Campus[]> {
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

  public async getCampusCount(): Promise<number> {
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

  public async getCampusById(id: number): Promise<Campus> {
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
}
