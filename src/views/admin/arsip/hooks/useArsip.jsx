import { useState, useEffect } from 'react';
import { format, parseISO, startOfDay, endOfDay } from 'date-fns';
import { id } from 'date-fns/locale';
import api from '../../../../service/api';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from "../../../../utils/token";
import swal from "sweetalert";
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const useArsip = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gateDevice, setGateDevice] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState(startOfDay(new Date()));
    const [selectedEndDate, setSelectedEndDate] = useState(endOfDay(new Date()));
    const [inputValue, setInputValue] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [openViews, setOpenViews] = useState(false);
    const [openHold, setOpenHold] = useState(false);
    const [dataDetail, setDataDetail] = useState({});
    const [dataDetailViews, setDataDetailViews] = useState({});
    const [dataDetailHold, setDataDetailHold] = useState({});
    const [releaseReason, setReleaseReason] = useState('');
    const [holdReason, setHoldReason] = useState('');
    const [loadingRelease, setLoadingRelease] = useState(false);
    const [loadingHold, setLoadingHold] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        
        setSelectedStartDate(startOfDay);
        setSelectedEndDate(endOfDay);
    }, []);

    const handleChangeDevice = (event) => {
        setGateDevice(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedStartDate(date ? startOfDay(date) : null);
    };

    const handleDateChange1 = (date) => {
        setSelectedEndDate(date ? endOfDay(date) : null);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        try {
            setLoading(true);
            const isoStartDate = selectedStartDate.toISOString();
            const isoEndDate = selectedEndDate.toISOString();
            const response = await api.get(
                `/Container/datefilter?EI=${gateDevice}&startDate=${isoStartDate}&endDate=${isoEndDate}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
            if (error.response && error.response.status === 401 && error.response.statusText === 'Unauthorized') {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'An error occurred while Arsip. or Unauthorized access.',
                });
                clearAuth();
                navigate('/login');
            } else {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'An error occurred while Arsip.',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchData();
    };

    useEffect(() => {
        if (Array.isArray(data)) {
            const regEx = new RegExp(inputValue, "i");
            const results = data.filter((item) => {
                return (
                    regEx.test(item.tagNumber) ||
                    regEx.test(item.truckNumber) ||
                    regEx.test(item.container) ||
                    regEx.test(item.terminalId) ||
                    regEx.test(item.gateNumber) ||
                    regEx.test(item.containerNumber) ||
                    regEx.test(item.documentType)
                );
            });
            setFilteredData(results);
        } else {
            console.error("Data is not an array:", data);
            setFilteredData([]);
        }
    }, [inputValue, data]);

    const formatDate = (dateString) => {
        if (!dateString) {
            return '-';
        }

        try {
            const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
            return format(date, 'dd-MM-yyyy HH:mm', { locale: id });
        } catch (error) {
            console.error('Error parsing date:', error);
            return '-';
        }
    };

    const calculateMovement = (row) => {
        if (row.gateOutTime !== null) {
            return row.exportImport === 'E' ? 'Gate OUT' : 'Truck Gate OUT';
        } else {
            return 'In Yard';
        }
    };

    const exportToExcel = () => {
        const fileName = 'arsip.xlsx';
        const exportData = filteredData.map((row) => ({
            tagNumber: row.tagNumber || '-',
            truckNumber: row.truckNumber || '-',
            terminalId: row.terminalId || '-',
            gateNumber: row.gateNumber || '-',
            gateInTime: formatDate(row.gateInTime),
            gateOutTime: formatDate(row.gateOutTime),
            containerNumber: row.containerNumber || '-',
            documentType: row.documentType || '-',
            holdStatus: row.holdStatus || '-',
            movement: calculateMovement(row),
            keterangan: row.keterangan || '-'
        }));
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, fileName);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpen = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`/Container/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setOpen(true);
            setDataDetail(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => setOpen(false);

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
            console.log(error);
        }
    };

    const handleCloseViews = () => setOpenViews(false);

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
            console.log(error);
        }
    };

    const handleCloseHold = () => setOpenHold(false);

    const handleRelease = async () => {
        const token = localStorage.getItem('token');
        setLoadingRelease(true);
        try {
            const response = await api.put(`/Container/release/${dataDetailViews.id}`, JSON.stringify(releaseReason), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                }
            });
            if (response.status === 200) {
                swal({
                    icon: 'success',
                    title: 'Container Released',
                    text: response.data,
                });
                setOpenViews(false);
                fetchData();
            } else {
                swal({
                    icon: 'error',
                    title: 'Failed to Release Container',
                    text: response.data.message || 'An error occurred',
                });
            }
        } catch (error) {
            console.error('Error releasing container:', error);
            swal({
                icon: 'error',
                title: 'Failed',
                text: error.response?.data || 'An error occurred',
            });
        } finally {
            setLoadingRelease(false);
        }
    };

    const handleHold = async () => {
        const token = localStorage.getItem('token');
        setLoadingHold(true);
        try {
            const response = await api.put(`/Container/hold/${dataDetailHold.id}`, JSON.stringify(holdReason), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                }
            });
            if (response.status === 200) {
                swal({
                    icon: 'success',
                    title: 'Container Hold',
                    text: response.data,
                });
                setOpenHold(false);
                fetchData();
            } else {
                swal({
                    icon: 'error',
                    title: 'Failed to Hold Container',
                    text: response.data.message || 'An error occurred',
                });
            }
        } catch (error) {
            console.error('Error holding container:', error);
            swal({
                icon: 'error',
                title: 'Failed',
                text: error.response?.data || 'An error occurred',
            });
        } finally {
            setLoadingHold(false);
        }
    };

    const columns = [
        { id: 'no', label: 'No Tag', minWidth: 80 },
        { id: 'polisi', label: 'No Polisi', minWidth: 80 },
        { id: 'terminalId', label: 'Terminal ID', minWidth: 110 },
        { id: 'noGateIn', label: 'No Gate IN', minWidth: 110, align: 'center' },
        { id: 'masuk', label: 'Waktu Masuk', minWidth: 130, align: 'center' },
        { id: 'keluar', label: 'Waktu Keluar', minWidth: 130, align: 'center' },
        { id: 'conSize', label: 'No Container / Size', minWidth: 170, align: 'center' },
        { id: 'dokPabean', label: 'Dok Pabean', minWidth: 120, align: 'center' },
        { id: 'hold', label: 'Hold Status', minWidth: 120, align: 'center' },
        { id: 'movement', label: 'Movement', minWidth: 120, align: 'center' },
        { id: 'keterangan', label: 'Keterangan', minWidth: 120, align: 'center' },
        { id: 'released', label: 'Released By', minWidth: 120, align: 'center' },
        { id: 'action', label: 'Action', minWidth: 130, align: 'center' },
    ];

    const rows = filteredData.map((data) => ({
        no: data.tagNumber || '-',
        polisi: data.truckNumber || '-',
        terminalId: data.terminalId || '-',
        noGateIn: data.gateNumber || '-',
        masuk: formatDate(data.gateInTime),
        keluar: formatDate(data.gateOutTime),
        conSize: data.containerNumber || '-',
        dokPabean: data.documentType || '-',
        hold: data.holdStatus || '-',
        movement: calculateMovement(data),
        keterangan: data.holdStatus === 'R' ? data.releaseNote : (data.holdStatus === 'H' ? data.holdNote : '-'),
        released: data.releaseBy || '-',
        // action: data.id
        action: (
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleOpen(data.id)} 
            >
                <RemoveRedEyeIcon fontSize='small' />
            </Button>
        ),
    }));

    return {
        data,
        loading,
        gateDevice,
        selectedStartDate,
        selectedEndDate,
        inputValue,
        filteredData,
        page,
        rowsPerPage,
        open,
        openViews,
        openHold,
        dataDetail,
        dataDetailViews,
        dataDetailHold,
        releaseReason,
        holdReason,
        loadingRelease,
        loadingHold,
        handleChangeDevice,
        handleDateChange,
        handleDateChange1,
        handleInputChange,
        handleSearch,
        formatDate,
        exportToExcel,
        handleChangePage,
        handleChangeRowsPerPage,
        handleOpen,
        handleClose,
        handleOpenViews,
        handleCloseViews,
        handleOpenHold,
        handleCloseHold,
        handleRelease,
        handleHold,
        setReleaseReason,
        setHoldReason,
        columns,
        rows
    };
};

export default useArsip;