import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { AuthService } from '../auth.service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.FORTY_TWO_UID,
      clientSecret: process.env.FORTY_TWO_SECRET,
      callbackURL: process.env.VITE_API_URL + '/auth/42',
      scope: 'public',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return await this.authService.validateUser(profile);
  }
}
