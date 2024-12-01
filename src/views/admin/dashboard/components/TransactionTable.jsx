import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TransactionTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ticket Number</TableCell>
            <TableCell>Vehicle Count</TableCell>
            <TableCell>UID Number</TableCell>
            <TableCell>Truck Code</TableCell>
            <TableCell>License Plate</TableCell>
            <TableCell>Document Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.NO_TIKET}</TableCell>
              <TableCell>{transaction.JUMLAH_VIN}</TableCell>
              <TableCell>{transaction.NO_UID}</TableCell>
              <TableCell>{transaction.KD_TRUCK}</TableCell>
              <TableCell>{transaction.NOPOL}</TableCell>
              <TableCell>{transaction.NAMA_DOC_BC}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
