import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from 'src/core/interfaces';

export const User = createParamDecorator<any, any, IUser>(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  },
);
