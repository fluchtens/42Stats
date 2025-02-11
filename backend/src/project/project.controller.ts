import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FortyTwoAuthGuard } from 'src/auth/guards/forty-two-auth.guard';
import { ProjectService } from './project.service';

@Controller()
@UseGuards(FortyTwoAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('project/all')
  public async getProjects() {
    return this.projectService.getProjects();
  }

  @Get('project/:id')
  public async getProjectById(@Param('id') id: number) {
    return this.projectService.getProjectById(id);
  }
}
