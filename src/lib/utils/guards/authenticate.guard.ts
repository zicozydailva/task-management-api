import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

import { ErrorHelper } from 'src/core/helpers';
import { IUser, RequestHeadersEnum } from 'src/core/interfaces';
import { UserSessionService } from 'src/global/user-session/service';
import { TokenHelper } from '../token/token.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(AuthGuard.name);

  constructor(
    private tokenHelper: TokenHelper,
    private userSession: UserSessionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authorization =
      req.headers[RequestHeadersEnum.Authorization] ||
      String(req.cookies?.accessToken);

    if (!authorization) {
      ErrorHelper.ForbiddenException('Authorization header is required');
    }

    const user = await this.verifyAccessToken(authorization);

    req.user = user;

    return true;
  }

  async verifyAccessToken(authorization: string): Promise<IUser> {
    const [bearer, accessToken] = authorization.split(' ');

    if (bearer == 'Bearer' && accessToken !== '') {
      const user = this.tokenHelper.verify<IUser & { sessionId: string }>(
        accessToken,
      );

      const session = await this.userSession.get(user._id);

      if (!session) {
        this.logger.error(`verifyAccessToken: Session not found ${user._id}`);
        ErrorHelper.UnauthorizedException('Unauthorized!');
      }

      if (session.sessionId !== user.sessionId) {
        this.logger.error(
          `verifyAccessToken: SessionId not match ${session.sessionId} - ${user.sessionId}`,
        );
        ErrorHelper.UnauthorizedException('Unauthorized');
      }

      return user;
    } else {
      this.logger.error(`verifyAccessToken: Invalid token ${accessToken}`);
      ErrorHelper.UnauthorizedException('Unauthorized');
    }
  }
}
