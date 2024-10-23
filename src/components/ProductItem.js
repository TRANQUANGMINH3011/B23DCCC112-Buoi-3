import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../redux/productSlice';

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(item.id));
  };

  return (
    <li>
      <span>{item.name}</span>
      <span>{item.price.toLocaleString('vi-VN')} VND</span>
      <div>
        <button onClick={handleDelete} className="delete-button">Xóa</button>
        <Link to={`/edit/${item.id}`}>
          <button>Chỉnh sửa</button>
        </Link>
      </div>
    </li>
  );
};

export default ProductItem;
