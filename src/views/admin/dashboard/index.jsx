import React, { useEffect } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import { useDashboardStore } from "./datas/store";
import TransactionTable from "./components/TransactionTable";
import LongStayCargo from "./components/LongStayCargo";
import Breadcrombss from "../../../components/common/Breadcrombs/Breadcrombss";
import ContentCard from "../../../components/common/Card/CardContent";
import GateInOut from "./components/GateInOut"; // Import the new component

const Dashboard = () => {
  const {
    transactions,
    transactionDetails,
    fetchDashboardTransaction,
    fetchDashboardTransactionDetail,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardTransaction("IN-1");
    fetchDashboardTransactionDetail({
      noTiket: "example-ticket",
      length: 10,
      start: 0,
      draw: 1,
    });
  }, []);

  return (
    <section className="p-6 mx-5 mt-[78px] rounded-lg w-full">
      <Breadcrombss menu={"Dashboard"} submenu={"Sub Dashboard"} />
      <ContentCard>
        <GateInOut />
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Long Stay Cargo</Typography>
          <LongStayCargo data={transactionDetails} />
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Statistik Cargo</Typography>
          <TransactionTable data={transactions} />
        </Paper>
      </ContentCard>
    </section>
  );
};

export default Dashboard;