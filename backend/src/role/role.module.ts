import { Module } from '@nestjs/common';
import { AccountModule } from 'src/account/account.module';
import { DatabaseModule } from 'src/core/database/database.module';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

@Module({
  imports: [DatabaseModule, AccountModule],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
