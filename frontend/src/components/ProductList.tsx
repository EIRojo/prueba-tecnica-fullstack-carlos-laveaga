'use client';

import { Product } from '@/lib/api';
import { useState } from 'react';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function ProductList({ 
  products, 
  loading, 
  onEdit, 
  onDelete, 
  searchTerm, 
  onSearchChange 
}: ProductListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setDeletingId(id);
      await onDelete(id);
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Barra de busqueda */}
      <div className="bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Buscar productos por nombre o descripción..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Tabla de productos */}
      {products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No se encontraron productos
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.nombre}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.descripcion}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-blue-600 font-bold">
                  ${product.precio}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {deletingId === product.id ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}