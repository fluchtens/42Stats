import { Module } from '@nestjs/common';
import { SessionCleanupService } from './session-cleanup.service';

@Module({
  providers: [SessionCleanupService],
  exports: [SessionCleanupService],
})
export class SessionCleanupModule {}
