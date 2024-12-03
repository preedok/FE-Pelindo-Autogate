
import React from "react";
import { Typography, Paper } from "@mui/material";
import DashboardTransaction from "./components/DashboardTransaction";
import LongStayCargo from "./components/LongStayCargo";
import Breadcrombss from "../../../components/common/Breadcrombs/Breadcrombss";
import ContentCard from "../../../components/common/Card/CardContent";
const Dashboard = () => {
  const noTiket = "GT244100 41001000000290";
  return (
    <section className="p-6 mx-5 mt-[78px] rounded-lg w-full">
      <Breadcrombss menu={"Dashboard"} submenu={"Sub Dashboard"} />
      <ContentCard>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Paper style={{ padding: 20, marginBottom: 20 }}>
          <Typography variant="h6">Dashboard Transaction</Typography>
          <DashboardTransaction />
        </Paper>
        <Paper style={{ padding: 20 }}>
          <Typography variant="h6">Long Stay Cargo</Typography>
          <LongStayCargo />
        </Paper>
      </ContentCard>
    </section>
  );
};

export default Dashboard;
