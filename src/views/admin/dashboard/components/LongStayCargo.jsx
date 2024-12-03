// src/views/dashboard/components/LongStayCargo.jsx
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import useStore from "../datas/store";

const LongStayCargo = () => {
  const { longStayCargo, fetchLongStayCargo } = useStore();

  useEffect(() => {
    fetchLongStayCargo();
  }, [fetchLongStayCargo]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No VIN</TableCell>
            <TableCell>Nama Owner</TableCell>
            <TableCell>Lama Timbun</TableCell>
            <TableCell>Nama Yblok</TableCell>
            <TableCell>No BL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {longStayCargo.length > 0 ? (
            longStayCargo.map((cargo) => (
              <TableRow key={cargo.NO_VIN}>
                <TableCell>{cargo.NO_VIN}</TableCell>
                <TableCell>{cargo.NAMA_OWNER}</TableCell>
                <TableCell>{cargo.LAMA_TIMBUN}</TableCell>
                <TableCell>{cargo.NAMA_YBLOK}</TableCell>
                <TableCell>{cargo.NO_BL}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: "center" }}>
                No Data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LongStayCargo;
