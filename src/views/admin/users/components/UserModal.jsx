// src/components/UserModal.js
import React from 'react';
import { Modal, Box, Typography, TextField, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';

const UserModal = ({ open, onClose, user, setUser, handleSave, isEdit }) => {
    // const handleRoleChange = (e, role) => {
    //     const updatedRoles = e.target.checked
    //         ? [...user.role, role]
    //         : user.role.filter(r => r !== role);

    //     setUser({ ...user, role: updatedRoles });
    // };
    const handleRoleChange = (e, role) => {
        const allowedRoles = ['ADMINBC', 'CUSMOD', 'P2'];
        if (!allowedRoles.includes(role)) return;

        const updatedRoles = e.target.checked
            ? [...user.role, role]
            : user.role.filter(r => r !== role);

        setUser({ ...user, role: updatedRoles });
    };

    const handleCancel = () => {
        setUser({
            email: '',
            password: '',
            role: [],
            applicationId: ''
        });
        // Close the modal
        onClose();
    };
    return (
        <Modal open={open} onClose={onClose}>
            <Box className="p-6 m-auto mt-24 bg-white rounded-lg shadow-lg max-w-[400px]">
                <Typography variant="h6" component="h2" mb={2}>{isEdit ? 'Edit User' : 'Add User'}</Typography>
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    value={user.password}
                    onChange={(e) => {
                        const password = e.target.value;
                        if (password.length <= 5) {
                            setUser({ ...user, password });
                        }
                    }}
                    helperText="Max 5 characters"
                />
                <FormGroup>
                    {['SUPERADMIN', 'ADMINISTRATOR', 'ADMINBC', 'CUSMOD', 'P2'].map(role => (
                        <FormControlLabel
                            control={<Checkbox
                                checked={user.role.includes(role)}
                                onChange={(e) => handleRoleChange(e, role)}
                            />}
                            label={role}
                            key={role}
                        />
                    ))}
                </FormGroup>
                {/* <TextField
                    fullWidth
                    label="Application ID"
                    variant="outlined"
                    margin="normal"
                    value={user.applicationId}
                    onChange={(e) => setUser({ ...user, applicationId: e.target.value })}
                /> */}
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                    <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UserModal;
