import React, { useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import Login from "../views/auth/login";
// import Log from "../views/admin/log/log";
import Dashboard from "../views/admin/dashboard/dashboard";
// import swal from "sweetalert";
import Layout from "../layout/layout";
// import Users from "../views/admin/users/users";
// import Setting from "../views/admin/setting/setting";
// import Live from '../views/admin/monitoring/live/live'
// import Transaction from "../views/admin/monitoring/transaction/transaction";
// import CheckPoint from "../views/admin/monitoring/checkpoint/checkpoint";
// import Devices from "../views/admin/monitoring/devices/devices";
// import Portal from "../views/admin/monitoring/portal/portal";
// import Search from '../views/admin/search/search'
// import Arsip from "../views/admin/arsip";
// import Atensi from "../views/admin/atensiP2";
// import HistoryPage from "../views/admin/historypage";
// import CCTVMonitor from "../views/admin/CCTV";
import Transaction from '../views/admin/transaction'

// Scroll to Top when switching page
const ScrollToTop = ({ children }) => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return children;
};
// Private routing
const Auth = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        // swal({
        //     title: "Denied!",
        //     text: `Access Denied, Please Login!`,
        //     icon: "error",
        // });
        return <Navigate to="/login" replace />;
    }
    return children;
};
const token = localStorage.getItem("token");
const Router = () => {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Routes>
                    {/* Auth Routes  */}
                    <Route path="/login" element={<Login />} />

                    {/* Main Routes */}
                    <Route path="/dashboard" element={<Layout />}>
                        <Route index element={<Auth><Dashboard /></Auth>} />
                    </Route>

                    <Route
                        path="/"
                        element={token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
                    />
                     <Route path="/transaction" element={<Layout />}>
                        <Route index element={<Auth> <Transaction /> </Auth>} />
                    </Route>
                    {/* <Route path="/log" element={<Layout />}>
                        <Route index element={<Auth> <Log /> </Auth>} />
                    </Route>
                    <Route path="/user" element={<Layout />}>
                        <Route index element={<Auth> <Users /> </Auth>} />
                    </Route>
                    <Route path="/setting" element={<Layout />}>
                        <Route index element={<Auth> <Setting /> </Auth>} />
                    </Route>
                    <Route path="/live" element={<Layout />}>
                        <Route index element={<Auth> <Live /> </Auth>} />
                    </Route>
                    <Route path="/transaction" element={<Layout />}>
                        <Route index element={<Auth> <Transaction /> </Auth>} />
                    </Route>
                    <Route path="/checkpoint" element={<Layout />}>
                        <Route index element={<Auth> <CheckPoint /> </Auth>} />
                    </Route>
                    <Route path="/cctv" element={<Layout />}>
                        <Route index element={<Auth> <CCTVMonitor /> </Auth>} />
                    </Route>
                    <Route path="/device" element={<Layout />}>
                        <Route index element={<Auth> <Devices /> </Auth>} />
                    </Route>
                    <Route path="/portal" element={<Layout />}>
                        <Route index element={<Auth> <Portal /> </Auth>} />
                    </Route>
                    <Route path="/search" element={<Layout />}>
                        <Route index element={<Auth> <Search /> </Auth>} />
                    </Route>
                    <Route path="/arsip" element={<Layout />}>
                        <Route index element={<Auth> <Arsip /> </Auth>} />
                    </Route>
                    <Route path="/historypage" element={<Layout />}>
                        <Route index element={<Auth> <HistoryPage /> </Auth>} />
                    </Route>
                    <Route path="/atensi" element={<Layout />}>
                        <Route index element={<Auth> <Atensi /> </Auth>} />
                    </Route> */}
                </Routes>
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default Router;