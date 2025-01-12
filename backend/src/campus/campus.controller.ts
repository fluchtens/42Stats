import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FortyTwoAuthGuard } from 'src/auth/guards/FortyTwoAuthGuard';
import { CampusService } from './campus.service';

@Controller('campus')
@UseGuards(FortyTwoAuthGuard)
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @Get('all')
  public async getCampuses() {
    return this.campusService.getCampuses();
  }

  @Get('count')
  public async getCampusCount() {
    return this.campusService.getCampusCount();
  }

  @Get(':id')
  public async getCampusById(@Param('id') id: number) {
    return this.campusService.getCampusById(id);
  }

  @Get(':id/pools')
  public async getCampusPools(@Param('id') id: number) {
    return this.campusService.getCampusPools(id);
  }
}
