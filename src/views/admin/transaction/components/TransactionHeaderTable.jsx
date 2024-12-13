import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import CustomTable from "../../../../components/specialized/CustomTable";
import TransactionDetail from "./TransactionDetail";
import useTransactionStore from "../datas/store";

const TransactionHeaderTable = () => {
  const { transactionHeader, fetchHeader } = useTransactionStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [noTiket, setNoTiket] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [branchCode, setBranchCode] = useState("4100");
  const [terminalCode, setTerminalCode] = useState("41001");

  useEffect(() => {
    fetchHeader(branchCode, terminalCode, searchTerm, tabValue === 0 ? "IMPORT" : "EXPORT");
  }, [branchCode, terminalCode, searchTerm, tabValue, fetchHeader]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { id: "NOPOL", label: "Vehicle Number", minWidth: 100 },
    { id: "NO_GATE_IN", label: "Gate In Number", minWidth: 100 },
    { id: "TGL_GATE_IN", label: "Gate In Date", minWidth: 100 },
    { id: "NO_GATE_OUT", label: "Gate Out Number", minWidth: 100 },
    { id: "TGL_GATE_OUT", label: "Gate Out Date", minWidth: 100 },
    { id: "NO_TIKET", label: "Ticket Number", minWidth: 100 },
    { id: "DETAIL", label: "Detail", minWidth: 100 },
  ];

  const handleDetailClick = (noTiket) => {
    setNoTiket(noTiket);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0);
  };

  return (
    <Box>
      <div className="mb-3">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicator Color="primary"
          textColor="primary"
        >
          <Tab label="Import" />
          <Tab label="Export" />
        </Tabs>
      </div>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <CustomTable
        columns={columns}
        loading={loading}
        rows={transactionHeader.map((row) => ({
          ...row,
          DETAIL: (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleDetailClick(row.NO_TIKET)}
            >
              Detail
            </Button>
          ),
        }))}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {/* Render the TransactionDetail modal */}
      <TransactionDetail noTiket={noTiket} branchCode={branchCode} terminalCode={terminalCode} onClose={() => setNoTiket(null)} />
    </Box>
  );
};

export default TransactionHeaderTable;