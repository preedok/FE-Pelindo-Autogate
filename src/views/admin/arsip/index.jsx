import React from "react";
import { Helmet } from "react-helmet";
import { Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ContentCard from "../../../components/common/Card/CardContent";
import CustomTable from '../../../components/specialized/DataTable/CustomTable';
import Breadcrombs from '../../../components/common/Breadcrombs/Breadcrombss';
import ModalDetailGateDashboard from '../../../components/specialized/Modals/ModalDetailGateDashboard';
import ArsipFilter from './components/ArsipFilter';
import ReleaseModal from './components/ReleaseModal';
import HoldModal from './components/HoldModal';
import useArsip from './hooks/useArsip';

const Arsip = () => {
    const {
        gateDevice,
        handleChangeDevice,
        selectedStartDate,
        selectedEndDate,
        handleDateChange,
        handleDateChange1,
        loading,
        handleSearch,
        inputValue,
        handleInputChange,
        exportToExcel,
        columns,
        rows,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        openViews,
        handleOpenViews,
        handleCloseViews,
        dataDetailViews,
        releaseReason,
        setReleaseReason,
        loadingRelease,
        handleRelease,
        openHold,
        handleOpenHold,
        handleCloseHold,
        dataDetailHold,
        holdReason,
        setHoldReason,
        loadingHold,
        handleHold,
        open,
        handleOpen,
        handleClose,
        dataDetail,
        formatDate
    } = useArsip();

    return (
        <>
            <Helmet>
                <title>TPK AUTOGATE Monitoring | Arsip</title>
            </Helmet>
            <section className="p-6 mx-5 mt-[78px] rounded-lg w-full">
                <Breadcrombs menu={'Arsip'} submenu={'Arsip'} />
                <div className='mt-5'>
                    <ContentCard>
                        <ArsipFilter
                            gateDevice={gateDevice}
                            handleChangeDevice={handleChangeDevice}
                            selectedStartDate={selectedStartDate}
                            selectedEndDate={selectedEndDate}
                            handleDateChange={handleDateChange}
                            handleDateChange1={handleDateChange1}
                            loading={loading}
                            handleSearch={handleSearch}
                            formatDate={formatDate}
                        />

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
                            <form className="flex items-center max-w-md ml-auto">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder='Pencarian...'
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </form>
                        </div>

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

                <ReleaseModal
                    open={openViews}
                    handleClose={handleCloseViews}
                    dataDetail={dataDetailViews}
                    reason={releaseReason}
                    setReason={setReleaseReason}
                    loading={loadingRelease}
                    handleRelease={handleRelease}
                />

                <HoldModal
                    open={openHold}
                    handleClose={handleCloseHold}
                    dataDetail={dataDetailHold}
                    reason={holdReason}
                    setReason={setHoldReason}
                    loading={loadingHold}
                    handleHold={handleHold}
                />

                <ModalDetailGateDashboard
                    open={open}
                    handleClose={handleClose}
                    data={dataDetail}
                />
            </section>
        </>
    );
};

export default Arsip;