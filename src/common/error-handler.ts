import { Context } from 'koa';

export function errorHandler() {
  return async (ctx: Context, next: () => Promise<any>) => {
    await next().catch(error => {
      console.error(error);

      if (error.name === 'KoaModsValidationError') {
        ctx.status = 422;
        ctx.body = error;
      } else {
        ctx.status = 500;
        ctx.body = { message: 'Internal Server Error' };
      }
    });
  };
}
