import { Controller, Delete, Get, Session, UseGuards } from '@nestjs/common';
import { FortyTwoAuthGuard } from 'src/auth/guards/FortyTwoAuthGuard';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('session')
  @UseGuards(FortyTwoAuthGuard)
  async getAccountSession(@Session() session: Record<string, any>) {
    return await this.accountService.getAccountSession(session);
  }

  @Delete()
  @UseGuards(FortyTwoAuthGuard)
  async deleteAccount(@Session() session: Record<string, any>) {
    return await this.accountService.deleteAccount(session);
  }
}
