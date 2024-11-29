import React, { useEffect, useState } from "react";
import useDashboardTransaction from "../hooks/useDashboardTransaction";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import TransactionDetailTable from "./TransactionDetailTable";

const TransactionTable = () => {
  const { getDashboardTransaction, loading, error, data } =
    useDashboardTransaction();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [open, setOpen] = useState(false); 

  useEffect(() => {
    getDashboardTransaction("IN-1");
  }, [getDashboardTransaction]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const responseData = data?.ResponseData || [];

  const handleRowClick = (ticket) => {
    setSelectedTicket(ticket);
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTicket(null); 
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No Tiket</TableCell>
              <TableCell>Jumlah VIN</TableCell>
              <TableCell>No UID</TableCell>
              <TableCell>Kode Truck</TableCell>
              <TableCell>No Pol</TableCell>
              <TableCell>Nama Doc BC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responseData.length > 0 ? (
              responseData.map((row) => (
                <TableRow
                  key={row.NO_TIKET}
                  onClick={() => handleRowClick(row.NO_TIKET)}
                >
                  <TableCell>{row.NO_TIKET}</TableCell>
                  <TableCell>{row.JUMLAH_VIN}</TableCell>
                  <TableCell>{row.NO_UID}</TableCell>
                  <TableCell>{row.KD_TRUCK}</TableCell>
                  <TableCell>{row.NOPOL}</TableCell>
                  <TableCell>{row.NAMA_DOC_BC}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Transaction Detail */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Transaction Detail</DialogTitle>
        <DialogContent>
          {selectedTicket && (
            <TransactionDetailTable noTiket={selectedTicket} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TransactionTable;
