import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../Features/Categories/categoriesSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
  devTools: true,
});
