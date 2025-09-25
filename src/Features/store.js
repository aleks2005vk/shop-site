// src/Features/store.js
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./Categories/categoriesSlice";
import productsReducer from "./Products/productsSlice";
import userReducer from "./user/UserSlice";
import { apiSlice } from "./api/ApiSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    user: userReducer,
		
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
