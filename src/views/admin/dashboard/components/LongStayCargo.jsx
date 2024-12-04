import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import useStore from "../datas/store";

const LongStayCargo = () => {
  const { longStayCargo, fetchLongStayCargo } = useStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const currentRows = longStayCargo.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  useEffect(() => {
    fetchLongStayCargo();
  }, [fetchLongStayCargo]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#CAF4FF" }}>
            <TableCell>No VIN</TableCell>
            <TableCell>KD Owner</TableCell>
            <TableCell>Nama Owner</TableCell>
            <TableCell>No BL</TableCell>
            <TableCell>Y Blok</TableCell>
            <TableCell>Y Line</TableCell>
            <TableCell>Y Slot</TableCell>
            <TableCell>Nama Y Blok</TableCell>
            <TableCell>Tgl Gate In</TableCell>
            <TableCell>Lama Timbun</TableCell>
            <TableCell>Tgl On Storage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRows.length > 0 ? (
            currentRows.map((cargo) => (
              <TableRow key={cargo.NO_VIN}>
                <TableCell>{cargo.NO_VIN}</TableCell>
                <TableCell>{cargo.KD_OWNER}</TableCell>
                <TableCell>{cargo.NM_OWNER}</TableCell>
                <TableCell>{cargo.NO_BL}</TableCell>
                <TableCell>{cargo.YBLOK}</TableCell>
                <TableCell>{cargo.YLINE}</TableCell>
                <TableCell>{cargo.YSLOT}</TableCell>
                <TableCell>{cargo.NM_YBLOK}</TableCell>
                <TableCell>
                  {cargo.TGL_GATE_IN ? cargo.TGL_GATE_IN : "N/A"}
                </TableCell>
                <TableCell>{cargo.LAMA_TIMBUN}</TableCell>
                <TableCell>{cargo.TGL_ON_STORAGE}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={11} style={{ textAlign: "center" }}>
                No Data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={longStayCargo.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default LongStayCargo;
