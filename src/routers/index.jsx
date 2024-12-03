import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/auth/login";
import Layout from "../layout/layout";
import Dashboard from "../views/admin/dashboard";
import Transaction from "../views/admin/transaction";

// Router Component
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/transaction" element={<Layout />}>
          <Route index element={<Transaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
