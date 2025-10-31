import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @MaxLength(255)
  descripcion: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  precio: number;
}
