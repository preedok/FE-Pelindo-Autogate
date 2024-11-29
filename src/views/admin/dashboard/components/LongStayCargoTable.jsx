import React, { useEffect } from "react";
import useLongStayCargo from "../hooks/useLongStayCargo";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const LongStayCargoTable = () => {
  const { getLongStayCargo, loading, error, data } = useLongStayCargo();
  useEffect(() => {
    getLongStayCargo("branchCode", "terminalCode", 10, 0, 1, "", [], []); 
  }, [getLongStayCargo]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const responseData = data?.ResponseData || [];
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No VIN</TableCell>
            <TableCell>Kode Owner</TableCell>
            <TableCell>Nama Owner</TableCell>
            <TableCell>No BL</TableCell>
            <TableCell>YBlock</TableCell>
            <TableCell>YLine</TableCell>
            <TableCell>YSlot</TableCell>
            <TableCell>Nama YBlock</TableCell>
            <TableCell>Tanggal Gate In</TableCell>
            <TableCell>Lama Timbun</TableCell>
            <TableCell>Tanggal On Storage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responseData.length > 0 ? (
            responseData.map((row) => (
              <TableRow key={row.NO_VIN}>
                <TableCell>{row.NO_VIN}</TableCell>
                <TableCell>{row.KD_OWNER}</TableCell>
                <TableCell>{row.NM_OWNER}</TableCell>
                <TableCell>{row.NO_BL}</TableCell>
                <TableCell>{row.YBLOK}</TableCell>
                <TableCell>{row.YLINE}</TableCell>
                <TableCell>{row.YSLOT}</TableCell>
                <TableCell>{row.NM_YBLOK}</TableCell>
                <TableCell>{row.TGL_GATE_IN}</TableCell>
                <TableCell>{row.LAMA_TIMBUN}</TableCell>
                <TableCell>{row.TGL_ON_STORAGE}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={11} align="center">
                No Data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LongStayCargoTable;
