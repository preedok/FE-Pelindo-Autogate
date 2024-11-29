import React from "react";
import TransactionTable from "./TransactionTable";
import LongStayCargoTable from "./LongStayCargoTable";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <TransactionTable />
      <LongStayCargoTable />
    </div>
  );
};

export default Dashboard;
