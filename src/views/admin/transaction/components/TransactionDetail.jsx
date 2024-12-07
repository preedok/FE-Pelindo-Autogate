import React, { useState, useEffect } from "react";
import {
  Modal,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomTable from '../../../../components/specialized/CustomTable'; 

import useTransactionStore from "../datas/store";

const TransactionDetail = ({ noTiket, onClose }) => {
  const { transactionDetail, fetchDetail } = useTransactionStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (noTiket) {
      fetchDetail(noTiket);
    }
  }, [noTiket, fetchDetail]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { id: 'NO_VIN', label: 'No VIN', minWidth: 100 },
    { id: 'KATEGORI_CAR', label: 'Kategori Car', minWidth: 100 },
    { id: 'MERK_CAR', label: 'Merk Car', minWidth: 100 },
    { id: 'JENIS_CAR', label: 'Jenis Car', minWidth: 100 },
    { id: 'NM_UNIT', label: 'Nama Unit', minWidth: 100 },
  ];

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

        <CustomTable
          columns={columns}
          loading={false}
          rows={transactionDetail}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </Modal>
  );
};

export default TransactionDetail;