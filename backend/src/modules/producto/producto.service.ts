import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductoEntity } from '@entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly repository: Repository<ProductoEntity>,
  ) {}

  create(createProductoDto: CreateProductoDto) {
    return this.repository.save(createProductoDto);
  }

  // TODO: Implement additional service methods for Producto (e.g., findAll, findOne, update, delete)
}
