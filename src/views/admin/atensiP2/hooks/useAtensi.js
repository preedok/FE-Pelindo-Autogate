import { useState, useEffect } from 'react';
import api from '../../../../service/api';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../../../../utils/token';
import swal from 'sweetalert';

const useAtensi = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [openViews, setOpenViews] = useState(false);
    const [dataDetailViews, setDataDetailViews] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const navigate = useNavigate();
    const [noContainer, setNoContainer] = useState('');
    const [dokPabean, setDokPabean] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [dataDetail, setDataDetail] = useState([]);
    const [open, setOpen] = useState(false);
    const [openHold, setOpenHold] = useState(false);
    const [dataDetailHold, setDataDetailHold] = useState([]);
    const [releaseReason, setReleaseReason] = useState('');
    const [loadingRelease, setLoadingRelease] = useState(false);
    const [holdReason, setHoldReason] = useState('');
    const [loadingHold, setLoadingHold] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [documentNumber, setdocumentNumber] = useState('');
    const [documentType, setdocumentType] = useState('');
    const [documentDate, setdocumentDate] = useState('');
    const [isActive, setisActive] = useState(0);
    const [reason, setIsReason] = useState('');
    const [containerNumber, setContainerNumber] = useState('');
    const [exportImport, setExportImport] = useState('E');
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [holdFile, setHoldFile] = useState(null);
    useEffect(() => {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        
        setSelectedStartDate(startOfDay);
        setSelectedEndDate(endOfDay);
    }, []);

    const fetchData = async (tabValue = activeTab) => {
        const token = localStorage.getItem('token');
        try {
            setLoading(true);
            let url = `/AtensiP2?container=${noContainer}&docno=${dokPabean}`;
            
            if (tabValue === 1) { // Arsip tab
                const isoStartDate = selectedStartDate.toISOString();
                const isoEndDate = selectedEndDate.toISOString();
                url += `&startDate=${isoStartDate}&endDate=${isoEndDate}&isActive=0`; // Assuming 0 represents archived status
            } 

            const response = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(response.data);
            filterData(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
            if (error.response && error.response.status === 401 && error.response.statusText === 'Unauthorized') {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'An error occurred while fetching Atensi data. Unauthorized access.',
                });
                clearAuth();
                navigate('/login');
            } else {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'An error occurred while fetching Atensi data.',
                });
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

        setSelectedStartDate(startOfDay);
        setSelectedEndDate(endOfDay);
        fetchData(activeTab);
    }, []); 

    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab]);
    const handleSearch = () => {
        fetchData();
    };

    useEffect(() => {
        filterData();
    }, [inputValue, data]);

    const handleOpenViews = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`/AtensiP2/${id}`, {
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

    const handleOpen = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`/AtensiP2/${id}`, {
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

    const handleOpenHold = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`/AtensiP2/${id}`, {
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
            const response = await api.patch(`/AtensiP2/release/${dataDetailViews.id}`, JSON.stringify({ReleaseNote:releaseReason}), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'accept': '*'
                }
            });

            if (response.status === 200 || response.status === 204) {
                swal({
                    icon: 'success',
                    title: 'Container Released',
                    text: 'The container was released successfully.',
                });
                setOpenViews(false);
                handleSearch();  // Refresh data after release
            } else if (response.status === 400) {
                swal({
                    icon: 'error',
                    title: 'Failed to Release Container',
                    text: response.data.message || 'Container cannot be released under the current conditions.',
                });
            } else if (response.status === 401) {
                swal({
                    icon: 'error',
                    title: 'Unauthorized',
                    text: 'You do not have permission to release the container.',
                });
            } else {
                swal({
                    icon: 'error',
                    title: 'Failed to Release Container',
                    text: `Error: ${response.statusText}`,
                });
            }
        } catch (error) {
            console.error('Error releasing container:', error);
            swal({
                icon: 'error',
                title: 'Failed to Release Container',
                text: 'An error occurred while releasing the container.',
            });
        } finally {
            setLoadingRelease(false);
            setOpenViews(false);
        }
    };

    const handleHold = async () => {
        const token = localStorage.getItem('token');
        setLoadingHold(true);
        try {
            const response = await api.put(`/AtensiP2/hold/${dataDetailHold.id}`, JSON.stringify(holdReason), {
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
                fetchData(); // Refresh data after hold
            } else if (response.status === 400) {
                swal({
                    icon: 'error',
                    title: 'Failed to hold Container',
                    text: response.data.message || 'Container cannot be held under the current conditions.',
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
        } catch (error) {
            console.error('Error holding container:', error);
            swal({
                icon: 'error',
                title: 'Failed to Hold Container',
                text: 'An error occurred while holding the container.',
            });
        } finally {
            setLoadingHold(false);
            setOpenHold(false);
        }
    };

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    function formatDateServer(dateString) {
        if (!dateString) {
            return '-';
        }

        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return '-';
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    }

    const handleAdd = async () => {
        const token = localStorage.getItem('token');
        setLoadingAdd(true);

        const formattedDocumentDate = formatDateServer(documentDate);

        const formData = new FormData();
        formData.append('documentNumber', documentNumber);
        formData.append('documentType', documentType);
        formData.append('documentDate', formattedDocumentDate);
        // formData.append('isActive', isActive);
        formData.append('holdNote', reason);
        formData.append('containerNumber', containerNumber);
        formData.append('exportImport', exportImport);
        if (holdFile) {
            formData.append('holdFile', holdFile);
        }

        try {
            const response = await api.post(`/AtensiP2`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                    'accept': '*/*'
                }
            });
            
            if (response.status === 201 || response.status === 200) {
                const successMessage = response.data;
                swal({
                    icon: 'success',
                    title: 'Container Atensi P2',
                    text: successMessage,
                });
                handleSearch();  // Refresh data after adding
            } else if (response.status === 400) {
                const errorMessage = response.data.message || response.message;
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: errorMessage,
                });
            } else if (response.status === 401) {
                swal({
                    icon: 'error',
                    title: 'Unauthorized',
                    text: 'You do not have permission to Atensi P2 the container.',
                });
            } else {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: `Error: ${response.statusText}`,
                });
            }
        } catch (error) {
            console.error('Error hold container:', error);
            if (error.response && error.response.data && error.response.data.detail) {
                const detail = JSON.parse(error.response.data.detail.message);
                const errorMessage = detail.msg || 'An error occurred while Atensi.';
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: errorMessage,
                });
            } else {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'An error occurred while Atensi.',
                });
            }
        } finally {
            setLoadingAdd(false);
            setOpenAdd(false);
        }
    };
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(Number(event.target.value));
        setPage(0);
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setPage(0); // Reset page when changing tabs
        fetchData(newValue); // Fetch data for the new tab
    };
    const exportToExcel = () => {
        const fileName = 'atensi.xlsx';
        const exportData = filteredData.map((row) => ({
            exportorimport: row.exportImport || '-',
            hold: row.holdBy || '-',
            released: row.releaseBy || '-',
            status: row.isActive === 1 ? 'Active' : 'Non Active',
            statusTerminal: row.TerminalResponse || '-',
            noDokPabean: row.documentNumber || '-',
            tglDokPabean: row.documentDate ? formatDate(new Date(row.documentDate)) : '-',
            jenisDokPabean: row.documentType || '-',
            containerNumber: row.containerNumber || '-',
            noContainer: row.noContainer || '-',
            note: row.reason || '-'
        }));
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, fileName);
    };
    const [rows, setRows] = useState([]);

    // Add this function to create rows
    const createData = (no, ei, holdDate, noContainer, holdBy, released, status, statusTerminal, noDokPabean, tglDokPabean, jenisDokPabean, note, action) => {
        return { no, ei, holdDate, noContainer, holdBy, released, status, statusTerminal, noDokPabean, tglDokPabean, jenisDokPabean, note, action };
    };

    // Add this function to format date
    const formatDate = (dateString) => {
        if (!dateString || dateString === '-') {
            return '-';
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return '-';
        }
        return new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(date);
    };

    // Add this function to format date and time
    const formatDateTime = (dateString) => {
        if (!dateString || dateString === '-') {
            return '-';
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return '-';
        }
        return new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(date);
    };

    // Modify the filterData function to create rows
    const filterData = (dataToFilter = data) => {
        if (Array.isArray(dataToFilter)) {
            const regEx = new RegExp(inputValue, "i");
            const results = dataToFilter.filter((item) => {
                return (
                    regEx.test(item.exportImport) ||
                    regEx.test(item.holdBy) ||
                    regEx.test(item.releaseBy) ||
                    regEx.test(item.TerminalResponse) ||
                    regEx.test(item.documentType) ||
                    regEx.test(item.containerNumber) ||
                    regEx.test(item.reason)
                );
            });
            setFilteredData(results);
            
            setRows(createRows(results));
        } else {
            console.error("Data is not an array:", dataToFilter);
            setFilteredData([]);
            setRows([]);
        }
    };

    const createRows = (data) => {
        return data.map((item, index) => ({
            no: index + 1,
            ei: item.exportImport || '-',
            holdDate: formatDateTime(item.holdDate || '-'),
            noContainer: item.containerNumber || '-',
            holdBy: item.inputBy || '-',
            released: item.releaseBy || '-',
            status: item.isActive === 1 ? 'Active' : 'Non Active',
            statusTerminal: item.TerminalResponse || '-',
            noDokPabean: item.documentNumber || '-',
            tglDokPabean: formatDate(item.documentDate || '-'),
            jenisDokPabean: item.documentType || '-',
            note: item.reason || '-',
            id: item.id,
            releaseBy: item.releaseBy
        }));
    };

    return {
        // hold file
        holdFile,
        setHoldFile,

        // Tab state
        activeTab,
        handleTabChange,

        // Data and filtering
        data,
        filteredData,
        rows,
        inputValue,
        setInputValue,

        // Container and document inputs
        noContainer,
        setNoContainer,
        dokPabean,
        setDokPabean,

        // Date range
        selectedStartDate,
        setSelectedStartDate,
        selectedEndDate,
        setSelectedEndDate,

        // Table pagination
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,

        // Loading states
        loading,
        loadingAdd,
        loadingRelease,
        loadingHold,

        // Modal states and handlers
        open,
        handleOpen,
        handleClose,
        openAdd,
        handleOpenAdd,
        handleCloseAdd,
        openViews,
        handleOpenViews,
        handleCloseViews,
        openHold,
        handleOpenHold,
        handleCloseHold,

        // Form inputs for adding/editing
        documentNumber,
        setdocumentNumber,
        documentType,
        setdocumentType,
        documentDate,
        setdocumentDate,
        // isActive,
        // setisActive,
        reason,
        setIsReason,
        containerNumber,
        setContainerNumber,
        exportImport,
        setExportImport,

        // Action handlers
        handleSearch,
        handleAdd,
        handleRelease,
        handleHold,

        // Utility functions
        exportToExcel,
        createData,
        formatDate,
        formatDateTime,

        // Additional data
        dataDetailViews,
        dataDetail,
        dataDetailHold,
        releaseReason,
        setReleaseReason,
        holdReason,
        setHoldReason,
    };
};

export default useAtensi;