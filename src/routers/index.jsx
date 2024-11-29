import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Login from "../views/auth/login";
import Dashboard from "../views/admin/dashboard";
import Layout from "../layout/layout";

// Router Component
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                </Route>
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;