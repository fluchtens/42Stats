import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { FortyTwoAuthGuard } from 'src/auth/guards/forty-two-auth.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(FortyTwoAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('count')
  public async getUserCount() {
    return this.userService.getUserCount();
  }

  @Get('level/average')
  public async getUserAverageLevel() {
    return this.userService.getUserAverageLevel();
  }

  @Get('campus/:id')
  public async getCampusUsers(
    @Param('id') id: number,
    @Query('poolMonth') poolMonth?: string,
    @Query('poolYear') poolYear?: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 42,
  ) {
    return this.userService.getCampusUsers(
      id,
      poolMonth,
      poolYear,
      page,
      pageSize,
    );
  }

  @Get('campus/:id/count')
  public async getCampusUsersCount(
    @Param('id') id: number,
    @Query('poolMonth') poolMonth?: string,
    @Query('poolYear') poolYear?: string,
  ) {
    return this.userService.getCampusUsersCount(id, poolMonth, poolYear);
  }
}
