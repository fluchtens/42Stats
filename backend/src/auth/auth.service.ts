import { BadRequestException, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { AccountRepository } from 'src/account/account.repository';
import { Account } from 'src/account/types/account.type';
import { RoleRepository } from 'src/role/role.repository';
import { UAParser } from 'ua-parser-js';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async validateUser(profile: any): Promise<Account> {
    const { id, login, email, image, cursus_users, campus_users } =
      profile._json;

    const commonCoreCursus = cursus_users.find(
      (cursus) => cursus.cursus_id === 21,
    );

    const primaryCampus = campus_users.find(
      (campus) => campus.is_primary === true,
    );

    const account: Account = {
      id,
      login,
      email,
      image: image?.link,
      level: commonCoreCursus?.level ?? 0,
      campus_id: primaryCampus?.campus_id ?? null,
    };

    const existingAccount = await this.accountRepository.findById(id);
    if (!existingAccount) {
      await this.accountRepository.save(account);
    } else {
      await this.accountRepository.update(account);
    }
    return account;
  }

  async fortyTwoAuth(req: Request, res: Response) {
    const user = req.user as Account;
    if (user && user.id) {
      req.session.user = {
        id: user.id,
        roles: await this.roleRepository.findRolesByAccountId(user.id),
      };
      const ua = new UAParser(req.headers['user-agent'] || '').getResult();
      req.session.deviceInfo = {
        ip:
          req.headers['x-forwarded-for'] ||
          req.socket.remoteAddress ||
          'Unknown',
        browser: ua.browser.name || 'Unknown',
        os: ua.os.name || 'Unknown',
        device: ua.device.model || ua.device.type || 'Unknown',
      };
    }
    return res.redirect(process.env.CLIENT_URL);
  }

  async logout(req: Request) {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(new BadRequestException('Unable to log out'));
        } else {
          resolve();
        }
      });
    });
    return { message: 'Logged out successfully' };
  }
}
