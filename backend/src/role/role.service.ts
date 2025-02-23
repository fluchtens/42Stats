import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { AccountRepository } from "src/account/account.repository";
import { SessionService } from "src/session/session.service";
import { RoleRepository } from "./role.repository";
import { Role } from "./types/role.type";

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly accountRepository: AccountRepository,
    private readonly sessionService: SessionService
  ) {}

  private readonly logger = new Logger(RoleService.name);

  async getAccountRoles(accountId: number) {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new NotFoundException(`Account not found`);
    }
    return await this.roleRepository.findByAccountId(accountId);
  }

  private async updateSessions(accountId: number) {
    const newRoles: Role[] = await this.roleRepository.findByAccountId(accountId);
    await this.sessionService.updateUserRolesSessions(accountId, newRoles);
  }

  async addToAccount(accountId: number, roleName: string) {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new NotFoundException(`Account not found`);
    }
    const role = await this.roleRepository.findByName(roleName);
    if (!role) {
      throw new NotFoundException(`Role not found`);
    }
    const accountRoles: Role[] = await this.roleRepository.findByAccountId(accountId);
    if (accountRoles.some((r) => r.name === roleName)) {
      throw new BadRequestException(`Role '${roleName}' is already assigned to the account`);
    }
    await this.roleRepository.addToAccount(accountId, roleName);
    await this.updateSessions(accountId);
    return { message: "Role added successfully" };
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
    const accountRoles = await this.roleRepository.findByAccountId(accountId);
    if (!accountRoles.some((r) => r.name === roleName)) {
      throw new BadRequestException(`Role '${roleName}' is not assigned to the account`);
    }
    await this.roleRepository.removeFromAccount(accountId, roleName);
    await this.updateSessions(accountId);
    return { message: "Role removed successfully" };
  }
}
