import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/auth/login";
import Layout from "../layout/layout";
import Dashboard from "../views/admin/dashboard";
import Transaction from "../views/admin/transaction";

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






















































// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "../views/auth/login";
// import Layout from "../layout/layout";
// import Dashboard from "../views/admin/dashboard";
// import Transaction from "../views/admin/transaction";
// import { useAuth } from "../context/AuthContext"; // Import the Auth context

// // Router Component
// const Router = () => {
//   const { isAuthenticated } = useAuth(); // Get authentication state

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Navigate to="/dashboard" replace />} />
//         <Route
//           path="/dashboard"
//           element={
//             isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
//           }
//         >
//           <Route index element={<Dashboard />} />
//         </Route>
//         <Route
//           path="/transaction"
//           element={
//             isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
//           }
//         >
//           <Route index element={<Transaction />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default Router;
