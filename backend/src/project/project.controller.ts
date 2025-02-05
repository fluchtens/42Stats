import { Controller, UseGuards } from '@nestjs/common';
import { FortyTwoAuthGuard } from 'src/auth/guards/FortyTwoAuthGuard';
import { ProjectService } from './project.service';

@Controller()
@UseGuards(FortyTwoAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
}
