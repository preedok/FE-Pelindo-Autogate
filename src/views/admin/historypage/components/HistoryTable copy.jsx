// import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import * as XLSX from 'xlsx';

// const HistoryTable = ({ loading, inputValue, setInputValue, filteredData, hideUsernameColumn, filterUser }) => {
//     const [sortColumn, setSortColumn] = useState('');
//     const [sortDirection, setSortDirection] = useState('asc');

//     const handleSort = (column) => {
//         const isAsc = sortColumn === column && sortDirection === 'asc';
//         setSortDirection(isAsc ? 'desc' : 'asc');
//         setSortColumn(column);
//     };

//     const sortedData = React.useMemo(() => {
//         return [...filteredData].sort((a, b) => {
//             if (!sortColumn) return 0;
//             const valueA = a[sortColumn] || '';
//             const valueB = b[sortColumn] || '';
//             if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
//             if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
//             return 0;
//         });
//     }, [sortColumn, sortDirection, filteredData]);

//     const filteredDataWithSearch = sortedData.filter(item => 
//         Object.values(item).some(val => {
//             if (val == null) return false; // Skip null or undefined values
//             return val.toString().toLowerCase().includes((inputValue || '').toLowerCase());
//         })
//     );

//     const exportToExcel = () => {
//         const fileName = 'history.xlsx';
//         const wsData = filterUser ? [{ username: filterUser }] : [];
//         wsData.push(...filteredDataWithSearch);
//         const ws = XLSX.utils.json_to_sheet(wsData);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'History');
//         XLSX.writeFile(wb, fileName);
//     };

//     const headerStyle = {
//         backgroundColor: '#f5f5f5',
//         fontWeight: 'bold',
//         cursor: 'pointer',
//         userSelect: 'none',
//     };

//     const formatDate = (dateString) => {
//         const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
//         return new Date(dateString).toLocaleString('id-ID', options);
//     };

//     return (
//         <>
//             <div className="flex justify-between items-center mb-4">
//                 <Button
//                     variant="outlined"
//                     style={{ color: "grey", borderColor: "grey", height: '35px' }}
//                     size="small"
//                     onClick={exportToExcel}
//                 >
//                     <FileUploadIcon className="mr-2" />
//                     Export
//                 </Button>
//                 <input
//                     type="text"
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     placeholder="Pencarian..."
//                     className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     style={{ width: '300px' }}
//                 />
//             </div>

//             {filterUser && (
//                 <div className="text-center mb-4">
//                     <h2 className="text-xl font-bold">User: {filterUser}</h2>
//                 </div>
//             )}

//             <TableContainer 
//                 component={Paper} 
//                 style={{ 
//                     maxHeight: '400px',
//                     overflow: 'auto',
//                 }}
//             >
//                 <Table>
//                     <TableHead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
//                         <TableRow>
//                             {!hideUsernameColumn && (
//                                 <TableCell onClick={() => handleSort('username')} style={headerStyle}>
//                                     Username
//                                     {sortColumn === 'username' && (
//                                         sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
//                                     )}
//                                 </TableCell>
//                             )}
//                             <TableCell onClick={() => handleSort('action')} style={headerStyle}>
//                                 Action
//                                 {sortColumn === 'action' && (
//                                     sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
//                                 )}
//                             </TableCell>
//                             <TableCell onClick={() => handleSort('containerNumber')} style={headerStyle}>
//                                 Container Number
//                                 {sortColumn === 'containerNumber' && (
//                                     sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
//                                 )}
//                             </TableCell>
//                             <TableCell onClick={() => handleSort('date')} style={headerStyle}>
//                                 Date
//                                 {sortColumn === 'date' && (
//                                     sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
//                                 )}
//                             </TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow>
//                                 <TableCell colSpan={hideUsernameColumn ? 4 : 5} align="center">Loading...</TableCell>
//                             </TableRow>
//                         ) : filteredDataWithSearch.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={hideUsernameColumn ? 4 : 5} align="center">No activities found matching the search criteria</TableCell>
//                             </TableRow>
//                         ) : (
//                             filteredDataWithSearch.map((item, index) => (
//                                 <TableRow key={index}>
//                                     {!hideUsernameColumn && (
//                                         <TableCell>{item.holdStatus === 'R' ? item.releaseBy : item.holdStatus === 'H' ? item.holdBy : 'N/A'}</TableCell>
//                                     )}
//                                     <TableCell>{item.holdStatus === 'R' ? 'Release' : item.holdStatus === 'H' ? 'Hold' : 'N/A'}</TableCell>
//                                     <TableCell>{item.containerNumber || 'N/A'}</TableCell>
//                                     <TableCell>{formatDate(item.timeCreated)}</TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </>
//     );
// };

// export default HistoryTable;
