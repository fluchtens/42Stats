import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FortyTwoAuthGuard } from 'src/auth/guards/forty-two-auth.guard';
import { CampusService } from './campus.service';

@Controller()
@UseGuards(FortyTwoAuthGuard)
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @Get('campus/all')
  public async getCampuses() {
    return this.campusService.getCampuses();
  }

  @Get('campus/count')
  public async getCampusCount() {
    return this.campusService.getCampusCount();
  }

  @Get('campus/:id')
  public async getCampusById(@Param('id') id: number) {
    return this.campusService.getCampusById(id);
  }

  @Get('campus/:id/pools')
  public async getCampusPools(@Param('id') id: number) {
    return this.campusService.getCampusPools(id);
  }
}
