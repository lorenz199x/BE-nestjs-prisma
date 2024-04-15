import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { Request, Response } from 'express';

@Controller('api/v1/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodo(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const result = await this.todoService.getAllTodo();
    return response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetch data!',
      data: result,
    });
  }

  @Post()
  async postTodo(
    @Body() postData: Todo,
    @Res() response: Response,
    ): Promise<Response> {
    // return this.todoService.createTodo(postData);
    try {
      const createdTodo = await this.todoService.createTodo(postData);
      return response.status(200).json({
        status: 'success',
        message: 'Todo created successfully',
        result: createdTodo,
      });
    } catch (error) {
      return response.status(200).json({
        status: 'error',
        message: 'Failed to create todo',
      });
    }
  }

  @Get(':id')
  async getTodo(@Param('id') id: number): Promise<Todo | null> {
    return this.todoService.getTodo(id);
  }

  @Delete(':id')
  async deleteTodo(
    @Param('id') id: number,
    @Res() response: Response,
    ): Promise<Response> {
    // return this.todoService.deleteTodo(id);
    try {
      const deleteTodo = await this.todoService.deleteTodo(id);
      return response.status(200).json({
        status: 'success',
        message: 'Todo deleted successfully',
        data: deleteTodo,
      });
    } catch (error) {
      return response.status(200).json({
        status: 'error',
        message: 'Failed to delete todo',
      });
    }
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: number, 
    @Body() data: Todo,
    @Res() response: Response,
    ): Promise<Response> {
    // return this.todoService.updateTodo(id, data);
    try {
      const updateTodo = await this.todoService.updateTodo(id, data);
      return response.status(200).json({
        status: 'success',
        message: 'Todo updated successfully',
        data: updateTodo,
      });
    } catch (error) {
      return response.status(200).json({
        status: 'error',
        message: 'Failed to update todo',
      });
    }
  }
}
