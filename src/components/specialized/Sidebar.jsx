import React, { useState, useEffect } from "react";
import logo from "../../assets/bg.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReportIcon from "@mui/icons-material/Report";
import MonitoringIcon from "@mui/icons-material/Visibility";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import logout from "../../assets/logout.png";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

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
      navigate(path);
    } else {
      setIsSidebarOpen(false);
    }
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <>
      {/* Top Bar Search */}
      <nav
        className="fixed w-full py-5 bg-white shadow-md transition-all duration-500 ease-out right-0"
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
        <div className={`h-full pb-4 overflow-y-auto bg-[#0F2167]`}>
          <div
            className={`flex ${
              isSidebarOpen
                ? "bg-[#0F2167] flex h-[70px]"
                : "bg-white py-3 px-3 flex h-[70px]"
            }`}
          >
            {isSidebarOpen ? (
              <div style={{ backgroundColor: "white" }} className="flex">
                <img
                  src={logo}
                  style={{ width: "200px", height: "50px" }}
                  className={`px-6 mt-3 hidden lg:inline`}
                  alt="Logo"
                />
                <button
                  style={{ marginTop: "-15px" }}
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <svg
                    className={`w-[45px] h-8 text-black`}
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
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <svg
                  className={`w-8 ms-1 h-8 text-white`}
                  aria-hidden="true"
                  fill="current Color"
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
                    className="text-white"
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
                onClick={() => handleMenuClick("dashboard", "/dashboard")}
                className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${
                  activeMenu === "dashboard"
                    ? "bg-[#26ACFA] text-white"
                    : "hover:bg-[#26ACFA] group transition duration-300"
                }`}
                style={{ fontWeight: "600" }}
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
                onClick={() => handleMenuClick("transaction", "/transaction")}
                className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${
                  activeMenu === "transaction"
                    ? "bg-[#26ACFA] text-white"
                    : "hover:bg-[#26ACFA] group transition duration-300"
                }`}
                style={{ fontWeight: "600" }}
              >
                <ReceiptIcon />
                {isSidebarOpen ? (
                  <Link to="/transaction">Transaction</Link>
                ) : null}
              </p>
            </li>
            <li
              onClick={() => {
                handleMenuClick("confirmUpdate", "/confirm-update-bc-ca");
              }}
              style={{ cursor: "pointer" }}
            >
              <p
                style={{ fontWeight: "600" }}
                className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 hover:bg-[#26ACFA] transition duration-300`}
              >
                <ConfirmationNumberIcon />
                <span>Confirm BC Data</span>
              </p>
            </li>
            <li
              onClick={() => toggleDropdown("report")}
              style={{ cursor: "pointer" }}
            >
              <p
               style={{fontWeight:'600'}}
                className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 hover:bg-[#26ACFA] transition duration-300`}
              >
                <ReportIcon />
                <span>Report</span>
                <ExpandMoreIcon />
              </p>
              {openDropdown === "report" && (
                <ul className="p-5 rounded-md bg-[#003161] text-gray-500 transition-all duration- 300">
                  <li
                    className="pl-5 mb-3"
                    onClick={() => {
                      handleMenuClick("reportImport", "/report-import");
                    }}
                  >
                    Report Import
                  </li>
                  <li
                    className="pl-5"
                    onClick={() => {
                      handleMenuClick("reportExport", "/report-export");
                    }}
                  >
                    Report Export
                  </li>
                </ul>
              )}
            </li>
            <li
              onClick={() => toggleDropdown("monitoring")}
              style={{ cursor: "pointer" }}
            >
              <p
               style={{fontWeight:'600'}}
                className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 hover:bg-[#26ACFA] transition duration-300`}
              >
                <MonitoringIcon />
                <span>Report Cartos</span>
                <ExpandMoreIcon />
              </p>
              {openDropdown === "monitoring" && (
                <ul className="p-5 rounded-md bg-[#003161] text-gray-500 transition-all duration-300">
                  <li
                    className="pl-5 mb-3"
                    onClick={() => {
                      handleMenuClick(
                        "monitoringRFID",
                        "/monitoring-rfid-cargo"
                      );
                    }}
                  >
                    Monitoring RFID Cargo
                  </li>
                  <li
                    className="pl-5 mb-3"
                    onClick={() => {
                      handleMenuClick("vesselExport", "/vessel-export");
                    }}
                  >
                    Monitoring Vessel Export
                  </li>
                  <li
                    className="pl-5 mb-3"
                    onClick={() => {
                      handleMenuClick("vesselImport", "/vessel-import");
                    }}
                  >
                    Monitoring Vessel Import
                  </li>
                  <li
                    className="pl-5 mb-3"
                    onClick={() => {
                      handleMenuClick("truckExport", "/truck-export");
                    }}
                  >
                    Monitoring Truck Export
                  </li>
                  <li
                    className="pl-5 mb-3"
                    onClick={() => {
                      handleMenuClick("truckImport", "/truck-import");
                    }}
                  >
                    Monitoring Truck Import
                  </li>
                  <li
                    className="pl-5 mb-3"
                    onClick={() => {
                      handleMenuClick("yarnExport", "/yarn-export");
                    }}
                  >
                    Monitoring Yarn Export
                  </li>
                  <li
                    className="pl-5 mb-3"
                    onClick={() => {
                      handleMenuClick("yarnImport", "/yarn-import");
                    }}
                  >
                    Monitoring Yarn Import
                  </li>
                </ul>
              )}
            </li>
            <li
              onClick={() => toggleDropdown("exsDKP")}
              style={{ cursor: "pointer" }}
            >
              <p
               style={{fontWeight:'600'}}
                className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 hover:bg-[#26ACFA] transition duration-300`}
              >
                <ReportIcon />
                <span>Eks DKP</span>
                <ExpandMoreIcon />
              </p>
              {openDropdown === "exsDKP" && (
                <ul className="p-5 rounded-md bg-[#003161] text-gray-500 transition-all duration-300">
                  <li
                    className="pl-5 mb-3"
                    onClick={() => {
                      handleMenuClick("reportExportDKP", "/report-export-dkp");
                    }}
                  >
                    Report Export DKP
                  </li>
                  <li
                    className="pl-5"
                    onClick={() => {
                      handleMenuClick(
                        "monitoringYarnDKP",
                        "/monitoring-yarn-dkp"
                      );
                    }}
                  >
                    Monitoring Yarn DKP
                  </li>
                </ul>
              )}
            </li>
            <li
              onClick={() => toggleDropdown("reportAms")}
              style={{ cursor: "pointer" }}
            >
              <p
                style={{ fontWeight: '600' }}
                className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 hover:bg-[#26ACFA] transition duration-300`}
              >
                <ReportIcon />
                <span>Report AMS</span>
                <ExpandMoreIcon />
              </p>
              {openDropdown === "reportAms" && (
                <ul className="p-5 rounded-md bg-[#003161] text-gray-500 transition-all duration-300">
                  <li
                    className="pl-5 mb-3"
                    onClick={() => {
                      handleMenuClick("monthlyReport", "/monthly-report");
                    }}
                  >
                    Monthly Report
                  </li>
                  <li
                    className="pl-5"
                    onClick={() => {
                      handleMenuClick(
                        "dailyReport",
                        "/daily-report"
                      );
                    }}
                  >
                    Daily Report
                  </li>
                </ul>
              )}
            </li>
          </ul>
          <div className="absolute bottom-5 left-0 right-0">
            <button className="flex w-[200px] m-auto items-center justify-center  p-2 rounded-lg text-white bg-[#fa2626] hover:text-white transition duration-300">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
