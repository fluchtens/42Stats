import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './guards/forty-two-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('42/login')
  async redirectTo42(@Res() res: Response) {
    return this.authService.redirectTo42(res);
  }

  @Get('42/callback')
  async loginWith42(
    @Query('code') code: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.authService.loginWith42(code, req, res);
  }

  @Post('logout')
  @UseGuards(FortyTwoAuthGuard)
  async logout(@Req() req: Request) {
    return this.authService.logout(req);
  }
}
