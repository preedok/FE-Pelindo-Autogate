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
  TablePagination,
} from "@mui/material";
import useTransactionStore from "../datas/store";
import CloseIcon from "@mui/icons-material/Close";
const TransactionDetail = ({ noTiket, onClose }) => {
  const { transactionDetail, fetchDetail } = useTransactionStore();
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };
  const currentRows = transactionDetail.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
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
              <TableRow style={{ backgroundColor: "#CAF4FF" }}>
                <TableCell>No VIN</TableCell>
                <TableCell>Kategori Car</TableCell>
                <TableCell>Merk Car</TableCell>
                <TableCell>Jenis Car</TableCell>
                <TableCell>Nama Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((detail) => (
                <TableRow key={detail.NO_VIN}>
                  <TableCell>{detail.NO_VIN}</TableCell>
                  <TableCell>{detail.KATEGORI_CAR}</TableCell>
                  <TableCell>{detail.MERK_CAR}</TableCell>
                  <TableCell>{detail.JENIS_CAR}</TableCell>
                  <TableCell>{detail.NM_UNIT}</TableCell>
                </TableRow>
              ))}
              {currentRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: "center" }}>
                    No Data Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]} 
            component="div"
            count={transactionDetail.length} 
            rowsPerPage={rowsPerPage}
            page={page} 
            onPageChange={handleChangePage} 
            onRowsPerPageChange={handleChangeRowsPerPage} 
          />
        </TableContainer>
      </div>
    </Modal>
  );
};

export default TransactionDetail;
