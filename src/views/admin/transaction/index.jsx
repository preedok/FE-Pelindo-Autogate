import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import TransactionHeaderTable from "./components/TransactionHeaderTable";
import TransactionDetailModal from "./components/TransactionDetail";
import useTransactionStore from "./datas/store"; // Corrected import
import Breadcrombss from "../../../components/common/Breadcrombs/Breadcrombss";
import ContentCard from "../../../components/common/Card/CardContent";

const TransactionPage = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fetchHeader, transactionHeader, fetchDetail } = useTransactionStore(); // Get transactionHeader from the store

  useEffect(() => {
    fetchHeader(); // Fetch transaction headers when the component mounts
  }, [fetchHeader]);

  const handleRowClick = async (ticket) => {
    setSelectedTicket(ticket);
    setLoading(true);
    setError(null);
    try {
      await fetchDetail(ticket.NO_TIKET); // Use fetchDetail directly
    } catch (err) {
      setError('Failed to fetch transaction details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 mx-5 mt-[78px] rounded-lg w-full">
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Breadcrombss menu={"Transaction"} submenu={"Transaction"} />
      <ContentCard>
        <Box sx={{ my: 4 }}>
          <TransactionHeaderTable
            data={transactionHeader} // Use the fetched transactionHeader
            onFetchData={fetchHeader} // Use fetchHeader to fetch data
            onRowClick={handleRowClick}
          />
          <TransactionDetailModal
            open={!!selectedTicket}
            onClose={() => setSelectedTicket(null)} // Close modal function
            ticketData={selectedTicket}
          />
        </Box>
      </ContentCard>
    </section>
  );
};

export default TransactionPage;