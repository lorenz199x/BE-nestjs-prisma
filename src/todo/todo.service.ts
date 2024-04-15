import { PrismaService } from 'src/prisma.service';
import { Todo } from './todo.model';
import { Injectable } from "@nestjs/common";

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getAllTodo(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }
  
  async getTodo(id: number): Promise<Todo | null> {
    return this.prisma.todo.findUnique({ where: { id: Number(id) } });
  }

  async createTodo(data: Todo): Promise<Todo> {
    return this.prisma.todo.create({
      data,
    });
  }

  async updateTodo(id: number, data: Todo): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id: Number(id) },
      data: { 
        title: data.title, 
        description: data.description,
        date: data.date,
        isCompleted: data.isCompleted,
        isImportant: data.isImportant,
        userId: data.userId,
      },
    });
  }

  async deleteTodo(id: number): Promise<Todo> {
    return this.prisma.todo.delete({
      where: { id: Number(id) },
    });
  }
}
