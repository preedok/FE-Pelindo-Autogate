// UserTable.jsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material'; // Pastikan Button diimpor
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const UserTable = ({ users, onEdit, onDelete }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell style={{
                            backgroundColor: '#F9FAFC',
                            color: 'black',
                            fontWeight: '600',
                        }}>No</TableCell>
                        <TableCell style={{
                            backgroundColor: '#F9FAFC',
                            color: 'black',
                            fontWeight: '600',
                        }}>Email</TableCell>
                        <TableCell style={{
                            backgroundColor: '#F9FAFC',
                            color: 'black',
                            fontWeight: '600',
                        }}>Role</TableCell>
                        <TableCell style={{
                            backgroundColor: '#F9FAFC',
                            color: 'black',
                            fontWeight: '600',
                        }}>Application ID</TableCell>
                        <TableCell style={{
                            backgroundColor: '#F9FAFC',
                            color: 'black',
                            fontWeight: '600',
                        }} align='center'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.length > 0 ? (
                        users.map((user, rowIndex) => (
                            <TableRow key={user.id} style={{
                                backgroundColor: rowIndex % 2 === 0 ? '#EEF5FF' : 'white',
                            }}>
                                <TableCell>{rowIndex + 1}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.applicationId}</TableCell>
                                <TableCell align='center'>
                                    <Button onClick={() => onEdit(user.id)}><EditIcon color='success' /></Button>
                                    <Button onClick={() => onDelete(user.id)}><DeleteIcon color='error' /></Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Typography align="center">No data available</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;
