// TODO: Create UpdateProductoDto class for updating product details
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsPositive, MaxLength, IsOptional } from 'class-validator';

export class UpdateProductoDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  descripcion?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  precio?: number;

}