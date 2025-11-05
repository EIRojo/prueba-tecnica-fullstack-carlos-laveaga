import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductoDto {
  nombre: string;
  descripcion: string;
  precio: number;
}

export interface UpdateProductoDto extends Partial<CreateProductoDto> {}

// API functions
export const productApi = {
  getAll: (search?: string) => api.get<Product[]>(`/productos${search ? `?search=${search}` : ''}`),
  getById: (id: number) => api.get<Product>(`/productos/${id}`),
  create: (data: CreateProductoDto) => api.post<Product>('/productos', data),
  update: (id: number, data: UpdateProductoDto) => api.patch<Product>(`/productos/${id}`, data),
  delete: (id: number) => api.delete(`/productos/${id}`),
};