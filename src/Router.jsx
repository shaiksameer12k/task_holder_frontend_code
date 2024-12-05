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
        
        <Route path="dashboard" element={<h1>Dashboard</h1>} />
        <Route path="studentsList" element={<h1>Services</h1>} />
        <Route path="userMaster" element={<h1>User Master</h1>} />
        
      </Route>
    </Routes>
  );
};
export default Router;
