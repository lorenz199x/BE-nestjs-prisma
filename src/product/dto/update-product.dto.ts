import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

//extend from createProductDto 
export class UpdateProductDto extends PartialType(CreateProductDto) {}