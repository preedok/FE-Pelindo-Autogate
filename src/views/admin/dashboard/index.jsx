
import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import LongStayCargo from "./components/LongStayCargo";
import Breadcrombss from "../../../components/common/Breadcrombs/Breadcrombss";
import ContentCard from "../../../components/common/Card/CardContent";
import GateInOut from "./components/GateInOut"; 
import TransactionTable from './components/TransactionTable'
const Dashboard = () => {
  return (
    <section className="p-6 mx-5 mt-[78px] rounded-lg w-full">
      <Breadcrombss menu={"Dashboard"} submenu={"Dashboard"} />
      <ContentCard>
        <GateInOut />
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Long Stay Cargo</Typography>
          <LongStayCargo />
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Dashboard Transaction</Typography>
          <TransactionTable />
        </Paper>
      </ContentCard>
    </section>
  );
};

export default Dashboard;