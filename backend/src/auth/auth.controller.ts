import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './guards/FortyTwoAuthGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('42')
  @UseGuards(AuthGuard('42'))
  async loginWith42(@Req() req: Request, @Res() res: Response) {
    return this.authService.fortyTwoAuth(req, res);
  }

  @Post('logout')
  @UseGuards(FortyTwoAuthGuard)
  async logout(@Req() req: Request) {
    return this.authService.logout(req);
  }
}
