import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class FortyTwoAuthGuard extends PassportAuthGuard('42') {
  canActivate(context: any) {
    const request = context.switchToHttp().getRequest();
    if (!request.session.user) {
      throw new UnauthorizedException({
        message: 'You must be authenticated to access this resource.',
      });
    }
    return true;
  }
}
