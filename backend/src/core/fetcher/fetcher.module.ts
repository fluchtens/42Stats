import { Module } from '@nestjs/common';
import { CampusModule } from 'src/campus/campus.module';
import { ProjectModule } from 'src/project/project.module';
import { UserModule } from 'src/user/user.module';
import { FetcherService } from './fetcher.service';

@Module({
  imports: [UserModule, CampusModule, ProjectModule],
  providers: [FetcherService],
  exports: [FetcherService],
})
export class FetcherModule {}
