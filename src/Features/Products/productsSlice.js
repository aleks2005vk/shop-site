import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { shuffle } from "../../utils/common";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      return res.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    related: [],
    filtered: [],
    isLoading: false,
    status: null,
  },
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.items.filter((item) => item.price <= payload);
    },
    getRelatedProducts: (state, { payload }) => {
      const list = state.items.filter((item) => item.id === payload);
      if (list.length === 0) return;
      const category = list[0].category;
      state.related = shuffle(
        state.items.filter(
          (item) => item.category === category && item.id !== payload
        )
      ).slice(0, 4);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.status = "success";
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.status = "failed";
      });
  },
});

export const { filterByPrice, getRelatedProducts } = productsSlice.actions;
export default productsSlice.reducer;
