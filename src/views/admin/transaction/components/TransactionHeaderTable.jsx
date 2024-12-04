import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import CustomTable from '../../../../components/specialized/CustomTable'; // Adjust the path as necessary
import TransactionDetail from './TransactionDetail'; // Adjust the path as necessary

const TransactionHeaderTable = ({ data, onFetchData, onRowClick }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [noTiket, setNoTiket] = useState(null); // State for the selected ticket number

  useEffect(() => {
    // Initial data fetch
    setLoading(true);
    onFetchData({
      branchCode: 'YOUR_BRANCH_CODE',
      terminalCode: 'YOUR_TERMINAL_CODE',
      direction: 'IMPORT', // or 'EXPORT'
      length: rowsPerPage,
      start: page * rowsPerPage,
      draw: 1,
      search: searchTerm,
      username: 'YOUR_USERNAME',
      password: 'YOUR_PASSWORD'
    }).finally(() => setLoading(false));
  }, [page, rowsPerPage, searchTerm, onFetchData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      value !== null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Define columns for the CustomTable
  const columns = [
    { id: 'NOPOL', label: 'Vehicle Number', minWidth: 100 },
    { id: 'NO_GATE_IN', label: 'Gate In Number', minWidth: 100 },
    { id: 'TGL_GATE_IN', label: 'Gate In Date', minWidth: 100 },
    { id: 'NO_GATE_OUT', label: 'Gate Out Number', minWidth: 100 },
    { id: 'TGL_GATE_OUT', label: 'Gate Out Date', minWidth: 100 },
    { id: 'NO_TIKET', label: 'Ticket Number', minWidth: 100 },
    { id: 'DETAIL', label: 'Detail', minWidth: 100 }, // Add a column for the Detail button
  ];

  // Function to handle opening the detail modal
  const handleDetailClick = (noTiket) => {
    setNoTiket(noTiket);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '200px' }}
        />
      </Box>

      <CustomTable
        columns={columns}
        loading={loading}
        rows={filteredData.map(row => ({
          ...row,
          DETAIL: (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDetailClick(row.NO_TIKET)} // Pass the ticket number
            >
              Detail
            </Button>
          )
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