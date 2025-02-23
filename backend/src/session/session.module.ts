import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/core/database/database.module";
import { SessionController } from "./session.controller";
import { SessionRepository } from "./session.repository";
import { SessionService } from "./session.service";

@Module({
  imports: [DatabaseModule],
  controllers: [SessionController],
  providers: [SessionService, SessionRepository],
  exports: [SessionService, SessionRepository]
})
export class SessionModule {}
