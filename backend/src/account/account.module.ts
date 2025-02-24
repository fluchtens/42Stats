import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "src/core/database/database.module";
import { RoleModule } from "src/role/role.module";
import { AccountController } from "./account.controller";
import { AccountRepository } from "./account.repository";
import { AccountService } from "./account.service";

@Module({
  imports: [DatabaseModule, forwardRef(() => RoleModule)],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
  exports: [AccountService, AccountRepository]
})
export class AccountModule {}
