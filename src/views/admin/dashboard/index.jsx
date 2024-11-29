import React, { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import ContentCard from "../../../components/common/Card/CardContent";
import Breadcrombs from "../../../components/common/Breadcrombs/Breadcrombss";
import {
  useDashboardTransactions,
  useDashboardTransactionDetails,
} from "./hooks/useDashboardTransactions";

const Index = () => {
  const [selectedLane, setSelectedLane] = useState("IN-1");
  const {
    transactions,
    loading: transactionsLoading,
    error: transactionsError,
  } = useDashboardTransactions(selectedLane);
  const {
    details,
    loading: detailsLoading,
    error: detailsError,
  } = useDashboardTransactionDetails(
    transactions.length > 0 ? transactions[0].NO_TIKET : null
  );
  return (
    <section className="p-6 mx-5 mt-[78px] rounded-lg w-full">
      <Breadcrombs menu={"Dashboard"} submenu={"Sub Dashboard"} />
      <ContentCard>
        {transactionsLoading ? (
          <CircularProgress />
        ) : transactionsError ? (
          <Snackbar
            open={true}
            message={`Error: ${transactionsError}`}
            autoHideDuration={6000}
          />
        ) : (
          <div>
            <Typography variant="h5" gutterBottom>
              Dashboard Transactions
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ticket Number</TableCell>
                    <TableCell>VIN Count</TableCell>
                    <TableCell>Truck Code</TableCell>
                    <TableCell>License Plate</TableCell>
                    <TableCell>Customs Doc</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{transaction.NO_TIKET}</TableCell>
                      <TableCell>{transaction.JUMLAH_VIN}</TableCell>
                      <TableCell>{transaction.KD_TRUCK}</TableCell>
                      <TableCell>{transaction.NOPOL}</TableCell>
                      <TableCell>{transaction.NAMA_DOC_BC}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        {detailsLoading ? (
          <CircularProgress />
        ) : detailsError ? (
          <Snackbar
            open={true}
            message={`Error: ${detailsError}`}
            autoHideDuration={6000}
          />
        ) : details.length > 0 ? (
          <div>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Transaction Details
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>VIN</TableCell>
                    <TableCell>Car Category</TableCell>
                    <TableCell>Car Brand</TableCell>
                    <TableCell>Car Type</TableCell>
                    <TableCell>Owner</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details.map((detail, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{detail.NO_VIN}</TableCell>
                      <TableCell>{detail.KATEGORI_CAR}</TableCell>
                      <TableCell>{detail.MERK_CAR}</TableCell>
                      <TableCell>{detail.JENIS_CAR}</TableCell>
                      <TableCell>{detail.NM_OWNER}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : null}
      </ContentCard>
    </section>
  );
};

export default Index;
