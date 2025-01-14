import { Module } from '@nestjs/common';
import { CampusModule } from 'src/campus/campus.module';
import { UserModule } from 'src/user/user.module';
import { FetcherService } from './fetcher.service';

@Module({
  imports: [UserModule, CampusModule],
  providers: [FetcherService],
  exports: [FetcherService],
})
export class FetcherModule {}
