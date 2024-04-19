import { Prisma } from '@prisma/client';

//product model
export class Product implements Prisma.ProductUncheckedCreateInput {
  id?: number;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
}
