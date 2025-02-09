import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
