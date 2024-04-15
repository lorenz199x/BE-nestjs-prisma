import { IsString, IsOptional } from 'class-validator';

export class SearchProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  category?: string;
}