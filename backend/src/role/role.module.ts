import { Module } from "@nestjs/common";
import { AccountModule } from "src/account/account.module";
import { DatabaseModule } from "src/core/database/database.module";
import { SessionModule } from "src/session/session.module";
import { RoleGuard } from "./guards/role.guard";
import { RoleController } from "./role.controller";
import { RoleRepository } from "./role.repository";
import { RoleService } from "./role.service";

@Module({
  imports: [DatabaseModule, AccountModule, SessionModule],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, RoleGuard],
  exports: [RoleService, RoleRepository, RoleGuard]
})
export class RoleModule {}
