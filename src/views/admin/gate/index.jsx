import React, { useState } from "react";
import { Box, Typography, Container, Tabs, Tab, Paper } from "@mui/material";
import GateInForm from "./components/GateInForm";
import GateOutForm from "./components/GateOutForm";
import { useGateStore } from "./datas/store";
import Breadcrombss from "../../../components/common/Breadcrombs/Breadcrombss";
import ContentCard from "../../../components/common/Card/CardContent";

const GatePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const {
    processGateTransaction,
    gateTransaction,
    gateTransactionLoading,
    gateTransactionError,
  } = useGateStore();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <section className="p-6 mx-5 mt-[78px] rounded-lg w-full">
      <Breadcrombss menu={"Gate"} submenu={"Sub Gate"} />
      <ContentCard>
        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Gate Management
          </Typography>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{ mb: 3 }}
          >
            <Tab label="Gate In" />
            <Tab label="Gate Out" />
          </Tabs>

          {activeTab === 0 && (
            <GateInForm
              onSubmit={processGateTransaction}
              transaction={gateTransaction}
              loading={gateTransactionLoading}
              error={gateTransactionError}
            />
          )}

          {activeTab === 1 && (
            <GateOutForm
              onSubmit={processGateTransaction}
              transaction={gateTransaction}
              loading={gateTransactionLoading}
              error={gateTransactionError}
            />
          )}
        </Paper>
      </ContentCard>
    </section>
  );
};

export default GatePage;
