// src/pages/Users.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button, TextField, Grid, CircularProgress, Box, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import useUser from '../users/hooks/useUser';
import UserTable from '../users/components/UserTable';
import UserModal from '../users/components/UserModal';
import ContentCard from '../../../components/common/Card/CardContent';
import Breadcrombs from '../../../components/common/Breadcrombs/Breadcrombss';
import CustomTable from "../../../components/specialized/DataTable/CustomTable";
import { Card } from 'flowbite-react';

const Users = () => {
    const {
        dataUser, loading, newUser, setNewUser, editedUser, setEditedUser,
        getDataUser, handleAddUser, handleUpdateUser, handleDeleteUser,
        handleOpenEdit, handleRoleChange, error
    } = useUser();

    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getDataUser();
    }, [getDataUser]);


    const handleSaveAdd = async () => {
        const success = await handleAddUser();
        if (success) {
            setOpenAdd(false);
            setNewUser({ email: '', password: '', role: [], applicationId: '' });
        }
    };

    const handleSaveEdit = async () => {
        const success = await handleUpdateUser();
        if (success) {
            setOpenEdit(false);
            setEditedUser({ id: '', email: '', password: '', role: [], applicationId: '' });
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // const filteredUsers = dataUser.filter(user =>
    //     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     user.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    const filteredUsers = dataUser.filter(user =>
        (user.role.includes('ADMINBC') || user.role.includes('CUSMOD') || user.role.includes('P2')) &&
        (user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.applicationId.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleOpenEdits = async (userId) => {
        await handleOpenEdit(userId);
        setOpenEdit(true);
    };
    return (
        <>
            <Helmet>
                <title>Users</title>
            </Helmet>
            <Breadcrombs title="Users" />
            <section className="p-6 mx-5 mt-[20px] rounded-lg w-full">
                <Breadcrombs menu={'User'} submenu={'Management User'} />
                <Card className='mx-1 mt-4'>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between" mb={2}>
                            <TextField
                                variant="outlined"
                                label="Search"
                                value={searchTerm}
                                onChange={handleSearch}
                                size="small"
                                InputProps={{
                                    endAdornment: <SearchIcon />
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={() => setOpenAdd(true)}
                            >
                                Add User
                            </Button>
                        </Box>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                                <UserTable
                                    users={filteredUsers}
                                    onEdit={(userId) => {
                                        handleOpenEdits(userId);
                                        setOpenEdit(true);
                                    }}
                                    onDelete={handleDeleteUser}
                                />

                        )}
                    </CardContent>
                </Card>
            </section>
            <UserModal
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                user={newUser}
                setUser={setNewUser}
                handleSave={handleSaveAdd}
                isEdit={false}
            />

            <UserModal
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                user={editedUser}
                setUser={setEditedUser}
                handleSave={handleSaveEdit}
                isEdit={true}
            />
        </>
    );
};

export default Users;
