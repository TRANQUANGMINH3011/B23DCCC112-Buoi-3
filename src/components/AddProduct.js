import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../redux/productSlice';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && price) {
      dispatch(addProduct({ id: Date.now(), name, price: Number(price) }));
      navigate('/');
    }
  };

  return (
    <div className="container">
      <h1>Thêm Hàng Hóa</h1>
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
          <button type="submit">Thêm hàng hóa</button>
          <button onClick={() => navigate('/')}>Quay lại</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
