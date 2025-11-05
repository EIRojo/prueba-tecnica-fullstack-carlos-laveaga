'use client';

import { Product, CreateProductoDto, UpdateProductoDto } from '@/lib/api';
import { useState, useEffect } from 'react';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: CreateProductoDto | UpdateProductoDto) => void;
  loading: boolean;
  onCancel: () => void;
}

export default function ProductForm({ product, onSubmit, loading, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio.toString()
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validacion de todos los campos
    const submitData: CreateProductoDto | UpdateProductoDto = {
      ...formData,
      precio: parseFloat(formData.precio)
    };
    
    onSubmit(submitData);
  };

  const isFormValid = formData.nombre && formData.descripcion && formData.precio;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {product ? 'Editar Producto' : 'Crear Producto'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre *
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción *
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio *
          </label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Guardando...' : (product ? 'Actualizar' : 'Crear')}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}