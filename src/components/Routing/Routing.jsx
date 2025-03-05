import React from "react";
import { Route, Routes } from 'react-router-dom'

import HomePage from "../Home/HomePage"
import ProductsPage from "../Products/ProductsPage";
import CartPage from "../CartPage/CartPage"
import MyOrder from "../MyOrders/MyOrder"
import LoginPage from "../LoginPage/LoginPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import SingleProductsPage from "../SingleProduct/SingleProduct"
import LogOut from "../Logout/logout";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
        <Route
        path="/"
        element ={<HomePage/>}

        />
        <Route
        path="/products"
        element ={<ProductsPage/>}
        />
        <Route
        path="/product/:id"
        element ={<SingleProductsPage/>}
        />
        <Route
        path="/login"
        element ={<LoginPage/>}
        />
        <Route
        path="/signup"
        element ={<SignUpPage/>}
        />
        <Route element={<ProtectedRoute/>}>
          <Route
          path="/orders"
          element ={<MyOrder/>}
          />
          <Route
          path="/cart"
          element ={<CartPage/>}
          />
          <Route
          path="/logout"
          element={<LogOut/>}
          />
        </Route>
    </Routes>
  )
}
export default Routing 