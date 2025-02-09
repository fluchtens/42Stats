import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { UserModule } from 'src/user/user.module';
import { CampusController } from './campus.controller';
import { CampusRepository } from './campus.repository';
import { CampusService } from './campus.service';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [CampusController],
  providers: [CampusService, CampusRepository],
  exports: [CampusService, CampusRepository],
})
export class CampusModule {}
