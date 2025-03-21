import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Category, Product } from '../../types/product';

interface ProductState {
  products: Product[];
  categories: Category[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  categories: [],
  loading: false,
};

// Fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data.products;
  }
);

// Fetch products by search term
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query: string) => {
    const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
    return response.data.products;
  }
);

// Fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categorySlug: string) => {
    const response = await axios.get(`https://dummyjson.com/products/category/${categorySlug}`);
    return response.data.products;
  }
);

// Fetch categories
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await axios.get<Category[]>('https://dummyjson.com/products/categories');
    return response.data;
  }
);


const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, state => {
        state.loading = false;
      })
      .addCase(searchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(searchProducts.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchProductsByCategory.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsByCategory.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setLoading } = productSlice.actions;

export default productSlice.reducer;
