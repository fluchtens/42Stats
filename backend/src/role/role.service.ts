import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AccountRepository } from 'src/account/account.repository';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  private readonly logger = new Logger(RoleService.name);

  async addToAccount(accountId: number, roleName: string) {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new NotFoundException(`Account not found`);
    }

    const role = await this.roleRepository.findByName(roleName);
    if (!role) {
      throw new NotFoundException(`Role not found`);
    }

    const accountRoles =
      await this.roleRepository.findRolesByAccountId(accountId);
    if (accountRoles.some((r) => r.name === roleName)) {
      throw new BadRequestException(
        `Role '${roleName}' is already assigned to the account`,
      );
    }

    await this.roleRepository.addToAccount(accountId, roleName);
    return { message: 'Role added successfully' };
  }

  async removeFromAccount(accountId: number, roleName: string) {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new NotFoundException(`Account not found`);
    }

    const role = await this.roleRepository.findByName(roleName);
    if (!role) {
      throw new NotFoundException(`Role not found`);
    }

    const accountRoles =
      await this.roleRepository.findRolesByAccountId(accountId);
    if (!accountRoles.some((r) => r.name === roleName)) {
      throw new BadRequestException(
        `Role '${roleName}' is not assigned to the account`,
      );
    }

    await this.roleRepository.removeFromAccount(accountId, roleName);
    return { message: 'Role removed successfully' };
  }
}
