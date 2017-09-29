import { Controller, Delete, Get, Post, Put } from 'koa-mods';

@Controller('todos')
export class TodosController {
  @Post()
  async createTodo() {
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
