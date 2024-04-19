import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Request, Response } from 'express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Res() response: Response): Promise<void> {
    const result = await this.productService.create(createProductDto);
    response.status(201).json({
      status: 'Ok!',
      message: 'Successfully created product!',
      data: result,
    });
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto, @Res() response: Response): Promise<void> {
    const result = await this.productService.findAll(paginationDto);
    response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetched all products!',
      data: result,
    });
  }

  
  @Get('search')
  async search(@Query() searchProductDto: SearchProductDto, @Query() paginationDto: PaginationDto, @Res() response: Response): Promise<void> {
    const result = await this.productService.search(searchProductDto, paginationDto);
    response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetched search results!',
      data: result,
    });
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response): Promise<void> {
    const result = await this.productService.findOne(+id);
    if (!result) {
      response.status(404).json({
        status: 'Error',
        message: 'Product not found!',
      });
      return;
    }
    response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetched product!',
      data: result,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Res() response: Response): Promise<void> {
    const result = await this.productService.update(+id, updateProductDto);
    response.status(200).json({
      status: 'Ok!',
      message: 'Successfully updated product!',
      data: result,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response): Promise<void> {
    const result = await this.productService.remove(+id);
    response.status(200).json({
      status: 'Ok!',
      message: 'Successfully deleted product!',
      data: result,
    });
  }

}
