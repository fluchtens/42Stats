import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CampusModule } from './campus/campus.module';
import { DatabaseModule } from './core/database/database.module';
import { FetcherModule } from './core/tasks/fetcher/fetcher.module';
import { SessionCleanupModule } from './core/tasks/session-cleanup/session-cleanup.module';
import { CredentialModule } from './credential/credential.module';
import { ProjectModule } from './project/project.module';
import { RoleModule } from './role/role.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DatabaseModule,
    FetcherModule,
    SessionCleanupModule,
    AuthModule,
    AccountModule,
    CampusModule,
    UserModule,
    ProjectModule,
    SessionModule,
    RoleModule,
    CredentialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
