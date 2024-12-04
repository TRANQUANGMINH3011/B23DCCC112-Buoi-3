import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/types';

interface ProductState {
  items: Product[];
  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: ProductState = {
  items: [],
  searchTerm: '',
  currentPage: 1,
  itemsPerPage: 5,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { addProduct, deleteProduct, updateProduct, setSearchTerm, setCurrentPage } = productSlice.actions;
export default productSlice.reducer; 