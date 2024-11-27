import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HttpsIcon from '@mui/icons-material/Https';

const CustomTable = ({ columns, rows, loading, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, handleOpenViews }) => {
    useEffect(() => {
        console.log('Rows in CustomTable:', rows);
        console.log('Columns in CustomTable:', columns);
        console.log('Page:', page, 'RowsPerPage:', rowsPerPage);
    }, [rows, columns, page, rowsPerPage]);

    const renderCellContent = (column, row) => {
        if (column.render) {
            return column.render(row);
        }
        return row[column.id] !== undefined ? row[column.id] : 'N/A';
    };

    const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow style={{
                        minWidth: columns.minWidth,
                        backgroundColor: '#F9FAFC',
                        color: 'black',
                        fontWeight: '600',
                    }}>
                        {columns.map((column) => (
                            <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">
                                Loading...
                            </TableCell>
                        </TableRow>
                    ) : rows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">
                                No data available
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginatedRows.map((row, index) => (
                            <TableRow style={{
                                backgroundColor: index % 2 === 0 ? '#EEF5FF' : 'white',
                            }} key={index}>
                                {columns.map((column) => (
                                    <TableCell  key={column.id} align={column.align}>
                                        {renderCellContent(column, row)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default CustomTable;