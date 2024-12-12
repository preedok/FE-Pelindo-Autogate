import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import CustomTable from "../../../../components/specialized/CustomTable";
import TransactionDetail from "./TransactionDetail";

const TransactionHeaderTable = ({ data, onFetchData, onRowClick }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [noTiket, setNoTiket] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [branchCode, setBranchCode] = useState("4100");
  const [terminalCode, setTerminalCode] = useState("41001");

  useEffect(() => {
    setLoading(true);
    onFetchData({
      branchCode,
      terminalCode,
      direction: tabValue === 0 ? "IMPORT" : "EXPORT",
      length: rowsPerPage,
      start: page * rowsPerPage,
      draw: 1,
      search: searchTerm,
      order: null,
      columns: null,
    }).finally(() => setLoading(false));
  }, [
    page,
    rowsPerPage,
    searchTerm,
    tabValue,
    branchCode,
    terminalCode,
    onFetchData,
  ]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        value !== null &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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

  const handleBranchCodeChange = (event) => {
    setBranchCode(event.target.value);
  };

  const handleTerminalCodeChange = (event) => {
    setTerminalCode(event.target.value);
  };

  return (
    <div className="mx-2">
      <div className="mb-5">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Import" />
          <Tab label="Export" />
        </Tabs>
      </div>

      <div className="flex gap-3 my-2">
        <div className="flex flex-col w-1/2">
          <label className="text-sm font-medium text-gray-700">Branch Code</label>
          <input
            type="text"
            value={branchCode}
            onChange={handleBranchCodeChange}
            className="block w-full p-2 pl-5 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col w-1/2">
          <label className="text-sm font-medium text-gray-700">Terminal Code</label>
          <input
            type="text"
            value={terminalCode}
            onChange={handleTerminalCodeChange}
            className="block w-full p-2 pl-5 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col w-1/2">
          <label className="text-sm font-medium text-gray-700">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-2 pl-5 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <CustomTable
        columns={columns}
        loading={loading}
        rows={filteredData.map((row) => ({
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
      <TransactionDetail noTiket={noTiket} onClose={() => setNoTiket(null)} />
    </div>
  );
};

export default TransactionHeaderTable;
