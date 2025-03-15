import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AdminGuard {
  canActivate(context: any) {
    const request = context.switchToHttp().getRequest();
    if (!request.session.user.is_admin) {
      throw new UnauthorizedException({
        message: "You do not have permission to access this resource."
      });
    }
    return true;
  }
}
