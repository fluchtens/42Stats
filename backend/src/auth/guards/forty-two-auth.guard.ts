import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class FortyTwoAuthGuard {
  canActivate(context: any) {
    const request = context.switchToHttp().getRequest();
    console.log("request.session", request.session);
    if (!request.session.user) {
      throw new UnauthorizedException({
        message: "You must be authenticated to access this resource."
      });
    }
    return true;
  }
}
