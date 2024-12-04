import React from "react";

import Main from "./components/Main/Main";

import { Route, Routes } from "react-router-dom";
import LoginComponent from "./components/LoginPage/LoginComponent";
import Layout from "./components/Layout/Layout";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/loginPage" element={<LoginComponent />} />
      <Route path="/layout" element={<Layout />}>
        <Route index element={<h1>Dashboad</h1>} />
        <Route path="services" element={<h1>Services</h1>} />
        <Route path="about" element={<h1>About</h1>} />
        <Route path="shop" element={<h1>Shop</h1>} />
        <Route path="cart" element={<h1>Your Cart</h1>} />
        <Route path="notification" element={<h1>Your Notificatin</h1>} />
      </Route>
    </Routes>
  );
};
export default Router;
