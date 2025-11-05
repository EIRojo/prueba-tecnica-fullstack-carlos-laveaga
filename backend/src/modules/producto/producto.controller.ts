import { Body, Controller, Delete, Post, Get, Query, Param, Patch, ParseIntPipe } from '@nestjs/common';

import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { FindAllProductoDto } from './dto/find-all-producto.dto';
import { FindOneProductoDto } from './dto/find-one-producto.dto';
import { DeleteProductoDto } from './dto/delete-producto.dto';
import { ProductoService } from './producto.service';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }

  // TODO: Implement additional controller methods for Producto (e.g., findAll, findOne, update, delete)
  @Get()
  findAll(@Query() findAllProductoDto: FindAllProductoDto) {
    return this.productoService.findAll(findAllProductoDto.search);
  }

  @Get(':id')
  findOne(@Param() findOneProductoDto: FindOneProductoDto) {
    return this.productoService.findOne(findOneProductoDto.id);
  }

  @Patch(':id')
  update(@Param() findOneProductoDto: FindOneProductoDto, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productoService.update(findOneProductoDto.id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param() deleteProductoDto: DeleteProductoDto) {
    return this.productoService.remove(deleteProductoDto.id);
  }
}
