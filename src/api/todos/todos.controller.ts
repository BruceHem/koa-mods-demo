import { Auth, AuthUser, Controller, Delete, Get, Post, Put } from 'koa-mods';

import User from '../../models/user.model';

@Controller('todos')
export class TodosController {
  @Post()
  @Auth()
  async createTodo(@AuthUser() authUser: User) {
    return 'Create Todo';
  }

  @Get()
  async listTodos() {
    return 'List Todos';
  }

  @Get('/:id')
  async showTodo() {
    return 'Show Todo';
  }

  @Put('/:id')
  async updateTodo() {
    return 'Update Todo';
  }

  @Delete('/:id')
  async deleteTodo() {
    return 'Delete Todo';
  }
}
