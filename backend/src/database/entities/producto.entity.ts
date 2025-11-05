import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('producto')
export class ProductoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 100,
  })
  nombre: string;

  @Column('varchar', {
    length: 255,
  })
  descripcion: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  precio: number;
}
