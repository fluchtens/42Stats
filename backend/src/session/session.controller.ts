import {
  Controller,
  Delete,
  Get,
  Param,
  Session,
  UseGuards,
} from '@nestjs/common';
import { FortyTwoAuthGuard } from 'src/auth/guards/FortyTwoAuthGuard';
import { SessionService } from './session.service';

@Controller()
@UseGuards(FortyTwoAuthGuard)
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('session/all')
  public async getSessions(@Session() session: Record<string, any>) {
    return this.sessionService.getUserSessions(session.user.id, session.id);
  }

  @Delete('session/:id')
  public async getCampusUsers(@Param('id') id: string) {
    return this.sessionService.deleteSession(id);
  }
}
