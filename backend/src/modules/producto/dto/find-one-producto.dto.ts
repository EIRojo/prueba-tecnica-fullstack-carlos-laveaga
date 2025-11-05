// TODO: Implement find one producto DTO for retrieving a single product by ID
import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class FindOneProductoDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  id: number;
}