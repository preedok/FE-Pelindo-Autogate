import React, { useState, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import * as XLSX from 'xlsx';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Box, Typography, CircularProgress } from '@mui/material';
const HistoryTable = ({ loading, inputValue, setInputValue, filteredData, hideUsernameColumn, filterUser }) => {
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleSort = (column) => {
        const isAsc = sortColumn === column && sortDirection === 'asc';
        setSortDirection(isAsc ? 'desc' : 'asc');
        setSortColumn(column);
    };

    const columns = [
        ...(hideUsernameColumn ? [] : [{ id: 'username', label: 'Username', minWidth: 100 }]),
        { id: 'action', label: 'Action', minWidth: 100 },
        { id: 'containerNumber', label: 'Container Number', minWidth: 150 },
        { id: 'date', label: 'Date', minWidth: 150 },
    ];

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            if (!sortColumn) return 0;
            const valueA = a[sortColumn] || '';
            const valueB = b[sortColumn] || '';
            if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [sortColumn, sortDirection, filteredData]);

    const rows = useMemo(() => {
        return sortedData.filter(item =>
            Object.values(item).some(val => {
                if (val == null) return false;
                return val.toString().toLowerCase().includes((inputValue || '').toLowerCase());
            })
        );
    }, [sortedData, inputValue]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const exportToExcel = () => {
        const fileName = 'history.xlsx';
        const wsData = filterUser ? [{ username: filterUser }] : [];
        wsData.push(...rows);
        const ws = XLSX.utils.json_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'History');
        XLSX.writeFile(wb, fileName);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleString('id-ID', options);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <Button
                    variant="outlined"
                    style={{ color: "grey", borderColor: "grey", height: '35px' }}
                    size="small"
                    onClick={exportToExcel}
                >
                    <FileUploadIcon className="mr-2" />
                    Export
                </Button>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Pencarian..."
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    style={{ width: '300px' }}
                />
            </div>

            {filterUser && (
                <div className="text-center mb-4">
                    <h2 className="text-xl font-bold">User: {filterUser}</h2>
                </div>
            )}

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        className="font-bold"
                                        style={{
                                            minWidth: column.minWidth,
                                            backgroundColor: '#F9FAFC',
                                            color: 'black',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleSort(column.id)}
                                    >
                                        {column.label}
                                        {sortColumn === column.id && (
                                            sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center" style={{ fontWeight: 'bold' }}>
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : rows.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center" style={{ fontWeight: 'bold' }}>
                                            <SearchOffIcon style={{ fontSize: 60, color: 'grey', marginBottom: '16px' }} />
                                            <Typography>  No activities found matching the search criteria</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, rowIndex) => (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={rowIndex}
                                            style={{
                                                backgroundColor: rowIndex % 2 === 0 ? '#EEF5FF' : 'white',
                                            }}
                                        >
                                            {!hideUsernameColumn && (
                                                <TableCell style={{ fontWeight: 'bold' }}>
                                                    {row.holdStatus === 'R' ? row.releaseBy : row.holdStatus === 'H' ? row.holdBy : 'N/A'}
                                                </TableCell>
                                            )}
                                            <TableCell style={{ fontWeight: 'bold' }}>
                                                {row.holdStatus === 'R' ? 'Release' : row.holdStatus === 'H' ? 'Hold' : 'N/A'}
                                            </TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }}>{row.containerNumber || 'N/A'}</TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }}>{formatDate(row.timeCreated)}</TableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
};

export default HistoryTable;