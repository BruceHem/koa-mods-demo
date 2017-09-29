import { verify } from 'jsonwebtoken';
import { Context } from 'koa';

import User from '../models/user.model';
import { UnauthorizedError } from './';

export async function authCheckerFn(ctx: Context): Promise<{ success: boolean; user: any }> {
  const { authorization } = ctx.headers;

  if (!authorization) {
    throw new UnauthorizedError('Authorization header is missing.');
  }

  let tokenInfo: any;

  try {
    tokenInfo = verify(authorization, process.env.SECRET!);
  } catch (error) {
    throw new UnauthorizedError(error.message);
  }

  const user = await User.find({ where: { id: tokenInfo.id, username: tokenInfo.username } });
  if (!user) throw new UnauthorizedError('User was not found.');
  return { success: true, user };
}

export async function roleCheckerFn(ctx: Context): Promise<{ availableRoles: string[] }> {
  return { availableRoles: [ 'ADMIN', 'USER' ] };
}
