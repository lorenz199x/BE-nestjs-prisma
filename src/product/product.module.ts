import { Module } from '@nestjs/common';
import { ProductController } from './product.contoller';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ProductService, PrismaService],
  controllers: [ProductController],
  exports: [ProductService], // Export ProductService if needed in other modules
})
export class ProductModule {}
