import React, { useState, useEffect } from 'react'
import api from '../../../service/api';
import CustomTable from '../../../components/specialized/DataTable/CustomTable';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Button from "@mui/material/Button";
import ContentCard from '../../../components/common/Card/CardContent';
import HttpsIcon from '@mui/icons-material/Https';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from "@mui/material/IconButton";
import CancelIcon from '@mui/icons-material/Cancel';
import ModalDetailGateDashboard from '../../../components/specialized/Modals/ModalDetailGateDashboard';
import AutoRefresh from '../../../utils/autorefresh';
import swal from 'sweetalert';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrombs from '../../../components/common/Breadcrombs/Breadcrombss';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CircularProgress from '@mui/material/CircularProgress';
import { clearAuth } from '../../../utils/token';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '13px',
    p: 4,
};
const Search = () => {
    // transaction
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [openViews, setOpenViews] = useState(false);
    const [dataDetailViews, setDataDetailViews] = useState([]);
    const handleOpenViews = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`/Container/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOpenViews(true);
            setDataDetailViews(response.data);
        } catch (error) {
            console.log(error)
        }
    };
    const handleCloseViews = () => setOpenViews(false);

    // hold
    const [openHold, setOpenHold] = useState(false);
    const [dataDetailHold, setDataDetailHold] = useState([]);
    const handleOpenHold = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`/Container/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOpenHold(true);
            setDataDetailHold(response.data);
        } catch (error) {
            console.log(error)
        }
    };
    const handleCloseHold = () => setOpenHold(false);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(Number(event.target.value));
        setPage(0);
    };
    const columns = [
        { id: 'no', label: 'No Tag', minWidth: 80 },
        { id: 'polisi', label: 'No Polisi', minWidth: 80 },
        { id: 'terminalId', label: 'Terminal ID', minWidth: 110 },
        {
            id: 'noGateIn',
            label: 'No Gate IN',
            minWidth: 110,
            align: 'center',
        },
        {
            id: 'masuk',
            label: 'Waktu Masuk',
            minWidth: 130,
            align: 'center',
        },
        {
            id: 'keluar',
            label: 'Waktu Keluar',
            minWidth: 130,
            align: 'center',
        },
        {
            id: 'conSize',
            label: 'No Container / Size',
            minWidth: 170,
            align: 'center',
        },
        {
            id: 'dokPabean',
            label: 'Dok Pabean',
            minWidth: 120,
            align: 'center',
        },
        {
            id: 'hold',
            label: 'Hold Status',
            minWidth: 120,
            align: 'center',
        },
        {
            id: 'movement',
            label: 'Movement',
            minWidth: 120,
            align: 'center',
        },
        {
            id: 'keterangan',
            label: 'Keterangan',
            minWidth: 120,
            align: 'center',
        },
        {
            id: 'released',
            label: 'Released/Hold By',
            minWidth: 120,
            align: 'center',
        },
        {
            id: 'action',
            label: 'Action',
            minWidth: 130,
            align: 'center',
        },
    ]
    function createData(no, polisi, terminalId, noGateIn, masuk, keluar, conSize, dokPabean, hold, movement, keterangan, released, action) {
        return { no, polisi, terminalId, noGateIn, masuk, keluar, conSize, dokPabean, hold, movement, keterangan, released, action };
    }
    function formatDate(dateString) {
        if (!dateString) {
            return '-';
        }

        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            // console.log(`Invalid date string: ${dateString}`);
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
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('query') || '';
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        try {
            setLoading(true);
            const response = await api.get(`/Container/search?container=${searchQuery}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('response search', response)
            console.log('response data search', response.data)
            if (response.status === 404) {
                setData([]);
            } else {
                setData(response.data);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 401 && error.response.statusText === 'Unauthorized') {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'An error occurred while Search.',
                });
                clearAuth()
                navigate('/login')
            } else if (error.response && error.response.status === 404 && error.response.statusText === 'No containers found matching the search criteria') {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'No containers found matching the search criteria',
                });
            }
            setLoading(false);
        }
    };
    const [releaseReason, setReleaseReason] = useState('');
    const [loadingRelease, setLoadingRelease] = useState(false)
    const handleRelease = async () => {
        const token = localStorage.getItem('token');
        setLoadingRelease(true);
        try {
            const response = await api.put(`/Container/release/${dataDetailViews.id}`, JSON.stringify(releaseReason), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'accept': '*'
                }
            });
            console.log('hehe', response);
            if (response.status === 200) {
                const successMessage = response.data;
                swal({
                    icon: 'success',
                    title: 'Container Released',
                    text: successMessage,
                });
                setOpenViews(false);
            } else if (response.status === 400) {
                swal({
                    icon: 'error',
                    title: 'Failed to Release Container',
                    text: response.data.message || 'Container cannot be released under the current conditions.',
                });
                setOpenViews(false);
            } else if (response.status === 401) {
                swal({
                    icon: 'error',
                    title: 'Unauthorized',
                    text: 'You do not have permission to release the container.',
                });
                setOpenViews(false);
            } else {
                swal({
                    icon: 'error',
                    title: 'Failed to Release Container',
                    text: `Error: ${response.statusText}`,
                });
                setOpenViews(false);
            }
        } catch (error) {
            console.log('Error releasing container:', error);
            let errorMessage = 'An error occurred';
            if (error.response) {
                try {
                    const errorData = JSON.parse(error.response.data);
                    errorMessage = errorData.msg || errorData.message || error.response.data || errorMessage;
                } catch (e) {
                    errorMessage = error.response.data || errorMessage;
                }
            }
            swal({
                icon: 'error',
                title: 'Failed',
                text: errorMessage,
            });
            setOpenViews(false);
        } finally {
            setLoadingRelease(false);
        }
    };
    
    
    // const handleRelease = async () => {
    //     const token = localStorage.getItem('token');
    //     setLoadingRelease(true);
    //     try {
    //         const response = await api.put(`/Container/release/${dataDetailViews.id}`, JSON.stringify(releaseReason), {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 'Content-Type': 'application/json',
    //                 'accept': '*'
    //             }
    //         });

    //         if (response.status === 200) {
    //             const successMessage = response.data;
    //             swal({
    //                 icon: 'success',
    //                 title: 'Container Released',
    //                 text: successMessage,
    //             });
    //         } else if (response.status === 400) {
    //             swal({
    //                 icon: 'error',
    //                 title: 'Failed to Release Container',
    //                 text: response.data.message || 'Container cannot be released under the current conditions.',
    //             });
    //         } else if (response.status === 401) {
    //             swal({
    //                 icon: 'error',
    //                 title: 'Unauthorized',
    //                 text: 'You do not have permission to release the container.',
    //             });
    //         } else {
    //             swal({
    //                 icon: 'error',
    //                 title: 'Failed to Release Container',
    //                 text: `Error: ${response.statusText}`,
    //             });
    //         }

    //         setOpenViews(false);
    //     } catch (error) {
    //         console.log('Error releasing container:', error);
    //         if (error.response && error.response.status === 401 && error.response.statusText === 'Unauthorized') {
    //             swal({
    //                 icon: 'error',
    //                 title: 'Failed',
    //                 text: 'An error occurred or Authorized',
    //             });
    //         } else if (error.response && error.response.status === 400 && error.response.statusText === 'Container already released') {
    //             swal({
    //                 icon: 'error',
    //                 title: 'Failed',
    //                 text: 'Container already released',
    //             });
    //         } else {
    //             swal({
    //                 icon: 'error',
    //                 title: 'Failed',
    //                 text: 'An error occurred',
    //             });
    //         }
    //         setOpenViews(false);
    //     } finally {
    //         setLoadingRelease(false);
    //     }
    // };
    useEffect(() => {
        fetchData();
    }, [searchQuery]);
    const rows = data.map((data, index) => {
        const isImport = data.exportImport === 'I';
        let movement = '';
        if (data.gateOutTime !== null) {
            if (data.exportImport === 'E') {
                movement = 'Gate OUT';
            } else if (data.exportImport === 'I') {
                movement = 'Truck Gate OUT';
            }
        } else {
            movement = 'In Yard';
        }
        const isHoldStatusDisabled = data.holdStatus === 'N' || data.holdStatus === 'R';
        return createData(
            data.tagNumber ? data.tagNumber : '-',
            data.truckNumber ? data.truckNumber : '-',
            data.terminalId ? data.terminalId : '-',
            data.gateNumber ? data.gateNumber : '-',
            formatDate(data.gateInTime ? data.gateInTime : '-'),
            formatDate(data.gateOutTime ? data.gateOutTime : '-'),
            data.containerNumber ? data.containerNumber : '-',
            data.documentType ? data.documentType : '-',
            data.holdStatus ? data.holdStatus : '-',
            movement,
            data.releaseNote ? (data.holdStatus === 'R' ? data.releaseNote : (data.holdStatus === 'H' ? data.holdNote : '-')) : '-',
            data.releaseBy ? data.releaseBy : '-',
            <div className='flex gap-4'>
                <Button onClick={() => handleOpen(data.id)} variant='contained' size='small'>
                    <MenuOpenIcon fontSize='small' />
                </Button>
                {isImport && (
                    <Button
                        // disabled={isHoldStatusDisabled}
                        sx={{
                            backgroundColor: data.holdStatus === 'H' ? 'orange' : data.holdStatus === 'N' || data.holdStatus === 'R' ? 'grey' : 'inherit'
                        }}
                        onClick={() => {
                            if (data.holdStatus === 'N' || data.holdStatus === 'R') {
                                handleOpenHold(data.id);
                            } else {
                                handleOpenViews(data.id);
                            }
                        }}
                        variant='contained'
                        size='small'
                    >
                        {data.holdStatus === 'N' || data.holdStatus === 'R' ? (
                            <HttpsIcon fontSize='small' />
                        ) : (
                            < LockOpenIcon fontSize='small' />
                        )}
                    </Button>
                )}

            </div>
        )
    })
    const [dataDetail, setDataDetail] = useState([]);
    const handleOpen = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`/Container/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
            console.log('response', response)
            console.log('response data', response.data)
            setOpen(true);
            setDataDetail(response.data);
        } catch (error) {
            console.log(error)
        }
    };

    // hold
    const [holdReason, setHoldReason] = useState('');
    const [loadingHold, setLoadingHold] = useState(false)
    const handleHold = async () => {
        const token = localStorage.getItem('token');
        setLoadingHold(true);
        try {
            const response = await api.put(`/Container/hold/${dataDetailHold.id}`, JSON.stringify(holdReason), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'accept': '*'
                }
            });

            if (response.status === 200) {
                const successMessage = response.data;
                swal({
                    icon: 'success',
                    title: 'Container Hold',
                    text: successMessage,
                });
            } else if (response.status === 400) {
                swal({
                    icon: 'error',
                    title: 'Failed to hold Container',
                    text: response.data.message || 'Container cannot be hold under the current conditions.',
                });
            } else if (response.status === 401) {
                swal({
                    icon: 'error',
                    title: 'Unauthorized',
                    text: 'You do not have permission to hold the container.',
                });
            } else {
                swal({
                    icon: 'error',
                    title: 'Failed to hold Container',
                    text: `Error: ${response.statusText}`,
                });
            }

            setOpenHold(false);
        } catch (error) {
            console.log('Error releasing container:', error);
            if (error.response && error.response.status === 401 && error.response.statusText === 'Unauthorized') {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'An error occurred or Authorized',
                });
            } else if (error.response && error.response.status === 400 && error.response.statusText === 'Container already hold') {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'Container already Hold',
                });
            } else {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'An error occurred',
                });
            }
            setOpenHold(false);
        } finally {
            setLoadingHold(false);
        }
    };
    return (
        <>
            <section className="p-6 mx-5 mt-[78px] rounded-lg w-full">
                <Breadcrombs
                    menu={'Search'}
                    submenu={'Search'}
                />
                <div className='mt-5'>
                    <ContentCard>
                        <CustomTable
                            columns={columns}
                            loading={loading}
                            rows={rows}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </ContentCard>
                </div>
            </section>
            {/* release */}
            <Modal
                open={openViews}
                onClose={handleCloseViews}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        sx={{ position: "absolute", top: 5, right: 5 }}
                        onClick={handleCloseViews}
                        aria-label="close"
                    >
                        <CancelIcon color="error" fontSize='large' />
                    </IconButton>
                    <Typography style={{ fontWeight: '600' }} id="modal-modal-title" variant="h5" component="h2">
                        Input Alasan Release
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="flex flex-col">
                            <div className="flex gap-5 mb-5">
                                <p>No.Container</p>
                                <input
                                    type="text"
                                    id="myInput"
                                    name="myInput"
                                    placeholder='No. Container'
                                    disabled
                                    value={dataDetailViews.containerNumber}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex gap-5">
                                <p>Keterangan</p>
                                <input
                                    type="text"
                                    id="myInput"
                                    name="myInput"
                                    onChange={(e) => setReleaseReason(e.target.value)}
                                    placeholder='Keterangan'
                                    className="shadow ms-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                        <div className="flex ms-auto justify-end mt-5">
                            <Button variant='contained' size="small" onClick={handleRelease} disabled={loadingRelease}>
                                {loadingRelease ? <CircularProgress size={20} color="inherit" /> : 'Release'}
                            </Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>

            {/* hold */}
            <Modal
                open={openHold}
                onClose={handleCloseHold}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        sx={{ position: "absolute", top: 5, right: 5 }}
                        onClick={handleCloseHold}
                        aria-label="close"
                    >
                        <CancelIcon color="error" fontSize='large' />
                    </IconButton>
                    <Typography style={{ fontWeight: '600' }} id="modal-modal-title" variant="h5" component="h2">
                        Input Alasan Hold
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="flex flex-col">
                            <div className="flex gap-5 mb-5">
                                <p>No.Container</p>
                                <input
                                    type="text"
                                    id="myInput"
                                    name="myInput"
                                    placeholder='No. Container'
                                    disabled
                                    value={dataDetailHold.containerNumber}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex gap-5">
                                <p>Keterangan</p>
                                <input
                                    type="text"
                                    id="myInput"
                                    name="myInput"
                                    onChange={(e) => setHoldReason(e.target.value)}
                                    placeholder='Keterangan'
                                    className="shadow ms-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                        <div className="flex ms-auto justify-end mt-5">
                            <Button variant='contained' size="small" onClick={handleHold} disabled={loadingHold}>
                                {loadingHold ? <CircularProgress size={20} color="inherit" /> : 'Hold'}
                            </Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
            <ModalDetailGateDashboard
                open={open}
                handleClose={handleClose}
                data={dataDetail}
                name={name}
            // loading={loading}
            />
        </>
    )
}

export default Search
