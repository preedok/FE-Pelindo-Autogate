import React, { useState, useEffect } from "react";
import logo from "../../assets/bg.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useLocation } from "react-router-dom";
import logout from "../../assets/logout.png";
import ReceiptIcon from "@mui/icons-material/Receipt";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeMenu, setActiveMenu] = useState("dashboard");
  useEffect(() => {
    if (currentPath === "/dashboard") {
      setActiveMenu("dashboard");
    } else if (currentPath === "/transaction") {
      setActiveMenu("transaction");
    }
  }, [currentPath]);

  const handleMenuClick = (menu, path) => {
    setActiveMenu(menu);
    if (currentPath !== path) {
      setActiveMenu(menu);
    } else {
      setIsSidebarOpen(false);
    }
  };
  const navigate = useNavigate();
  return (
    <>
      {/* top bar search */}
      <nav
        className={`fixed w-full py-5 bg-[#ffffff] shadow-md transition-all duration-500 ease-out right-0`}
        style={{ zIndex: 99 }}
      >
        <div className="px-3 py-4 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <form className="flex items-center gap-2 max-w-md ml-auto"></form>
          </div>
        </div>
      </nav>

      {/* Side Bar Navigation */}
      <div
        className={`fixed top-0 left-0 ${
          isSidebarOpen ? "w-[245px]" : "w-[60px]"
        } h-screen transition-transform`}
        aria-label="Sidebar"
        style={{ zIndex: 99 }}
      >
        <div className={`h-full pb-4 overflow-y-auto bg-[#0F2167] `}>
          <div
            style={{ zIndex: 2 }}
            className={`flex ${
              isSidebarOpen
                ? "bg-[#0F2167]  flex h-[70px]"
                : " bg-[#fffff] py-3 px-3 flex h-[70px]"
            }`}
          >
            {isSidebarOpen ? (
              <div style={{ backgroundColor: "white" }} className="flex">
                <img
                  src={logo}
                  style={{ width: "240px", height: "50px" }}
                  className={` px-6 mt-3 hidden lg:inline`}
                  alt="Flowbite Logo"
                />
                <button
                  style={{ marginTop: "-15px" }}
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <svg
                    className={`w-8 h-8 text-[#000000]`}
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <svg
                    className={`w-8 ms-1 h-8 text-[#ffffff]`}
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
              </>
            )}
          </div>

          {isSidebarOpen ? (
            <div className="flex px-3 mt-4 flex-col items-center">
              <div className="flex flex-col items-center m-auto bg-[#9BB8CD] py-2 px-5 rounded-lg">
                <div className="ms-1">
                  <img src={logout} alt="Logout Icon" width={70} height={70} />
                </div>
                <div className="flex text-center justify-center flex-col mt-2">
                  <h5
                    className="text-[white]"
                    style={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    {localStorage.getItem("fullname")}
                  </h5>
                  <h6
                    className="text-[#fa2626]"
                    style={{ fontSize: "12px", fontWeight: "600" }}
                  >
                    {localStorage.getItem("role")}
                  </h6>
                </div>
                {/* <Button
                  sx={{ backgroundColor: "red" }}
                  className="gap-1"
                  variant="contained"
                  size="small"
                >
                  <ExitToAppIcon fontSize="small" /> Logout
                </Button> */}
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="flex gap-2 items-center m-auto bg-[#9BB8CD] py-5 px-4 rounded-lg">
                <img src={logout} alt="Logout Icon" width={40} height={40} />
              </div>
            </div>
          )}

          <ul className="space-y-2 font-medium mt-6 mx-3 ">
            <li
              onClick={() => navigate("/dashboard")}
              style={{ cursor: "pointer" }}
            >
              <p
                onClick={() => handleMenuClick("dashboard")}
                className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${
                  activeMenu === "dashboard"
                    ? "bg-[#26ACFA] dark:bg-[#26ACFA] text-white"
                    : "hover:bg-[#26ACFA] dark:hover:bg-[#26ACFA]  group"
                }`}
              >
                <DashboardIcon />
                {isSidebarOpen ? <Link to="/dashboard">Dashboard</Link> : null}
              </p>
            </li>
            <li
              onClick={() => navigate("/transaction")}
              style={{ cursor: "pointer" }}
            >
              <p
                onClick={() => handleMenuClick("transaction")}
                className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${
                  activeMenu === "transaction"
                    ? "bg-[#26ACFA] dark:bg-[#26ACFA] text-white"
                    : "hover:bg-[#26ACFA] dark:hover:bg-[#26ACFA]  group"
                }`}
              >
                <ReceiptIcon />
                {isSidebarOpen ? (
                  <Link to="/transaction">Transaction</Link>
                ) : null}
              </p>
            </li>
            {/* <li onClick={() => navigate("/gate")} style={{ cursor: "pointer" }}>
              <p
                onClick={() => handleMenuClick("gate")}
                className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${
                  activeMenu === "gate"
                    ? "bg-[#26ACFA] dark:bg-[#26ACFA] text-white"
                    : "hover:bg-[#26ACFA] dark:hover:bg-[#26ACFA]  group"
                }`}
              >
                <FenceIcon />
                {isSidebarOpen ? <Link to="/gate">Gate</Link> : null}
              </p>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
