import React, { useState, useEffect } from 'react';
import logo from "../../../assets/tpk-logo.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import InventoryIcon from '@mui/icons-material/Inventory';
import AdjustIcon from '@mui/icons-material/Adjust';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CastIcon from '@mui/icons-material/Cast';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import HistoryIcon from '@mui/icons-material/History';
import Button from "@mui/material/Button";
import { useLocation } from 'react-router-dom';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import logout from "../../../assets/logout.png";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { clearAuth } from "../../../utils/token";
import Swal from "sweetalert2";
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const dataUser = localStorage.getItem('role')
    const isAdminP2 = dataUser && dataUser.includes("P2");
    const isADMINISTRATOR = dataUser && (dataUser.includes("ADMINISTRATOR") || dataUser.includes("ADMINBC"));
    const currentUserRole = dataUser?.role || '';
    const [activeMenu, setActiveMenu] = useState('dashboard');
    useEffect(() => {
        if (currentPath === '/dashboard') {
            setActiveMenu('dashboard');
        } else if (currentPath === '/transaction') {
            setActiveMenu('transaction');
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
    const handleMenuMonitoring = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    }
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const handleSubMenuItemClick = (submenuItem) => {
        console.log(`Clicked on submenu item: ${submenuItem}`);
    };
    const handleMenuLog = () => {
        setIsSubMenuOpenLog(!isSubMenuOpenLog);
    }
    const [isSubMenuOpenLog, setIsSubMenuOpenLog] = useState(false);
    const handleSubMenuItemClickLog = (submenuItem) => {
        console.log(`Clicked on submenu item: ${submenuItem}`);
    };
    const handleMenuSetting = () => {
        setIsSubMenuOpenSetting(!isSidebarOpenSetting);
    }
    const [isSidebarOpenSetting, setIsSubMenuOpenSetting] = useState(false);
    const handleSubMenuItemClickSetting = (submenuItem) => {
        console.log(`Clicked on submenu item: ${submenuItem}`);
    };
    const navigate = useNavigate();
    // const devices = import.meta.env.VITE_REACT_APP_API_URL_DEVICES
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSearch = (event) => {
        event.preventDefault();
        setLoading(true);
        setTimeout(() => {
            navigate(`/search?query=${searchQuery}`);
            setLoading(false); 
        }, 1000); 
    };
    const onLogout = () => {
        Swal.fire({
            title: 'Logout Confirmation',
            text: 'Are you sure you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Please wait...',
                    text: 'Currently processing ',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });
                setTimeout(() => {
                    Swal.close();
                }, 1000);
                setTimeout(() => {
                    clearAuth();
                    navigate('/');
                }, 1200);
            }
        });
    };

    return (
        <>
            {/* top bar search */}
            <nav className={`fixed w-full py-5 bg-[#ffffff] shadow-md transition-all duration-500 ease-out right-0`} style={{ zIndex: 99 }}>
                <div className="px-3 py-4 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-md ml-auto">
                            {/* <input
                                type="text"
                                id="myInput"
                                name="myInput"
                                placeholder='Pencarian...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="shadow bg-[#d8feff] appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <Button
                                variant='contained'
                                type="submit"
                                disabled={loading}
                                startIcon={<ContentPasteSearchIcon fontSize='small' className='ms-2' />}
                            >
                                {loading ? 'Loading' : 'Search'}
                            </Button> */}
                        </form>
                    </div>
                </div>
            </nav>

            {/* Side Bar Navigation */}
           <div className={`fixed top-0 left-0 ${isSidebarOpen ? 'w-[245px]' : 'w-[60px]'} h-screen transition-transform`} aria-label="Sidebar" style={{ zIndex: 99 }}> 
                <div className={`h-full pb-4 overflow-y-auto bg-[#0F2167] `} >
                    <div style={{ zIndex: 2 }} className={`flex ${isSidebarOpen ? "bg-[#0F2167]  flex h-[70px]" : " bg-[#fffff] py-3 px-3 flex h-[70px]"}`}>
                        {isSidebarOpen ? (
                            <div style={{ backgroundColor: 'white'  }} className='flex'>
                                <img src={logo} style={{ width: '240px', height: '50px' }} className={` px-6 mt-3 hidden lg:inline`} alt="Flowbite Logo" />
                                <button style={{ marginTop: '-15px' }} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                    <svg className={`w-8 h-8 text-[#000000]`} aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <>
                                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                    <svg className={`w-8 ms-1 h-8 text-[#ffffff]`} aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>

                    {isSidebarOpen ? (
                        <div className="flex px-3 mt-4 flex-col items-center">
                            <div className="flex flex-col items-center m-auto bg-[#9BB8CD] py-2 px-5 rounded-lg">
                                <div className='ms-1'>
                                    <img src={logout} alt="Logout Icon" width={70} height={70} />
                                </div>
                                <div className='flex text-center justify-center flex-col mt-2'>
                                    <h5 className='text-[white]' style={{ fontSize: '18px', fontWeight: '600' }}>{localStorage.getItem('fullname')}</h5>
                                    <h6 className='text-[#fa2626]' style={{ fontSize: '12px', fontWeight: '600' }}>{localStorage.getItem('role')}</h6>
                                </div>
                                <Button
                                    onClick={onLogout}
                                    sx={{ backgroundColor: 'red' }}
                                    className='gap-1'
                                    variant='contained' size='small'
                                >
                                    <ExitToAppIcon fontSize='small' />  Logout
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <div className="flex gap-2 items-center m-auto bg-[#9BB8CD] py-5 px-4 rounded-lg">
                                <img src={logout} alt="Logout Icon" width={40} height={40} />
                            </div>
                        </div>
                    )}

                    <ul className="space-y-2 font-medium mt-6 ms-2 ">
                        <li onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
                            <p onClick={() => handleMenuClick('dashboard')} className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${activeMenu === 'dashboard' ? 'bg-[#26ACFA] dark:bg-[#26ACFA] text-white' : 'hover:bg-[#26ACFA] dark:hover:bg-[#26ACFA]  group'
                                }`}>
                                <DashboardIcon />
                                {isSidebarOpen ? (
                                    <Link to='/dashboard'>Dashboard</Link>
                                ) : null}

                            </p>
                        </li>
                        <li onClick={() => navigate('/transaction')} style={{ cursor: 'pointer' }}>
                            <p onClick={() => handleMenuClick('transaction')} className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${activeMenu === 'transaction' ? 'bg-[#26ACFA] dark:bg-[#26ACFA] text-white' : 'hover:bg-[#26ACFA] dark:hover:bg-[#26ACFA]  group'
                                }`}>
                                 <BackupTableIcon />
                                {isSidebarOpen ? (
                                    <Link to='/transaction'>Transaction</Link>
                                ) : null}

                            </p>
                        </li>
                        {/* <li onClick={() => navigate('/cctv')} style={{ cursor: 'pointer' }}>
                            <p onClick={() => handleMenuClick('cctv')} className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${activeMenu === 'cctv' ? 'bg-[#26ACFA] dark:bg-[#26ACFA] text-white' : 'hover:bg-[#26ACFA] dark:hover:bg-[#26ACFA]  group'
                                }`}>
                                <CameraAltIcon/>
                                {isSidebarOpen ? (
                                    <Link to='/cctv'>CCTV</Link>
                                ) : null}

                            </p>
                        </li>
                        <li onClick={() => navigate('/arsip')} style={{ cursor: 'pointer' }}>
                            <p onClick={() => handleMenuClick('arsip')} className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${activeMenu === 'arsip' ? 'bg-[#26ACFA] dark:bg-[#26ACFA] text-white' : 'hover:bg-[#26ACFA] dark:hover:bg-[#26ACFA]  group'
                                }`}>
                                <BackupTableIcon />
                                {isSidebarOpen ? (
                                    <Link to='/dashboard'>Arsip</Link>
                                ) : null}

                            </p>
                        </li>
                        <li onClick={() => navigate('/historypage')} style={{ cursor: 'pointer' }}>
                            <p onClick={() => handleMenuClick('historypage')} className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${activeMenu === 'historypage' ? 'bg-[#26ACFA] dark:bg-[#26ACFA] text-white' : 'hover:bg-[#26ACFA] dark:hover:bg-[#26ACFA]  group'
                                }`}>
                                <HistoryIcon />
                                {isSidebarOpen ? (
                                    <Link to='/dashboard'>Activity History</Link>
                                ) : null}

                            </p>
                        </li> */}
                        
                        {/* <li onClick={() => navigate('/activitylist')} style={{ cursor: 'pointer' }}>
                            <p onClick={() => handleMenuClick('activitylist')} className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${activeMenu === 'activitylist' ? 'bg-[#26ACFA] dark:bg-[#26ACFA] text-white' : 'hover:bg-[#26ACFA] dark:hover:bg-[#26ACFA]  group'
                                }`}>
                                <BackupTableIcon />
                                {isSidebarOpen ? (
                                    <Link to='/dashboard'>Activity History</Link>
                                ) : null}

                            </p>
                        </li> */}
                        {/* {isAdminP2 ? (
                            <li onClick={() => navigate('/atensi')} style={{ cursor: 'pointer' }}>
                                <p onClick={() => handleMenuClick('atensi')} className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${activeMenu === 'atensi' ? 'bg-[#26ACFA] dark:bg-[#26ACFA] text-white' : 'hover:bg-[#26ACFA] dark:hover:bg-[#26ACFA]  group'
                                    }`}>
                                    <AccessibilityIcon />
                                    {isSidebarOpen ? (
                                        <Link to='/atensi'>AtensiP2</Link>
                                    ) : null}

                                </p>
                            </li>
                    
                        ) : null} */}
                        

                        {/* <li onClick={handleMenuMonitoring} style={{ cursor: 'pointer' }}>
                            <p onClick={() => handleMenuClick('monitoring')} className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${activeMenu === 'monitoring' ? 'bg-[#26ACFA] dark:bg-[#26ACFA] text-white' : 'hover:bg-[#26ACFA] dark:hover:bg-[#26ACFA]  group'}`}>
                                <CastIcon />
                                {isSidebarOpen ? (
                                    <>
                                        <span>Monitoring</span>
                                        <ArrowDropDownIcon fontSize='small' className='mt-1' />
                                    </>
                                ) : null}
                            </p>
                            {isSubMenuOpen && (
                                <ul className='space-y-1 font-medium ms-4 '>
                                    <li>
                                        {isSidebarOpen ? (
                                            <>
                                                <Link className='text-gray-500' to='/live'>Live</Link>
                                            </>
                                        ) : null}
                                    </li>
                                    <li>
                                        {isSidebarOpen ? (
                                            <>
                                                <Link className='text-gray-500' to='/transaction'>Transaction</Link>
                                            </>
                                        ) : null}

                                    </li>
                                    <li>
                                        {isSidebarOpen ? (
                                            <>
                                                <Link className='text-gray-500' to='/checkpoint'>Check Point</Link>
                                            </>
                                        ) : null}

                                    </li>
                                    <li>
                                        {isSidebarOpen ? (
                                            <>
                                                <Link className='text-gray-500' to='/cctv'>CCTV</Link>
                                            </>
                                        ) : null}

                                    </li>
                                    <li>
                                        {isSidebarOpen ? (
                                            <>
                                                <Link className='text-gray-500' to='/device'>Device</Link>
                                            </>
                                        ) : null}

                                    </li>
                                    <li>
                                        {isSidebarOpen ? (
                                            <>
                                                <Link className='text-gray-500' to='/portal'>Manual Portal</Link>
                                            </>
                                        ) : null}

                                    </li>
                                </ul>
                            )}
                        </li> */}
                        {/* <li onClick={handleMenuLog} style={{ cursor: 'pointer' }}>
                            <p onClick={() => handleMenuClick('log')} className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${activeMenu === 'log' ? 'bg-[#26ACFA] dark:bg-[#26ACFA] text-white' : 'hover:bg-[#26ACFA] dark:hover:bg-[#26ACFA]  group'}`}
                            >
                                <ReceiptLongIcon />
                                {isSidebarOpen ? (
                                    <>
                                        <Link to='/log'>Log</Link>
                                        <ArrowDropDownIcon fontSize='small' className='mt-1 ms-11' />
                                    </>
                                ) : null}
                            </p>
                            {isSubMenuOpenLog && (
                                <ul className='space-y-1 font-medium ms-4 '>
                                    <li>
                                        {isSidebarOpen ? (
                                            <>
                                                <Link className='text-gray-500' to='/log'>Submenu Item 1</Link>
                                            </>
                                        ) : null}

                                    </li>
                                    <li>
                                        {isSidebarOpen ? (
                                            <>
                                                <p className='text-gray-500' onClick={() => handleSubMenuItemClickLog('Submenu Item 2')}>
                                                    Submenu Item 2
                                                </p>
                                            </>
                                        ) : null}
                                    </li>
                                </ul>
                            )}
                        </li> */}
                        {/* <li onClick={handleMenuSetting} style={{ cursor: 'pointer' }}>
                            <p onClick={() => handleMenuClick('setting')} className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${activeMenu === 'setting' ? 'bg-[#26ACFA] dark:bg-[#26ACFA] text-white' : 'hover:bg-[#26ACFA] dark:hover:bg-[#26ACFA]  group'
                                }`}>
                                <SettingsSuggestIcon />

                                {isSidebarOpen ? (
                                    <>
                                        <Link to='/setting'>Setting</Link>
                                        <ArrowDropDownIcon fontSize='small' className='mt-1 ms-6' />
                                    </>
                                ) : null}
                            </p>
                            {isSidebarOpenSetting && (
                                <ul className='space-y-1 font-medium ms-4 '>
                                    <li>
                                        {isSidebarOpen ? (
                                            <>
                                                <Link className='text-gray-500' to='/setting'>Submenu Item 1</Link>
                                            </>
                                        ) : null}

                                    </li>
                                    <li>
                                        {isSidebarOpen ? (
                                            <>
                                                <p className='text-gray-500' onClick={() => handleSubMenuItemClickSetting('Submenu Item 2')}>
                                                    Submenu Item 2
                                                </p>
                                            </>
                                        ) : null}

                                    </li>
                                </ul>
                            )}
                        </li> */}
                        {/* {['ADMINBC', 'CUSMOD', 'P2'].some(role => currentUserRole.includes(role)) && (
                            <li onClick={() => navigate('/user')} style={{ cursor: 'pointer' }}>
                                <p onClick={() => handleMenuClick('user')} className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${activeMenu === 'user' ? 'bg-[#26ACFA] dark:bg-[#26ACFA] text-white' : 'hover:bg-[#26ACFA] dark:hover:bg-[#26ACFA]  group'
                                    }`}>
                                    <AccountBoxIcon />
                                    {isSidebarOpen ? (
                                        <Link to='/user'>Users</Link>
                                    ) : null}
                                </p>
                            </li>
                        )} */}
                        {/* {isADMINISTRATOR ? (
                            <li onClick={() => navigate('/user')} style={{ cursor: 'pointer' }}>
                                <p onClick={() => handleMenuClick('user')} className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${activeMenu === 'user' ? 'bg-[#26ACFA] dark:bg-[#26ACFA] text-white' : 'hover:bg-[#26ACFA] dark:hover:bg-[#26ACFA]  group'
                                    }`}>
                                    <AccountBoxIcon />
                                    {isSidebarOpen ? (
                                        <Link to='/user'>Users</Link>
                                    ) : null}
                                </p>
                            </li>
                        ) : null} */}
                       
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;