
import React, { useEffect } from "react";
import {
  Modal,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import useTransactionStore from "../datas/store";
import CloseIcon from "@mui/icons-material/Close";
const TransactionDetail = ({ noTiket, onClose }) => {
  const { transactionDetail, fetchDetail } = useTransactionStore();
  useEffect(() => {
    if (noTiket) {
      fetchDetail(noTiket);
    }
  }, [noTiket, fetchDetail]);
  return (
    <Modal open={Boolean(noTiket)} onClose={onClose}>
      <div
        style={{
          padding: "20px",
          backgroundColor: "white",
          margin: "auto",
          marginTop: "100px",
          width: "80%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Transaction Detail
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{backgroundColor:'#CAF4FF'}}>
                <TableCell>No VIN</TableCell>
                <TableCell>Kategori Car</TableCell>
                <TableCell>Merk Car</TableCell>
                <TableCell>Jenis Car</TableCell>
                <TableCell>Nama Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionDetail.map((detail) => (
                <TableRow key={detail.NO_VIN}>
                  <TableCell>{detail.NO_VIN}</TableCell>
                  <TableCell>{detail.KATEGORI_CAR}</TableCell>
                  <TableCell>{detail.MERK_CAR}</TableCell>
                  <TableCell>{detail.JENIS_CAR}</TableCell>
                  <TableCell>{detail.NM_UNIT}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Modal>
  );
};

export default TransactionDetail;
