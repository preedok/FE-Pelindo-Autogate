import React, { useEffect } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import { useDashboardStore } from "./datas/store";
import TransactionTable from "./components/TransactionTable";
import LongStayCargo from "./components/LongStayCargo";
import DashboardOverview from "./components/DashboardOverview";
import Breadcrombss from "../../../components/common/Breadcrombs/Breadcrombss";
import ContentCard from "../../../components/common/Card/CardContent";
const Dashboard = () => {
  const {
    transactions,
    transactionDetails,
    fetchDashboardTransaction,
    fetchDashboardTransactionDetail,
  } = useDashboardStore();
  useEffect(() => {
    // Example of fetching data - replace with actual lane position
    fetchDashboardTransaction("IN-1");

    // Example of fetching transaction details
    fetchDashboardTransactionDetail({
      noTiket: "example-ticket",
      length: 10,
      start: 0,
      draw: 1,
    });
  }, []);
  const calculateOverviewStats = () => {
    const totalTransactions = transactions.length;
    const gateInTransactions = transactions.filter((t) =>
      t.NO_TIKET.includes("IN")
    ).length;
    const gateOutTransactions = transactions.filter((t) =>
      t.NO_TIKET.includes("OUT")
    ).length;
    const longStayCargo = transactionDetails.filter((detail) => {
      const gateInDate = new Date(detail.TGL_GATE_IN);
      const today = new Date();
      const daysDiff = (today - gateInDate) / (1000 * 3600 * 24);
      return daysDiff > 14;
    }).length;

    return {
      totalTransactions,
      gateInTransactions,
      gateOutTransactions,
      longStayCargo,
    };
  };
  const overviewStats = calculateOverviewStats();
  return (
    <section className="p-6 mx-5 mt-[78px] rounded-lg w-full">
      <Breadcrombss menu={"Dashboard"} submenu={"Sub Dashboard"} />
      <ContentCard>
        <DashboardOverview
          totalTransactions={overviewStats.totalTransactions}
          gateInTransactions={overviewStats.gateInTransactions}
          gateOutTransactions={overviewStats.gateOutTransactions}
          longStayCargo={overviewStats.longStayCargo}
        />
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Recent Transactions</Typography>
              <TransactionTable data={transactions} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Long Stay Cargo</Typography>
              <LongStayCargo data={transactionDetails} />
            </Paper>
          </Grid>
        </Grid>
      </ContentCard>
    </section>
  );
};

export default Dashboard;
