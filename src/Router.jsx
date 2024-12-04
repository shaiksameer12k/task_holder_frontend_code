import React from "react";

import Main from "./components/Main/Main";

import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/home" element={<Main />} />
      <Route path="/services" element={<h1>Services</h1>} />
      <Route path="/about" element={<h1>About</h1>} />
      <Route path="/shop" element={<h1>Shop</h1>} />
      <Route path="/cart" element={<h1>Your Cart</h1>} />
      <Route path="/notification" element={<h1>Your Notificatin</h1>} />
    </Routes>
  );
};
export default Router;
