import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct } from '../redux/productSlice';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(state => state.products.items.find(item => item.id === parseInt(id)));

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && price) {
      dispatch(updateProduct({ id: parseInt(id), name, price: Number(price) }));
      navigate('/');
    }
  };

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="container">
      <h1>Chỉnh sửa Hàng Hóa</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          type="text"
          placeholder="Tên hàng hóa"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Giá hàng hóa"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="form-buttons">
          <button type="submit">Lưu thay đổi</button>
          <button onClick={() => navigate('/')}>Quay lại</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;

