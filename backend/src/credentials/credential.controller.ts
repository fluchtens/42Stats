import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FortyTwoAuthGuard } from 'src/auth/guards/forty-two-auth.guard';
import { CredentialService } from './credential.service';
import { CreateCredentialDto } from './dtos/create-credential.dto';
import { UpdateCredentialDto } from './dtos/update-credential.dto';

@Controller()
@UseGuards(FortyTwoAuthGuard)
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Get('credential/:provider')
  @HttpCode(HttpStatus.OK)
  async getCredential(@Param('provider') provider: string) {
    return await this.credentialService.getCredentialByProvider(provider);
  }

  @Post('credential')
  @HttpCode(HttpStatus.CREATED)
  async createCredential(@Body() createCredentialDto: CreateCredentialDto) {
    return await this.credentialService.createCredential(createCredentialDto);
  }

  @Put('credential/:id')
  @HttpCode(HttpStatus.OK)
  async updateCredential(
    @Param('id') id: number,
    @Body() updateCredentialDto: UpdateCredentialDto,
  ) {
    return await this.credentialService.updateCredential(
      id,
      updateCredentialDto,
    );
  }
}
