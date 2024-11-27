// GateCard.js
import React, {
    useState, useEffect
} from 'react';
import {
    Card,
    CardHeader,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import api from '../../../../../service/api';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from "@mui/material/Tooltip";
import Swal from 'sweetalert2';
import { Oval } from "react-loader-spinner";
import { translateStatus } from '../../../../../utils/translation';
import ModalDetailGateDashboard from '../../../../../components/specialized/Modals/ModalDetailGateDashboard';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuth } from '../../../../../utils/token';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const GateCard = ({ gateNumber, name }) => {
    const [activeDotIndex, setActiveDotIndex] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        customPaging: (i) => (
            <button
                style={{
                    width: '15px',
                    height: '15px',
                    margin: '0 5px',
                    borderRadius: '100%',
                    backgroundColor: i === activeDotIndex ? '#0F2167' : '#607274',
                    border: 'none',
                    cursor: 'pointer',
                }}
            ></button>
        ),
        beforeChange: (current, next) => {
            setActiveDotIndex(next);
        },
    };
    function formatDate(dateString) {
        if (!dateString) {
            return '-';
        }

        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            // console.error(`Invalid date string: ${dateString}`);
            return '-';
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    const [loading, setLoading] = useState(true);
    const [gateFetch, setGateFetch] = useState({});
    const [data, setData] = useState(null);
    const [cardinfo, setCardinfo] = useState("");
    const [open, setOpen] = useState(false);
    const [refreshEnabled, setRefreshEnabled] = useState(true);
    const [activeSpan, setActiveSpan] = useState(0);
    const handleRefreshChange = () => {
        setRefreshEnabled(!refreshEnabled);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    useEffect(() => {
        const fetchDataInterval = setInterval(() => {
            if (refreshEnabled) {
                fetchData(gateNumber);
            }
        }, 5000);

        return () => clearInterval(fetchDataInterval);

    }, [gateNumber, refreshEnabled]);
    const navigate = useNavigate()
    const fetchData = async (gateNumber) => {
        const token = localStorage.getItem('token');
        try {
            setLoading(true);
            const response = await api.get(`/Container/last/${gateNumber}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            console.log('response card', response)
            console.log('response data card', response.data)
            if (response.data) {
                setData(response.data);
            } else {
                setData(null);
                setGateFetch((prevGateFetch) => ({
                    ...prevGateFetch,
                    [gateNumber]: 'No data found for ' + gateNumber,
                }));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setGateFetch((prevGateFetch) => ({
                ...prevGateFetch,
                [gateNumber]: 'Error fetching data for ' + gateNumber,
            }));

            if (error.response && error.response.status === 401 && error.response.statusText === 'Unauthorized') {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'An error occurred or Unauthorized',
                });
                clearAuth()
                navigate('/login')
            }else if(error.response && error.response.status === 404) {
                // swal({
                //     icon: 'error',
                //     title: 'Failed',
                //     text: error.response.data ,
                // });
                setCardinfo(error.response.data)
            }
            else 
            {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'An error occurred.'+error.response.data ,
                });
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData(gateNumber);
    }, [gateNumber]);
    const handleSpanClick = (index) => {
        setActiveSpan(index);
    };
    const renderImage = () => {
        console.log('Rendering images:', data?.pictures);
        return (
            <>
                <Slider {...settings}>
                    {data?.pictures?.length > 0 ? (
                        data.pictures.map((picture) => (
                            <div key={picture.id}>
                                <a
                                    href={`/images/${picture.path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        style={{ height: '300px', width: '100%' }}
                                        src={`/images/${picture.path}`}
                                        alt=""
                                    />
                                </a>
                            </div>
                        ))
                    ) : (
                        <div>
                            {/* <img style={{ height: '300px', width: '100%' }} src={notfound} alt="" /> */}
                            <p style={{ height: '300px', width: '600px' }}>{cardinfo}</p>
                        </div>
                    )}
                </Slider>
            </>
        );
    };
    return (
        <>
            <Card style={{
                height: '590px', width: '100%', maxWidth: '640px', backgroundColor: '#fffff'
            }} className="w-full mb-6 flex-grow md:w-1/2 lg:w-1/3 xl:w-1/4">
                <CardHeader
                    variant="gradient"
                    style={{
                        backgroundColor: '#0F2167',
                        position: 'relative'
                    }}
                    className="py-3 px-5 grid place-items-center relative"
                >
                    <div style={{ position: 'absolute', top: 0, right: 0, marginTop: '5px' }}>
                        <FormGroup>
                            <Tooltip title={`Auto Refresh ${name}`} arrow>
                                <FormControlLabel
                                    control={<Switch size="small" checked={refreshEnabled} onChange={handleRefreshChange} />}
                                    className='text-white'
                                />
                            </Tooltip>
                        </FormGroup>
                    </div>
                    {/* <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }} className='bg-[#0F2167] m-2 pb-1 rounded-lg w-[182px] h-[30px] flex'>
                        <span style={{ cursor: 'pointer' }}
                            className={`text-white px-2 ${activeSpan === 0 ? 'border-b-2 border-white' : ''}`}
                            onClick={() => handleSpanClick(0)}
                        >
                            Captured
                        </span>
                        <span
                            style={{ cursor: 'pointer' }}
                            className={`text-white px-2 ${activeSpan === 1 ? 'border-b-2 border-white' : ''}`}
                            onClick={() => handleSpanClick(1)}
                        >
                            LiveStream
                        </span>
                    </div> */}
                    <Typography className="flex" variant="h5" color="white">
                        {loading ? (
                            <Oval
                                height={23}
                                width={23}
                                color="#ffff"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#4fa94d"
                                strokeWidth={2}
                                strokeWidthSecondary={2}

                            />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                                />
                            </svg>

                        )}
                        {/* <Tooltip className='ms-1' placement='top' title={'Click View' + " " + (name)}>
                            {name}
                        </Tooltip> */}
                        <span className='ms-2'> {name}</span>
                    </Typography>
                </CardHeader>
                <CardFooter>
                    <div>
                        {renderImage()}
                    </div>
                    <div className='flex mt-8 flex-col sm:flex-row gap-4 '>
                        <div className='flex'>
                            <div className='me-3'>
                                <p className='text-[black]' style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>No STID</p>
                                <p className='text-[black]' style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>Nopol</p>
                                <p className='text-[black]' style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>No Container</p>
                                <p className='text-[black]' style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>Export/Import</p>
                                {data && data.gateNumber.startsWith('IN') && (
                                    <p className='text-[black]' style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>Gate In Time</p>
                                )}
                                {data && data.gateNumber.startsWith('OUT') && (
                                    <>
                                        <p className='text-[black]' style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>Gate In Time</p>
                                        <p className='text-[black]' style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>Gate Out Time</p>
                                    </>
                                )}

                                <p className='text-[black]' style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>Document Type</p>
                            </div>
                            <div className='m-auto text-[black] flex flex-col'>
                                <p >:</p>
                                <p >:</p>
                                <p >:</p>
                                <p >:</p>
                                {data && data.gateNumber.startsWith('IN') && (
                                    <p >:</p>
                                )}
                                {data && data.gateNumber.startsWith('OUT') && (
                                    <>
                                        <p >:</p>
                                        <p >:</p>
                                    </>
                                )}
                                <p >:</p>
                            </div>
                            <div className='ms-2 text-[black] flex flex-col'>
                                <p style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>{data?.tagNumber ? data?.tagNumber : '-'}</p>
                                <p style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>{data?.truckNumber ? data?.truckNumber : '-'}</p>
                                <p style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>{data?.containerNumber ? data?.containerNumber : "-"}</p>
                                <p style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>{data?.exportImport ? data?.exportImport : '-'}</p>
                                {data && data.gateNumber.startsWith('IN') && (
                                    <p style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>{formatDate(data?.gateInTime ? data?.gateInTime : '-')}</p>
                                )}
                                {data && data.gateNumber.startsWith('OUT') && (
                                    <>
                                        <p style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>{formatDate(data?.gateInTime ? data?.gateInTime : '-')}</p>
                                        <p style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>{formatDate(data?.gateOutTime ? data?.gateOutTime : '-')}</p>
                                    </>
                                )}
                                <p style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>{data?.documentType ? data?.documentType : '-'}</p>
                            </div>
                        </div>
                        <div className='md:ms-auto flex flex-col'>
                            {data && (
                                <Button onClick={() => handleOpen()} variant='contained' style={{ fontSize: '8px', fontWeight: '700' }} className='mb-3 px-11 bg-[#26ACFA]'>Detail</Button>
                            )}

                            {/* <Button variant='contained' style={{ fontSize: '8px', fontWeight: '700' }} className='bg-[#0F2167]'>Open Portal</Button> */}

                        </div>
                    </div>
                </CardFooter>
            </Card>

            <ModalDetailGateDashboard
                open={open}
                handleClose={handleClose}
                data={data}
                name={name}
                refreshEnabled={refreshEnabled}
                handleRefreshChange={handleRefreshChange}
                loading={loading}
            />
        </>
    );
};

export default GateCard;
