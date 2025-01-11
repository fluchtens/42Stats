import { Controller, Get, Session, UseGuards } from '@nestjs/common';
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
}
