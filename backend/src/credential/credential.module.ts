import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/core/database/database.module";
import { CredentialController } from "./credential.controller";
import { CredentialRepository } from "./credential.repository";
import { CredentialService } from "./credential.service";

@Module({
  imports: [DatabaseModule],
  controllers: [CredentialController],
  providers: [CredentialService, CredentialRepository],
  exports: [CredentialService, CredentialRepository]
})
export class CredentialModule {}
