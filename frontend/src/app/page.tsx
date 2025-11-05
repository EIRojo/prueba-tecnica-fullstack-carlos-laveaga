'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product, CreateProductoDto, UpdateProductoDto, productApi } from '@/lib/api';
import ProductList from '@/components/ProductList';
import ProductForm from '@/components/ProductForm';

type View = 'list' | 'create' | 'edit';

export default function Home() {
  const [view, setView] = useState<View>('list');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Cargar productos
  const loadProducts = useCallback(async (search?: string) => {
    try {
      setLoading(true);
      const response = await productApi.getAll(search);
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, loadProducts]);

  // Crear producto
  const handleCreate = async (data: CreateProductoDto) => {
    try {
      setFormLoading(true);
      await productApi.create(data);
      setView('list');
      loadProducts(searchTerm);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error al crear el producto');
    } finally {
      setFormLoading(false);
    }
  };

  // Actualizar producto
  const handleUpdate = async (data: UpdateProductoDto) => {
    if (!editingProduct) return;
    
    try {
      setFormLoading(true);
      await productApi.update(editingProduct.id, data);
      setView('list');
      setEditingProduct(null);
      loadProducts(searchTerm);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error al actualizar el producto');
    } finally {
      setFormLoading(false);
    }
  };

  // Eliminar producto
  const handleDelete = async (id: number) => {
    try {
      await productApi.delete(id);
      loadProducts(searchTerm);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar el producto');
    }
  };

  // Editar producto
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setView('edit');
  };

  // Ventana cancelacion
  const handleCancel = () => {
    setView('list');
    setEditingProduct(null);
  };

  // Cargar actualizar o eliminar
  const handleFormSubmit = (data: CreateProductoDto | UpdateProductoDto) => {
    if (editingProduct) {
      handleUpdate(data as UpdateProductoDto);
    } else {
      handleCreate(data as CreateProductoDto);
    }
  };

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {view === 'list' ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Gestión de Productos</h1>
              <button
                onClick={() => setView('create')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Crear Producto
              </button>
            </div>
            
            <ProductList
              products={products}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />
          </>
        ) : (
          <ProductForm
            product={editingProduct || undefined}
            onSubmit={handleFormSubmit}
            loading={formLoading}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}