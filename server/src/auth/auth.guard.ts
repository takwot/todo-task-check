import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { sessionOptions, UserSession } from 'src/config/session';
import { getIronSession } from 'iron-session';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req: any = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    const session = await getIronSession<UserSession>(req, res, sessionOptions);

    if (!session) {
      throw new UnauthorizedException('Auth error');
    }

    req.user = session.user;

    return true;
  }
}
