
import React from "react";
import { Typography, Paper } from "@mui/material";
import TransactionHeader from "../transaction/components/TransactionHeader";
import TransactionDetail from "../transaction/components/TransactionDetail";
import Breadcrombss from "../../../components/common/Breadcrombs/Breadcrombss";
import ContentCard from "../../../components/common/Card/CardContent";
const Transaction = () => {
  return (
    <section className="p-6 mx-5 mt-[78px] rounded-lg w-full">
      <Breadcrombss menu={"Transaction"} submenu={"Sub Transaction"} />
      <ContentCard>
        <Typography variant="h4" gutterBottom>
          Transaction
        </Typography>
        <TransactionHeader />
        <TransactionDetail />
      </ContentCard>
    </section>
  );
};

export default Transaction;
