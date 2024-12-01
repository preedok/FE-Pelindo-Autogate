import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TablePagination,
  TextField,
  Box,
  Typography
} from '@mui/material';

const TransactionHeaderTable = ({ data, onFetchData, onRowClick }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Initial data fetch
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
    });
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
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box>
      <TextField
        label="Search Transactions"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle Number</TableCell>
              <TableCell>Gate In Number</TableCell>
              <TableCell>Gate In Date</TableCell>
              <TableCell>Gate Out Number</TableCell>
              <TableCell>Gate Out Date</TableCell>
              <TableCell>Ticket Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow 
                  key={row.NO_TIKET}
                  hover
                  onClick={() => onRowClick(row)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{row.NOPOL}</TableCell>
                  <TableCell>{row.NO_GATE_IN}</TableCell>
                  <TableCell>{row.TGL_GATE_IN}</TableCell>
                  <TableCell>{row.NO_GATE_OUT}</TableCell>
                  <TableCell>{row.TGL_GATE_OUT}</TableCell>
                  <TableCell>{row.NO_TIKET}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default TransactionHeaderTable;