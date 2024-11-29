import React from "react";
import { Helmet } from "react-helmet";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Tabs, Tab } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { id } from 'date-fns/locale';
import SearchIcon from "@mui/icons-material/Search";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HttpsIcon from '@mui/icons-material/Https';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ModalDetailGateDashboard from '../../../components/specialized/Modals/ModalDetailGateDashboard';
import Breadcrombs from '../../../components/common/Breadcrombs/Breadcrombss';
import ContentCard from "../../../components/common/Card/CardContent";
import CustomTable from './components/CustomTable';
import ModalDetail from './components/ModalDetail';
import ModalDetailAtensi from './components/ModalDetailAtensi';
import ModalAdd from './components/ModalAdd';
import useAtensi from './hooks/useAtensi';
import useAtensiDetail from './hooks/useAtensiDetail';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Box, Typography, CircularProgress } from '@mui/material';
const Atensi = () => {
    const {
        holdFile,
        setHoldFile,
        activeTab,
        handleTabChange,
        data,
        filteredData,
        rows,
        inputValue,
        setInputValue,
        noContainer,
        setNoContainer,
        dokPabean,
        setDokPabean,
        selectedStartDate,
        setSelectedStartDate,
        selectedEndDate,
        setSelectedEndDate,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        loading,
        loadingAdd,
        loadingRelease,
        loadingHold,
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
        handleSearch,
        handleAdd,
        handleRelease,
        handleHold,
        exportToExcel,
        createData,
        formatDate,
        formatDateTime,
        dataDetailViews,
        dataDetail,
        dataDetailHold,
        releaseReason,
        setReleaseReason,
        holdReason,
        setHoldReason,
    } = useAtensi();

    const {
        openDetail,
        selectedDetail,
        loadingDetail,
        handleOpenDetail,
        handleCloseDetail,
    } = useAtensiDetail();
    const columns = [
        { id: 'no', label: 'No', minWidth: 80 },
        { id: 'ei', label: 'E/I', minWidth: 80 },
        { id: 'holdDate', label: 'Hold Date', minWidth: 80 },
        { id: 'noContainer', label: 'No Container', minWidth: 220, align: 'center' },
        { id: 'holdBy', label: 'Hold', minWidth: 80 },
        { id: 'released', label: 'Released', minWidth: 120, align: 'center' },
        { id: 'status', label: 'Status', minWidth: 110, align: 'center' },
        { id: 'statusTerminal', label: 'Status Terminal', minWidth: 220, align: 'center' },
        { id: 'noDokPabean', label: 'No. Dok Pabean', minWidth: 220, align: 'center' },
        { id: 'tglDokPabean', label: 'Tgl. Dok Pabean', minWidth: 170, align: 'center' },
        { id: 'jenisDokPabean', label: 'Jenis Dok Pabean', minWidth: 220, align: 'center' },
        { id: 'note', label: 'Note', minWidth: 120, align: 'center' },
        {
            id: 'action',
            label: 'Action',
            minWidth: 130,
            align: 'center',
            render: (row) => (
                <>
                    {activeTab === 0 && (
                        <Button
                            sx={{
                                color: "white",
                                borderColor: "grey",
                                '&:hover': {
                                    color: "white",
                                    borderColor: "grey",
                                    backgroundColor: 'orange',
                                },
                            }}
                            onClick={() => handleOpenViews(row.id)}
                            variant="contained"
                            size="small"
                            disabled={!!row.releaseBy}
                        >
                            {row.releaseBy ? (
                                <HttpsIcon fontSize='small' />
                            ) : (
                                <LockOpenIcon fontSize='small' />
                            )}
                        </Button>
                    )}
                    {activeTab === 1 && (
                        <Button
                            sx={{
                                color: "blue",
                                borderColor: "blue",
                                '&:hover': {
                                    color: "white",
                                    borderColor: "blue",
                                    backgroundColor: 'lightblue',
                                },
                            }}
                            onClick={() => handleOpenDetail(row.id)}
                            variant="outlined"
                            size="small"
                        >
                            <VisibilityIcon fontSize='small' />
                        </Button>
                    )}
                </>
            )
        }
    ];
    return (
        <>
            <Helmet>
                <title>TPK AUTOGATE Monitoring | Atensi</title>
            </Helmet>
            <section className="p-6 mx-5 mt-[78px] rounded-lg w-full">
                <Breadcrombs
                    menu={'Atensi'}
                    submenu={'Atensi'}
                />
                <div className='mt-5'>
                    <ContentCard>
                        <Tabs value={activeTab} onChange={handleTabChange}>
                            <Tab label="Active" value={0} />
                            <Tab label="Arsip" value={1} />
                        </Tabs>

                        <div className="flex item-center gap-5 flex-col sm:flex-row w-full  mt-5 ">
                            <h5 className="font-bold me-28">No. Container</h5>
                            <TextField
                                type="text"
                                label={'No. Container'}
                                size="small"
                                value={noContainer}
                                onChange={(e) => setNoContainer(e.target.value)}
                                sx={{ backgroundColor: "white", width: "250px" }}
                            />
                        </div>

                        <div className="flex item-center gap-5 flex-col sm:flex-row w-full  mt-5 ">
                            <h5 className="font-bold me-24">No. Dok Pabean</h5>
                            <TextField
                                type="text"
                                label={'No. Dok Pabean'}
                                size="small"
                                value={dokPabean}
                                onChange={(e) => setDokPabean(e.target.value)}
                                sx={{ backgroundColor: "white", width: "250px" }}
                            />
                        </div>

                        {activeTab === 1 && (
                            <div className="flex item-center gap-5 flex-col sm:flex-row w-full  mt-5 ">
                                <h5 className="font-bold me-[92px]">Tgl. Dok Pabean</h5>
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={id}>
                                    <DateTimePicker
                                        label="Tanggal Mulai"
                                        value={selectedStartDate}
                                        onChange={(date) => setSelectedStartDate(date)}
                                        renderInput={(params) => <TextField {...params} size="small" sx={{ maxWidth: '250px' }} />}
                                        format="dd-MM-yyyy HH:mm"
                                        ampm={false}
                                    />
                                    <DateTimePicker
                                        label="Tanggal Akhir"
                                        value={selectedEndDate}
                                        onChange={(date) => setSelectedEndDate(date)}
                                        renderInput={(params) => <TextField {...params} size="small" sx={{ maxWidth: '250px' }} />}
                                        format="dd-MM-yyyy HH:mm"
                                        ampm={false}
                                    />
                                </LocalizationProvider>
                            </div>
                        )}

                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleSearch}
                            sx={{ backgroundColor: "#0F2167", height: "38px", mt: 2 }}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin me-2"></div>
                                </div>
                            ) : (
                                <SearchIcon />
                            )}
                            Cari
                        </Button>

                        <div className="flex my-2 justify-between">
                            <Button
                                variant="outlined"
                                style={{ color: "grey", borderColor: "grey", height: '35px' }}
                                size="small"
                                onClick={exportToExcel}
                            >
                                <FileUploadIcon />
                                Export
                            </Button>
                            {activeTab === 0 && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    className="gap-1 px-4 ml-auto"
                                    onClick={handleOpenAdd}
                                    sx={{ backgroundColor: "green", height: "38px" }}
                                >
                                    <AddCircleOutlineIcon /> Tambah
                                </Button>
                            )}
                        </div>

                        {loading ? (
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="200px">
                                <CircularProgress style={{ marginBottom: '16px' }} />
                                <Typography>Loading data...</Typography>
                            </Box>
                        ) : rows.length === 0 ? (
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="200px">
                                <SearchOffIcon style={{ fontSize: 60, color: 'grey', marginBottom: '16px' }} />
                                <Typography>No data available. Try adjusting your search criteria.</Typography>
                            </Box>
                        ) : (
                            <CustomTable
                                columns={columns}
                                loading={loading}
                                rows={rows}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                handleChangePage={handleChangePage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        )}
                    </ContentCard>
                </div>
                <ModalAdd
                    open={openAdd}
                    handleClose={handleCloseAdd}
                    handleAdd={handleAdd}
                    loadingAdd={loadingAdd}
                    documentNumber={documentNumber}
                    setdocumentNumber={setdocumentNumber}
                    documentType={documentType}
                    setdocumentType={setdocumentType}
                    documentDate={documentDate}
                    setdocumentDate={setdocumentDate}
                    // isActive={isActive}
                    // setisActive={setisActive}
                    reason={reason}
                    setIsReason={setIsReason}
                    containerNumber={containerNumber}
                    setContainerNumber={setContainerNumber}
                    exportImport={exportImport}
                    setExportImport={setExportImport}
                    holdFile={holdFile}
                    setHoldFile={setHoldFile}
                />
                <ModalDetail
                    open={openViews}
                    handleClose={handleCloseViews}
                    data={dataDetailViews}
                    title="Input Alasan Release"
                    onSubmit={handleRelease}
                    loading={loadingRelease}
                    reason={releaseReason}
                    setReason={setReleaseReason}
                />
                <ModalDetail
                    open={openHold}
                    handleClose={handleCloseHold}
                    data={dataDetailHold}
                    title="Input Alasan Hold"
                    onSubmit={handleHold}
                    loading={loadingHold}
                    reason={holdReason}
                    setReason={setHoldReason}
                />
                <ModalDetailGateDashboard
                    open={open}
                    handleClose={handleClose}
                    data={dataDetail}
                />
                <ModalDetailAtensi
                    open={openDetail}
                    handleClose={handleCloseDetail}
                    data={selectedDetail}
                    loading={loadingDetail}
                    activeTab={activeTab}
                />
            </section>
        </>
    );
};

export default Atensi;