import React from 'react';
import { ProductFormProps } from '../types/types';

const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel
}) => {
  const [values, setValues] = React.useState(initialValues);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: values.name,
      price: Number(values.price),
      category: values.category
    });
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="form-group">
        <label>Tên hàng hóa:</label>
        <input
          type="text"
          value={values.name}
          onChange={(e) => setValues({...values, name: e.target.value})}
          placeholder="Nhập tên hàng hóa"
          required
        />
      </div>
      
      <div className="form-group">
        <label>Giá hàng hóa:</label>
        <input
          type="number"
          value={values.price}
          onChange={(e) => setValues({...values, price: e.target.value})}
          placeholder="Nhập giá hàng hóa"
          required
        />
      </div>

      <div className="form-group">
        <label>Loại hàng hóa:</label>
        <select
          value={values.category}
          onChange={(e) => setValues({...values, category: e.target.value as Product['category']})}
        >
          <option value="vanphongpham">Văn phòng phẩm</option>
          <option value="thucpham">Thực phẩm</option>
          <option value="khac">Khác</option>
        </select>
      </div>

      <div className="modal-buttons">
        <button type="submit" className="submit-button">{submitLabel}</button>
        <button type="button" onClick={onCancel} className="cancel-button">
          Hủy
        </button>
      </div>
    </form>
  );
};

export default ProductForm; 