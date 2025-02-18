import { Module } from '@nestjs/common';
import { AccountModule } from 'src/account/account.module';
import { DatabaseModule } from 'src/core/database/database.module';
import { CredentialModule } from 'src/credential/credential.module';
import { RoleModule } from 'src/role/role.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [DatabaseModule, AccountModule, RoleModule, CredentialModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
