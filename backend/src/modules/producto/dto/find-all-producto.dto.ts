// TODO: Implement find all producto DTO for retrieving a list of products
import { IsOptional, IsString } from 'class-validator';

export class FindAllProductoDto {
  @IsOptional()
  @IsString()
  search?: string;
}