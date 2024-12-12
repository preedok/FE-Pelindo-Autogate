import React, { useEffect, useState } from "react";
import CustomTable from '../../../../components/specialized/CustomTable';
import { Paper, Box, Button, Modal, Typography } from "@mui/material";
import useDashboardStore from "../datas/store";

const TransactionTable = () => {
  const { dashboardTransaction, fetchDashboardTransaction, fetchDashboardTransactionDetail } = useDashboardStore();
  const [lanePosition, setLanePosition] = useState('IKTIN01');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [detailData, setDetailData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchDashboardTransaction(lanePosition);
      setLoading(false);
    };
    fetchData();
  }, [lanePosition, fetchDashboardTransaction]);

  const columns = [
    { id: 'NO_TIKET', label: 'No Tiket', minWidth: 170 },
    { id: 'JUMLAH_VIN', label: 'Jumlah VIN', minWidth: 100 },
    { id: 'NO_UID', label: 'No UID', minWidth: 100 },
    { id: 'KD_TRUCK', label: 'KD Truck', minWidth: 100 },
    { id: 'NOPOL', label: 'No Pol', minWidth: 100 },
    { id: 'NAMA_DOC_BC', label: 'Nama Doc BC', minWidth: 100 },
    { id: 'TGL_GATE_IN', label: 'Tgl Gate In', minWidth: 170 },
    { id: 'DETAIL', label: 'Detail', minWidth: 100, align: 'center' },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleLanePositionChange = async (event) => {
    const newLanePosition = event.target.value;
    setLanePosition(newLanePosition);
    await fetchDashboardTransaction(newLanePosition);
  };

  const handleDetailClick = async (noTiket) => {
    try {
      const data = await fetchDashboardTransactionDetail(noTiket);
      console.log("Fetched transaction detail data:", data);
      setDetailData(data?.ResponseData);
      console.log('hdadad', data?.ResponseData)
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching transaction detail:", error);
      setDetailData([]);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setDetailData([]);
  };

  return (
    <div>
      <Box mb={2}>
        <input
          type="text"
          placeholder="Lane Position"
          value={lanePosition}
          onChange={handleLanePositionChange}
          className="border border-gray-300 ms-auto flex w-1/4 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Box>
      <Paper>
        <CustomTable
          columns={columns}
          loading={loading}
          rows={dashboardTransaction.map(row => ({
            ...row,
            DETAIL: (
              <Button size="small" variant="contained" color="primary" onClick={() => handleDetailClick(row.NO_TIKET)}>
                Detail
              </Button>
            )
          }))}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChange RowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal for Detail View */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1200,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}>
          <Typography variant="h6" component="h2">
            Detail Information
          </Typography>
          {detailData && detailData.length > 0 ? (
            <div>
              {detailData.map((item, index) => (
                <div key={index}>
                  <Typography><strong>NO_VIN:</strong> {item.NO_VIN}</Typography>
                  <Typography><strong>KATEGORI_CAR:</strong> {item.KATEGORI_CAR}</Typography>
                  <Typography><strong>MERK_CAR:</strong> {item.MERK_CAR}</Typography>
                  <Typography><strong>NM_UNIT:</strong> {item.NM_UNIT}</Typography>
                  <Typography><strong>JENIS_CAR:</strong> {item.JENIS_CAR}</Typography>
                  <Typography><strong>KD ONWER:</strong> {item.KD_ONWER}</Typography>
                  <Typography><strong>NO BL:</strong> {item.NO_BL}</Typography>
                  <Typography><strong>NO DOC BC:</strong> {item.NO_DOC_BC}</Typography>
                  <Typography><strong>TGL_DOC_BC:</strong> {item.TGL_DOC_BC}</Typography>
                  <Typography><strong>TIPE_DOC_BC:</strong> {item.TIPE_DOC_BC}</Typography>
                  <Typography><strong>LOAD_PORT:</strong> {item.LOAD_PORT}</Typography>
                  <Typography><strong>NM_LOAD_PORT:</strong> {item.NM_LOAD_PORT}</Typography>
                  <Typography><strong>DISCH_PORT:</strong> {item.DISCH_PORT}</Typography>
                  <Typography><strong>NM_DISCH_PORT:</strong> {item.NM_DISCH_PORT}</Typography>
                  <Typography><strong>FDISCH_PORT:</strong> {item.FDISCH_PORT}</Typography>
                  <Typography><strong>NM_FDISCH_PORT:</strong> {item.NM_FDISCH_PORT}</Typography>
                  <Typography><strong>TGL_GATE_IN:</strong> {item.TGL_GATE_IN}</Typography>
                </div>
              ))}
            </div>
          ) : (
            <Typography>No details available</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default TransactionTable;