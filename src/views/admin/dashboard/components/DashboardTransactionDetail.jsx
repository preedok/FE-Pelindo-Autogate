// src/views/dashboard/components/DashboardTransactionDetail.jsx
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

const DashboardTransactionDetail = ({ noTiket,  }) => {
  const { dashboardTransactionDetail, fetchDashboardTransactionDetail } = useStore();

  useEffect(() => {
    fetchDashboardTransactionDetail(noTiket);
  }, [fetchDashboardTransactionDetail, noTiket]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{backgroundColor:'#CAF4FF'}}>
            <TableCell>No VIN</TableCell>
            <TableCell>Kategori Car</TableCell>
            <TableCell>Merk Car</TableCell>
            <TableCell>Nama Unit</TableCell>
            <TableCell>Jenis Car</TableCell>
            <TableCell>Nama Owner</TableCell>
            <TableCell>Load Port</TableCell>
            <TableCell>Discharge Port</TableCell>
            <TableCell>Tgl Gate In</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dashboardTransactionDetail && dashboardTransactionDetail.length > 0 ? (
            dashboardTransactionDetail.map((detail) => (
              <TableRow key={detail.NO_VIN}>
                <TableCell>{detail.NO_VIN}</TableCell>
                <TableCell>{detail.KATEGORI_CAR}</TableCell>
                <TableCell>{detail.MERK_CAR}</TableCell>
                <TableCell>{detail.NM_UNIT}</TableCell>
                <TableCell>{detail.JENIS_CAR}</TableCell>
                <TableCell>{detail.NM_OWNER}</TableCell>
                <TableCell>{detail.NM_LOAD_PORT}</TableCell>
                <TableCell>{detail.NM_DISCH_PORT}</TableCell>
                <TableCell>{detail.TGL_GATE_IN}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} style={{ textAlign: "center" }}>
                No Data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardTransactionDetail;