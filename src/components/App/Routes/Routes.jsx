import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import SingleProduct from "../../Products/singleProduct";
import CategoriesPage from "../../Categories/Categories"; 
import { ROUTES } from "../../../utils/routes";
import SingleCategory from "../../categories/SingleCategory";
import Cart from "../../cart/cart";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
      <Route path="/categories/:id" element={<CategoriesPage />} />
      <Route path="/category/:id" element={<SingleCategory />} />
      <Route path="/cart" element={<Cart />} />
      {/* Можно добавить 404 */}
      {/* <Route path={ROUTES.NOT_FOUND} element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
