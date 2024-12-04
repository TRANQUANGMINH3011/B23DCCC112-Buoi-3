export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'vanphongpham' | 'thucpham' | 'khac';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface ProductFormProps {
  initialValues: {
    name: string;
    price: string | number;
    category: Product['category'];
  };
  onSubmit: (values: Omit<Product, 'id'>) => void;
  onCancel: () => void;
  submitLabel: string;
} 