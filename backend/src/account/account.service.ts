import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(private readonly accountRepository: AccountRepository) {}

  async getAccountSession(session: Record<string, any>) {
    return await this.accountRepository.getAccountById(session.user.id);
  }

  async deleteAccount(session: Record<string, any>) {
    await this.accountRepository.deleteAccount(session.user.id);

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
}
