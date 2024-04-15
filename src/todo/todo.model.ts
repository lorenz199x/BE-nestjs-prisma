import { Prisma } from '@prisma/client';

export class Todo implements Prisma.TodoCreateInput {
  id?: number;
  title: string;
  description?: string | null;
  date?: string | null
  isCompleted: boolean;
  isImportant: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  userId: number;
}

export class User implements Prisma.UserCreateInput {
  id?: number;
  username: string;
  password: string;
}