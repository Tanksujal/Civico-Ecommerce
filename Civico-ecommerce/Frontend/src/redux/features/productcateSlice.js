import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to fetch products category-wise
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/product/fetchProductsByCategory?id=${categoryId}`);
      return { categoryId, products: response.data.products };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching products");
    }
  }
);

const productcateSlice = createSlice({
  name: "products",
  initialState: {
    categoryProducts: {}, // { categoryId: [products] }
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts[action.payload.categoryId] = action.payload.products;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productcateSlice.reducer;
