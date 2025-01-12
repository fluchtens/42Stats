import {
  Controller,
  Delete,
  Get,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { FortyTwoAuthGuard } from 'src/auth/guards/FortyTwoAuthGuard';
import { AccountService } from './account.service';

@Controller('account')
@UseGuards(FortyTwoAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('session')
  async getAccountSession(@Session() session: Record<string, any>) {
    return await this.accountService.getAccountSession(session);
  }

  @Delete()
  async deleteAccount(@Session() session: Record<string, any>) {
    return await this.accountService.deleteAccount(session);
  }

  @Get('count')
  async getAccountCount() {
    return await this.accountService.getAccountCount();
  }

  @Get('monthly/active/count')
  async getMonthlyActiveAccountCount() {
    return this.accountService.getMonthlyActiveAccountCount();
  }

  @Get('monthly/registrations')
  async getMonthlyRegistrations() {
    return this.accountService.getMonthlyRegistrations();
  }

  @Get('monthly/registrations/cumulative')
  async getMonthlyCumulativeRegistrations() {
    return this.accountService.getMonthlyCumulativeRegistrations();
  }

  @Get('campus/counts')
  async getCampusAccountCounts(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 5,
  ) {
    return await this.accountService.getCampusAccountCounts(page, pageSize);
  }
}
