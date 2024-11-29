import React, { useEffect } from "react";
import useTransactionDetail from "../hooks/useTransactionDetail";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TransactionDetailTable = ({ noTiket }) => {
  const { getTransactionDetail, loading, error, data } = useTransactionDetail();

  useEffect(() => {
    if (noTiket) {
      getTransactionDetail(
        "branchCode",
        "terminalCode",
        noTiket,
        10,
        0,
        1,
        "",
        [],
        []
      ); 
    }
  }, [getTransactionDetail, noTiket]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const responseData = data?.ResponseData?.[0]?.ResponseData || [];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No VIN</TableCell>
            <TableCell>Kategori Mobil</TableCell>
            <TableCell>Merk Mobil</TableCell>
            <TableCell>Nama Unit</TableCell>
            <TableCell>Jenis Mobil</TableCell>
            <TableCell>Kode Owner</TableCell>
            <TableCell>Nama Owner</TableCell>
            <TableCell>No BL</TableCell>
            <TableCell>No Dok BC</TableCell>
            <TableCell>Tanggal Dok BC</TableCell>
            <TableCell>Tipe Dok BC</TableCell>
            <TableCell>Load Port</TableCell>
            <TableCell>Nama Load Port</TableCell>
            <TableCell>Discharge Port</TableCell>
            <TableCell>Nama Discharge Port</TableCell>
            <TableCell>FDISCH Port</TableCell>
            <TableCell>Nama FDISCH Port</TableCell>
            <TableCell>Tanggal Gate In</TableCell>
            <TableCell>No Gate In</TableCell>
            <TableCell>Tanggal Gate Out</TableCell>
            <TableCell>No Gate Out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responseData.length > 0 ? (
            responseData.map((row) => (
              <TableRow key={row.NO_VIN}>
                <TableCell>{row.NO_VIN}</TableCell>
                <TableCell>{row.KATEGORI_CAR}</TableCell>
                <TableCell>{row.MERK_CAR}</TableCell>
                <TableCell>{row.NM_UNIT}</TableCell>
                <TableCell>{row.JENIS_CAR}</TableCell>
                <TableCell>{row.KD_ONWER}</TableCell>
                <TableCell>{row.NM_OWNER}</TableCell>
                <TableCell>{row.NO_BL}</TableCell>
                <TableCell>{row.NO_DOC_BC}</TableCell>
                <TableCell>{row.TGL_DOC_BC}</TableCell>
                <TableCell>{row.TIPE_DOC_BC}</TableCell>
                <TableCell>{row.LOAD_PORT}</TableCell>
                <TableCell>{row.NM_LOAD_PORT}</TableCell>
                <TableCell>{row.DISCH_PORT}</TableCell>
                <TableCell>{row.NM_DISCH_PORT}</TableCell>
                <TableCell>{row.FDISCH_PORT}</TableCell>
                <TableCell>{row.NM_FDISCH_PORT}</TableCell>
                <TableCell>{row.TGL_GATE_IN}</TableCell>
                <TableCell>{row.NO_GATE_IN}</TableCell>
                <TableCell>{row.TGL_GATE_OUT}</TableCell>
                <TableCell>{row.NO_GATE_OUT}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={20} align="center">
                No Data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionDetailTable;
