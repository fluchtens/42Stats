import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CampusModule } from './campus/campus.module';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule, AccountModule, CampusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
