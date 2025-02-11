import { Module } from '@nestjs/common';
import { AccountModule } from 'src/account/account.module';
import { DatabaseModule } from 'src/core/database/database.module';
import { RoleModule } from 'src/role/role.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FortyTwoStrategy } from './strategies/FortyTwoStrategy';

@Module({
  imports: [DatabaseModule, AccountModule, RoleModule],
  controllers: [AuthController],
  providers: [AuthService, FortyTwoStrategy],
})
export class AuthModule {}
