import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchTerm, setCurrentPage, deleteProduct, addProduct, updateProduct } from '../redux/productSlice';
import Modal from './Modal';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, searchTerm, currentPage, itemsPerPage } = useSelector(state => state.products);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'vanphongpham'
  });
  const [editingProduct, setEditingProduct] = useState({
    id: null,
    name: '',
    price: '',
    category: 'vanphongpham'
  });

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Tính tổng giá của tất cả sản phẩm
  const totalPrice = filteredItems.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      dispatch(addProduct({
        id: Date.now(),
        name: newProduct.name,
        price: Number(newProduct.price),
        category: newProduct.category
      }));
      setNewProduct({ name: '', price: '', category: 'vanphongpham' });
      setIsAddModalOpen(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category || 'vanphongpham'
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editingProduct.name && editingProduct.price) {
      dispatch(updateProduct({
        id: editingProduct.id,
        name: editingProduct.name,
        price: Number(editingProduct.price),
        category: editingProduct.category
      }));
      setIsEditModalOpen(false);
    }
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

      {/* Modal Thêm Hàng Hóa */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Thêm Hàng Hóa"
      >
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Tên hàng hóa:</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              placeholder="Nhập tên hàng hóa"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Giá hàng hóa:</label>
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              placeholder="Nhập giá hàng hóa"
              required
            />
          </div>

          <div className="form-group">
            <label>Loại hàng hóa:</label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
            >
              <option value="vanphongpham">Văn phòng phẩm</option>
              <option value="thucpham">Thực phẩm</option>
              <option value="khac">Khác</option>
            </select>
          </div>

          <div className="modal-buttons">
            <button type="submit" className="submit-button">Thêm</button>
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="cancel-button">
              Hủy
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Chỉnh Sửa Hàng Hóa */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        title="Chỉnh Sửa Hàng Hóa"
      >
        <form onSubmit={handleEditSubmit} className="modal-form">
          <div className="form-group">
            <label>Tên hàng hóa:</label>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
              placeholder="Nhập tên hàng hóa"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Giá hàng hóa:</label>
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
              placeholder="Nhập giá hàng hóa"
              required
            />
          </div>

          <div className="form-group">
            <label>Loại hàng hóa:</label>
            <select
              value={editingProduct.category}
              onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
            >
              <option value="vanphongpham">Văn phòng phẩm</option>
              <option value="thucpham">Thực phẩm</option>
              <option value="khac">Khác</option>
            </select>
          </div>

          <div className="modal-buttons">
            <button type="submit" className="submit-button">Lưu</button>
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="cancel-button">
              Hủy
            </button>
          </div>
        </form>
      </Modal>

      <div className="search-box">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>
      
      <table className="product-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <button 
                  className="edit-button"
                  onClick={() => handleEdit(item)}
                >
                  Chỉnh sửa
                </button>
                <button 
                  className="delete-button"
                  onClick={() => dispatch(deleteProduct(item.id))}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          <tr className="total-row">
            <td>Tổng số</td>
            <td>{totalPrice}</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="page-button"
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        <span>Trang {currentPage}/{totalPages}</span>
        <button
          className="page-button"
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default ProductList;
