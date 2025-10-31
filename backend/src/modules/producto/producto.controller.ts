import { Body, Controller, Post } from '@nestjs/common';

import { CreateProductoDto } from './dto/create-producto.dto';
import { ProductoService } from './producto.service';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }

  // TODO: Implement additional controller methods for Producto (e.g., findAll, findOne, update, delete)
}
