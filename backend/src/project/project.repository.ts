import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { Project } from './types/project.type';

@Injectable()
export class ProjectRepository {
  private readonly logger = new Logger(ProjectRepository.name);

  constructor(private readonly databaseService: DatabaseService) {}

  public async save(project: Project): Promise<void> {
    const query = `
      INSERT INTO
        project (id, name, slug, difficulty)
      VALUES
        (?, ?, ?, ?)
    `;
    const params = [project.id, project.name, project.slug, project.difficulty];

    try {
      await this.databaseService.query(query, params);
    } catch (error) {
      this.logger.error(
        `Failed to save project ${project.name}: ${error.message}`,
      );
    }
  }

  public async deleteAll(): Promise<void> {
    const query = `
      DELETE FROM project;
    `;

    try {
      await this.databaseService.query(query);
    } catch (error) {
      this.logger.error(`Failed to clean project table: ${error.message}`);
    }
  }
}
