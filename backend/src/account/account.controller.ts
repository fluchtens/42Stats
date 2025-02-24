import { Controller, Delete, Get, Query, Session, UseGuards } from "@nestjs/common";
import { FortyTwoAuthGuard } from "src/auth/guards/forty-two-auth.guard";
import { Roles } from "src/role/decorators/role.decorator";
import { RoleGuard } from "src/role/guards/role.guard";
import { AccountService } from "./account.service";

@Controller()
@UseGuards(FortyTwoAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get("account")
  async getAccountSession(@Session() session: Record<string, any>) {
    return await this.accountService.getAccountSession(session);
  }

  @Delete("account")
  async deleteAccount(@Session() session: Record<string, any>) {
    return await this.accountService.deleteAccount(session);
  }

  @Roles("admin")
  @UseGuards(RoleGuard)
  @Get("account/all")
  async getAllAccounts() {
    return await this.accountService.getAllAccounts();
  }

  @Get("account/count")
  async getAccountCount() {
    return await this.accountService.getAccountCount();
  }

  @Get("account/monthly/active/count")
  async getMonthlyActiveAccountCount() {
    return this.accountService.getMonthlyActiveAccountCount();
  }

  @Get("account/monthly/registrations")
  async getMonthlyRegistrations() {
    return this.accountService.getMonthlyRegistrations();
  }

  @Get("account/monthly/registrations/cumulative")
  async getMonthlyCumulativeRegistrations() {
    return this.accountService.getMonthlyCumulativeRegistrations();
  }

  @Get("account/campus/counts")
  async getCampusAccountCounts(@Query("page") page: number = 1, @Query("pageSize") pageSize: number = 5) {
    return await this.accountService.getCampusAccountCounts(page, pageSize);
  }
}
