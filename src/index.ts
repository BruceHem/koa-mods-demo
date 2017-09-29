import 'reflect-metadata';

import * as Koa from 'koa';
import { useKoaMods } from 'koa-mods';

import { errorHandler } from './common/error-handler';
import { TodosController } from './todos/todos.controller';

const app = new Koa();

// Error handler
app.use(errorHandler());

useKoaMods({
  app,
  controllers: [ TodosController ],
  authCheckerFn,
  roleCheckerFn
});

app.listen(3030, () => console.log('Server running on port 3030'));

async function authCheckerFn(ctx: Koa.Context): Promise<{ success: boolean; user: any }> {
  const { username, password } = ctx.headers;
  if (username === 'bruce' && password === 'easypass') {
    return { success: true, user: { username, password, role: 'USER' } };
  } else {
    return { success: false, user: undefined };
  }
}

async function roleCheckerFn(ctx: Koa.Context): Promise<{ availableRoles: string[] }> {
  return { availableRoles: [ 'ADMIN', 'USER' ] };
}
