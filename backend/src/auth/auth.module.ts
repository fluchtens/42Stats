import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FortyTwoStrategy } from './strategies/FortyTwoStrategy';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, FortyTwoStrategy],
})
export class AuthModule {}
