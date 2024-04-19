import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({ data: createProductDto });
  }

  async findAll(paginationDto: PaginationDto): Promise<Product[]> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    return this.prisma.product.findMany({ skip, take: limit });
  }

  async findOne(id: number): Promise<Product | null> {
    console.log('findOne...');

    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }

  async search(searchProductDto: SearchProductDto, paginationDto: PaginationDto): Promise<Product[]> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    const { name, category } = searchProductDto;
    // Convert search strings to lowercase for case-insensitive search
    const lowercaseName = name ? name.toLowerCase() : '';
    const lowercaseCategory = category ? category.toLowerCase() : '';
    // Construct the search query based on the provided criteria
    return this.prisma.product.findMany({
      where: {
        OR: [
          name && { name: { contains: lowercaseName } }, 
          category && { category: { contains: lowercaseCategory } },
        ].filter(Boolean),
      },
      skip,
      take: limit,
    });
  }
}
