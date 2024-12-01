import React, { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import TransactionHeaderTable from "./components/TransactionHeaderTable";
import TransactionDetailModal from "./components/TransactionDetailModal";
import { useTransactionStore } from "./datas/store";
import Breadcrombss from "../../../components/common/Breadcrombs/Breadcrombss";
import ContentCard from "../../../components/common/Card/CardContent";

const TransactionPage = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const {
    headerTransactions,
    fetchHeaderTransactions,
    fetchDetailTransactions,
  } = useTransactionStore();

  const handleRowClick = (ticket) => {
    setSelectedTicket(ticket);
    fetchDetailTransactions({
      branchCode: "YOUR_BRANCH_CODE",
      terminalCode: "YOUR_TERMINAL_CODE",
      noTiket: ticket.NO_TIKET,
    });
  };

  const handleCloseDetailModal = () => {
    setSelectedTicket(null);
  };

  return (
    <section className="p-6 mx-5 mt-[78px] rounded-lg w-full">
      <Breadcrombss menu={"Transaction"} submenu={"Sub Transaction"} />
      <ContentCard>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            Transaction Management
          </Typography>

          <TransactionHeaderTable
            data={headerTransactions}
            onFetchData={fetchHeaderTransactions}
            onRowClick={handleRowClick}
          />

          <TransactionDetailModal
            open={!!selectedTicket}
            onClose={handleCloseDetailModal}
            ticketData={selectedTicket}
          />
        </Box>
      </ContentCard>
    </section>
  );
};

export default TransactionPage;
