import { Module } from '@nestjs/common';
import { AccountModule } from 'src/account/account.module';
import { DatabaseModule } from 'src/core/database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FortyTwoStrategy } from './strategies/FortyTwoStrategy';

@Module({
  imports: [DatabaseModule, AccountModule],
  controllers: [AuthController],
  providers: [AuthService, FortyTwoStrategy],
})
export class AuthModule {}
