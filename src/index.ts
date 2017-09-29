import 'reflect-metadata';

import * as Koa from 'koa';
import * as logger from 'koa-logger';
import { useKoaMods } from 'koa-mods';

import { AuthController } from './api/auth/auth.controller';
import { TodosController } from './api/todos/todos.controller';
import { authCheckerFn, errorHandler, roleCheckerFn, sequelize } from './common';

const app = new Koa();

app.use(logger());
app.use(errorHandler());

useKoaMods({
  app,
  controllers: [ AuthController, TodosController ],
  authCheckerFn,
  roleCheckerFn,
  enableCors: true
});

(async () => {
  await sequelize.sync();
  app.listen(6969, () => console.log('Server running on port 6969'));
})().catch(e => {
  console.error(e);
  process.exit(1);
});
