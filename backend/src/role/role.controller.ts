import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { FortyTwoAuthGuard } from 'src/auth/guards/forty-two-auth.guard';
import { Roles } from './decorators/role.decorator';
import { RoleGuard } from './guards/role.guard';
import { RoleService } from './role.service';

@Controller()
@UseGuards(FortyTwoAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Patch('role/:id')
  @Roles('admin')
  @UseGuards(RoleGuard)
  async addToAccount(
    @Param('id') accountId: number,
    @Body('role') roleName: string,
  ) {
    return await this.roleService.addToAccount(accountId, roleName);
  }

  @Delete('role/:id')
  @Roles('admin')
  @UseGuards(RoleGuard)
  async removeFromAccount(
    @Param('id') accountId: number,
    @Body('role') roleName: string,
  ) {
    return await this.roleService.removeFromAccount(accountId, roleName);
  }
}
