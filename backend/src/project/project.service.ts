import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(private readonly projectRepository: ProjectRepository) {}

  public async getProjects() {
    return await this.projectRepository.findAll();
  }

  public async getProjectById(id: number) {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException(`Campus not found`);
    }
    return project;
  }
}
