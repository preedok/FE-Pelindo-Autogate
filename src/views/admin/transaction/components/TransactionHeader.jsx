
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import useTransactionStore from "../datas/store";
import TransactionDetail from "./TransactionDetail";

const TransactionHeader = () => {
  const { transactionHeader, fetchHeader } = useTransactionStore();
  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchHeader();
  }, [fetchHeader]);
  const handleOpen = (transaction) => {
    setSelectedTransaction(transaction);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedTransaction(null);
  };
  const filteredTransactions = transactionHeader.filter((transaction) =>
    transaction.NO_TIKET.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search by No Tiket"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No Tiket</TableCell>
              <TableCell>Tanggal Gate In</TableCell>
              <TableCell>Jumlah VIN</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.NO_TIKET}>
                <TableCell>{transaction.NO_TIKET}</TableCell>
                <TableCell>{transaction.TGL_GATE_IN}</TableCell>
                <TableCell>{transaction.JUMLAH_VIN}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleOpen(transaction)}
                  >
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            padding: "20px",
            backgroundColor: "white",
            margin: "auto",
            marginTop: "100px",
            width: "80%",
            borderRadius: "8px",
          }}
        >
          <TransactionDetail
            noTiket={selectedTransaction?.NO_TIKET}
            onClose={handleClose}
          />
        </div>
      </Modal>
    </div>
  );
};

export default TransactionHeader;
