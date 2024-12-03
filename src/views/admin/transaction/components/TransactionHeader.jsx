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
            <TableRow style={{ backgroundColor: "#CAF4FF" }}>
              <TableCell>No Pol</TableCell>
              <TableCell>No Gate In</TableCell>
              <TableCell>Tanggal Gate In</TableCell>
              <TableCell>No Gate Out</TableCell>
              <TableCell>Tanggal Gate Out</TableCell>
              <TableCell>No Tiket</TableCell>
              <TableCell>Jumlah VIN</TableCell>
              <TableCell>Tipe Doc BC</TableCell>
              <TableCell>Nama Doc BC</TableCell>
              <TableCell>Keterangan</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.NO_TIKET}>
                <TableCell>{transaction.NOPOL}</TableCell>
                <TableCell>{transaction.NO_GATE_IN}</TableCell>
                <TableCell>{transaction.TGL_GATE_IN}</TableCell>
                <TableCell>{transaction.NO_GATE_OUT || "N/A"}</TableCell>
                <TableCell>{transaction.TGL_GATE_OUT || "N/A"}</TableCell>
                <TableCell>{transaction.NO_TIKET}</TableCell>
                <TableCell>{transaction.JUMLAH_VIN}</TableCell>
                <TableCell>{transaction.TIPE_DOC_BC || "N/A"}</TableCell>
                <TableCell>{transaction.NAMA_DOC_BC || "N/A"}</TableCell>
                <TableCell>{transaction.KETERANGAN || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
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
