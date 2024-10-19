import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://shoopjson-2.onrender.com/api/shop'); // API URL manzilingiz
  return response.json();
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload); // Mahsulot qo'shish
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload); // Mahsulotni o'chirish
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload; // Mahsulotni yangilash
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload; // Mahsulotlar olindi
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Xato xabari
      });
  },
});

export const { addProduct, removeProduct, updateProduct } = productSlice.actions;

export default productSlice.reducer;
