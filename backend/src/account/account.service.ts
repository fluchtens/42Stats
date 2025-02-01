import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  private readonly logger = new Logger(AccountService.name);

  public async getAccountSession(session: Record<string, any>) {
    return await this.accountRepository.findById(session.user.id);
  }

  public async deleteAccount(session: Record<string, any>) {
    await this.accountRepository.delete(session.user.id);

    await new Promise<void>((resolve, reject) => {
      session.destroy((err) => {
        if (err) {
          reject(new BadRequestException('Unable to log out'));
        } else {
          resolve();
        }
      });
    });

    return { message: 'Account deleted and logged out successfully' };
  }

  public async getAccountCount() {
    return await this.accountRepository.count();
  }

  public async getMonthlyActiveAccountCount() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59);
    return await this.accountRepository.countActive(startOfMonth, endOfMonth);
  }

  private getMonthlyStartDate(): Date {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);
    return startDate;
  }

  public async getMonthlyRegistrations() {
    const startDate = this.getMonthlyStartDate();
    const results =
      await this.accountRepository.findMonthlyRegistrations(startDate);

    return results.map(({ year, month, count }) => {
      const monthName = new Date(year, month - 1).toLocaleString('en-US', {
        month: 'short',
      });
      return { year, month: monthName, count };
    });
  }

  public async getMonthlyCumulativeRegistrations() {
    const startDate = this.getMonthlyStartDate();
    const monthlyRegistrations =
      await this.accountRepository.findMonthlyRegistrations(startDate);
    let cumulativeCount =
      await this.accountRepository.countBeforeCreatedDate(startDate);

    return monthlyRegistrations.map(({ year, month, count }) => {
      cumulativeCount += count;
      const monthName = new Date(year, month - 1).toLocaleString('en-US', {
        month: 'short',
      });
      return { year, month: monthName, count: cumulativeCount };
    });
  }

  public async getCampusAccountCounts(page: number, pageSize: number) {
    return await this.accountRepository.countAllCampuses(page, pageSize);
  }
}
