import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { Project } from './types/project.type';

@Injectable()
export class ProjectRepository {
  private readonly logger = new Logger(ProjectRepository.name);

  constructor(private readonly databaseService: DatabaseService) {}

  public async findAll(): Promise<Project[]> {
    const query = `
      SELECT
        *
      FROM
        project
    `;

    try {
      return await this.databaseService.query(query);
    } catch (error) {
      this.logger.error(`Failed to get projects: ${error.message}`);
    }
  }

  public async findById(id: number): Promise<Project> {
    const query = `
      SELECT
        *
      FROM
        project
      WHERE
        id = ?
    `;
    const params = [id];

    try {
      const rows = await this.databaseService.query(query, params);
      return rows[0];
    } catch (error) {
      this.logger.error(
        `Failed to get project with id ${id}: ${error.message}`,
      );
    }
  }

  public async findByName(name: string): Promise<Project> {
    const query = `
      SELECT
        *
      FROM
        project
      WHERE
        name = ?
    `;
    const params = [name];

    try {
      const rows = await this.databaseService.query(query, params);
      return rows[0];
    } catch (error) {
      this.logger.error(
        `Failed to get project with name ${name}: ${error.message}`,
      );
    }
  }

  public async findBySlug(slug: string): Promise<Project> {
    const query = `
      SELECT
        *
      FROM
        project
      WHERE
        slug = ?
    `;
    const params = [slug];

    try {
      const rows = await this.databaseService.query(query, params);
      return rows[0];
    } catch (error) {
      this.logger.error(
        `Failed to get project with slug ${slug}: ${error.message}`,
      );
    }
  }

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
