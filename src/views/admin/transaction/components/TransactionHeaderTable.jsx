import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Tabs,
  Tab,
  Select,
  MenuItem,
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

  const branchCodes = [
    { value: "4100", label: "Branch 4100" },
    { value: "4101", label: "Branch 4101" },
    // tambahkan lebih banyak branch code jika perlu
  ];

  const terminalCodes = [
    { value: "41001", label: "Terminal 41001" },
    { value: "41002", label: "Terminal 41002" },
    // tambahkan lebih banyak terminal code jika perlu
  ];

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
    <Box>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Import" />
        <Tab label="Export" />
      </Tabs>

      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Select
          label="Branch Code"
          value={branchCode}
          onChange={handleBranchCodeChange}
          sx={{ width: "200px", marginRight: 2 }}
        >
          {branchCodes.map((branchCode) => (
            <MenuItem key={branchCode.value} value={branchCode.value}>
              {branchCode.label}
            </MenuItem>
          ))}
        </Select>

        <Select
          label="Terminal Code"
          value={terminalCode}
          onChange={handleTerminalCodeChange}
          sx={{ width: "200px", marginRight: 2 }}
        >
          {terminalCodes.map((terminalCode) => (
            <MenuItem key={terminalCode.value} value={terminalCode.value}>
              {terminalCode.label}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "200px" }}
        />
      </Box>

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
    </Box>
  );
};

export default TransactionHeaderTable;
