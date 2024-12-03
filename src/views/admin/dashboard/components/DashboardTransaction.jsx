// src/views/dashboard/components/DashboardTransaction.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import Close icon
import useStore from "../datas/store";
import DashboardTransactionDetail from "./DashboardTransactionDetail"; // Import the detail component

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DashboardTransaction = () => {
  const { dashboardTransaction, fetchDashboardTransaction } = useStore();
  const [lanePosition, setLanePosition] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  useEffect(() => {
    fetchDashboardTransaction("IKTIN01");
  }, [fetchDashboardTransaction]);

  const handleSearch = () => {
    fetchDashboardTransaction(lanePosition);
  };

  const handleDetailClick = (noTiket) => {
    setSelectedTicket(noTiket);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedTicket(null);
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }} className="flex">
        <TextField
          label="Lane Position"
          variant="outlined"
          fullWidth
          value={lanePosition}
          onChange={(e) => setLanePosition(e.target.value)}
          size="small"
          sx={{ mr: 1 }}
        />
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{backgroundColor:'#CAF4FF'}}>
              <TableCell>No Tiket</TableCell>
              <TableCell>Jumlah VIN</TableCell>
              <TableCell>No UID</TableCell>
              <TableCell>KD Truck</TableCell>
              <TableCell>No Pol</TableCell>
              <TableCell>Nama Doc BC</TableCell>
              <TableCell>Tgl Gate In</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dashboardTransaction && dashboardTransaction.length > 0 ? (
              dashboardTransaction.map((transaction) => (
                <TableRow key={transaction.NO_TIKET}>
                  <TableCell>{transaction.NO_TIKET}</TableCell>
                  <TableCell>{transaction.JUMLAH_VIN}</TableCell>
                  <TableCell>{transaction.NO_UID}</TableCell>
                  <TableCell>{transaction.KD_TRUCK}</TableCell>
                  <TableCell>{transaction.NOPOL}</TableCell>
                  <TableCell>{transaction.NAMA_DOC_BC}</TableCell>
                  <TableCell>{transaction.TGL_GATE_IN}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() => handleDetailClick(transaction.NO_TIKET)} // Open detail modal
                    >
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} style={{ textAlign: "center" }}>
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Transaction Details */}
      <Modal
        open={openDetailModal}
        onClose={handleCloseDetailModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 id="modal-title">Transaction Details</h2>
            <IconButton onClick={handleCloseDetailModal} aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>
          <div id="modal-description">
            {selectedTicket && (
              <DashboardTransactionDetail noTiket={selectedTicket} />
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DashboardTransaction;
