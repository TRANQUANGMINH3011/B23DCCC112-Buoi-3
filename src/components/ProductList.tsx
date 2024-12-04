import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, setCurrentPage, deleteProduct, addProduct, updateProduct } from '../redux/productSlice';
import { RootState } from '../redux/store';
import { Product } from '../types/types';
import Modal from './Modal';
import ProductForm from './ProductForm';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const { items, searchTerm, currentPage, itemsPerPage } = useSelector((state: RootState) => state.products);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Sử dụng useMemo để tối ưu hiệu suất
  const filteredItems = useMemo(() => 
    items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [items, searchTerm]
  );

  const { currentItems, totalPages, totalPrice } = useMemo(() => {
    const total = filteredItems.reduce((sum, item) => sum + item.price, 0);
    const pages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const current = filteredItems.slice(startIndex, endIndex);

    return {
      currentItems: current,
      totalPages: pages,
      totalPrice: total
    };
  }, [filteredItems, currentPage, itemsPerPage]);

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    dispatch(addProduct({
      id: Date.now(),
      ...productData
    }));
    setIsAddModalOpen(false);
  };

  const handleEditProduct = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      dispatch(updateProduct({
        id: editingProduct.id,
        ...productData
      }));
      setIsEditModalOpen(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container">
      <h1>Bảng Thông Tin</h1>
      <button 
        className="add-button" 
        onClick={() => setIsAddModalOpen(true)}
      >
        Thêm Hàng Hóa
      </button>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Thêm Hàng Hóa"
      >
        <ProductForm
          initialValues={{ name: '', price: '', category: 'vanphongpham' }}
          onSubmit={handleAddProduct}
          onCancel={() => setIsAddModalOpen(false)}
          submitLabel="Thêm"
        />
      </Modal>

      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        title="Chỉnh Sửa Hàng Hóa"
      >
        {editingProduct && (
          <ProductForm
            initialValues={{
              name: editingProduct.name,
              price: editingProduct.price,
              category: editingProduct.category
            }}
            onSubmit={handleEditProduct}
            onCancel={() => setIsEditModalOpen(false)}
            submitLabel="Lưu"
          />
        )}
      </Modal>

      {/* Phần còn lại của component giữ nguyên, chỉ thêm type annotation khi cần */}
    </div>
  );
};

export default ProductList; 