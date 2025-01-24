import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import LoginComponent from "./components/LoginPage/LoginComponent";
import Layout from "./components/Layout/Layout";

import PageNotFound from "./components/PageNotFound/PageNotFound";
import Dashboard from "./components/Main/Dashboard";
import SignUpComponent from "./components/LoginPage/SignUpComponent";
import axios from "axios";

const Router = () => {
  let isAdimn = true;

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");

    // If the token isn't set in axios defaults and is available in localStorage, set it
    if (localStorageToken) {
      delete axios.defaults.headers.common["Authorization"];
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorageToken}`;
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/userLoginPage" element={<LoginComponent />} />
      <Route path="/userSignUpPage" element={<SignUpComponent />} />

      <Route path="/layout" element={<Layout isAdimn={true} />}>
        <Route index element={<Dashboard />} />
        <Route path="/layout/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<PageNotFound isAdimn={isAdimn} />} />
    </Routes>
  );
};
export default Router;
