import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import { useTransactionStore } from "../datas/store";

const TransactionDetailModal = ({ open, onClose }) => {
  const { detailTransactions } = useTransactionStore();
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Transaction Details</DialogTitle>
      <DialogContent>
        {detailTransactions.map((detail, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Vehicle Information</Typography>
              <Typography>VIN: {detail.NO_VIN}</Typography>
              <Typography>Category: {detail.KATEGORI_CAR}</Typography>
              <Typography>Brand: {detail.MERK_CAR}</Typography>
              <Typography>Type: {detail.JENIS_CAR}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Owner Information</Typography>
              <Typography>Owner Code: {detail.KD_ONWER}</Typography>
              <Typography>Owner Name: {detail.NM_OWNER}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Shipping Details</Typography>
              <Typography>Bill of Lading: {detail.NO_BL}</Typography>
              <Typography>Document Type: {detail.TIPE_DOC_BC}</Typography>
              <Typography>Loading Port: {detail.NM_LOAD_PORT}</Typography>
              <Typography>Discharge Port: {detail.NM_DISCH_PORT}</Typography>
            </Grid>
          </Grid>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailModal;
