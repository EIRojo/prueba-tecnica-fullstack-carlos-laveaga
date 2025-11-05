// TODO: Implement the DeleteProductoDto to define the structure for deleting a product
import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteProductoDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  id: number;
}