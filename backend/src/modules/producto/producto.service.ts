import { Repository, Like } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductoEntity } from '@entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly repository: Repository<ProductoEntity>,
  ) {}

  create(createProductoDto: CreateProductoDto) {
    return this.repository.save(createProductoDto);
  }

  async findAll(search?: string): Promise<ProductoEntity[]> {
    if (search) {
      return this.repository.find({
        where: [
          { nombre: Like(`%${search}%`) },
          { descripcion: Like(`%${search}%`) }
        ]
      });
    }
    return this.repository.find();
  }

  // FIND ONE - Obtener producto por ID
  async findOne(id: number): Promise<ProductoEntity> {
    const producto = await this.repository.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  // UPDATE - Actualizar producto existente
  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<ProductoEntity> {
    const producto = await this.findOne(id);
    const updatedProducto = this.repository.merge(producto, updateProductoDto);
    return this.repository.save(updatedProducto);
  }

  // DELETE - Eliminar producto
  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.repository.remove(producto);
  }
}
