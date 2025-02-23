import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { FortyTwoAuthGuard } from "src/auth/guards/forty-two-auth.guard";
import { Roles } from "./decorators/role.decorator";
import { RoleGuard } from "./guards/role.guard";
import { RoleService } from "./role.service";

@Controller()
@UseGuards(FortyTwoAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get("role/:id")
  @Roles("admin")
  @UseGuards(RoleGuard)
  async getAccountRoles(@Param("id") accountId: string) {
    return await this.roleService.getAccountRoles(Number(accountId));
  }

  @Patch("role/:id")
  @Roles("admin")
  @UseGuards(RoleGuard)
  async addToAccount(@Param("id") accountId: string, @Body("role") roleName: string) {
    return await this.roleService.addToAccount(Number(accountId), roleName);
  }

  @Delete("role/:id")
  @Roles("admin")
  @UseGuards(RoleGuard)
  async removeFromAccount(@Param("id") accountId: string, @Body("role") roleName: string) {
    return await this.roleService.removeFromAccount(Number(accountId), roleName);
  }
}
