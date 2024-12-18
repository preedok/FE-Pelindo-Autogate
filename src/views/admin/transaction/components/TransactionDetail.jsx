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

const TransactionDetail = ({ noTiket, branchCode, terminalCode, onClose }) => {
  const { transactionDetail, fetchDetail } = useTransactionStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (noTiket) {
      setLoading(true);
      fetchDetail(noTiket, branchCode, terminalCode).finally(() => setLoading(false));
    }
  }, [noTiket, fetchDetail, branchCode, terminalCode]);
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
          loading={loading}
          rows={transactionDetail}
        />
      </div>
    </Modal>
  );
};

export default TransactionDetail;