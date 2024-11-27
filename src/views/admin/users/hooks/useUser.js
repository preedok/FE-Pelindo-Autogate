// src/hooks/useUser.js
import  { useState, useEffect, useCallback } from 'react';
import api from '../../../../service/api';
import swal from 'sweetalert2';

const useUser = () => {
    const [dataUser, setDataUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
        role: [],
        // applicationId: ''
    });
    const [editedUser, setEditedUser] = useState({
        id: '',
        email: '',
        password: '',
        role: [],
        // applicationId: ''
    });
    const [error, setError] = useState(null);

    const getDataUser = useCallback(async () => {
        const token = localStorage.getItem('token');
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/User', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDataUser(response.data);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch user data.');
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch user data.',
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getDataUser();
    }, [getDataUser]);


    const handleAddUser = async () => {
        const token = localStorage.getItem('token');
        const requestBody = {
            ...newUser,
            role: newUser.role.join(','),
            created: new Date().toISOString(),
            token: "",
            changePassword: 0,
            lastChangePassword: null,
            failLogin: 0,
            lastFailLogin: new Date().toISOString(),
            resetPassword: 0,
            lastResetPassword: new Date().toISOString(),
            profileImage: null,
            locked: 0
        };

        try {
            const response = await api.post('/User', requestBody, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.status === 201) {
                swal.fire({
                    icon: 'success',
                    title: 'User Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                getDataUser();
                return true;
            } else if (response.status === 204) {
                swal.fire({
                    icon: 'success',
                    title: 'User Updated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                getDataUser();
                return true;
            }
        } catch (error) {
            console.error('Error adding user:', error);
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
                footer: error.response.data
            });
            getDataUser();
            return true;
        }
        return false; 
    };
    const handleUpdateUser = async () => {
        const token = localStorage.getItem('token');
        const requestBody = {
            ...editedUser,
            password: editedUser.password.trim() ? editedUser.password : "",
            role: editedUser.role.join(','),
            profileImage: null,
            locked: 0
        };

        try {
            const response = await api.put(`/User/${editedUser.id}`, requestBody, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.status === 200) {
                swal.fire({
                    icon: 'success',
                    title: 'User Updated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                getDataUser();
                return true; 
            } else if (response.status === 204) {
                swal.fire({
                    icon: 'success',
                    title: 'User Updated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                getDataUser();
                return true;
            }
        } catch (error) {
            console.error('Error updating user:', error);
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
                footer: error.response.data
            });
            getDataUser();
            return true;
        }
        return false; 
    };


    const handleDeleteUser = async (userId) => {
        const token = localStorage.getItem('token');
        const result = await swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await api.delete(`/User/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if (response.status === 204) {
                    swal.fire({
                        icon: 'success',
                        title: 'User Deleted Successfully',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    getDataUser();
                }
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                    footer: error.response.data
                });
            }
        }
    };

    const handleOpenEdit = async (userId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`/User/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const userData = response.data;
            setEditedUser({
                id: userData.id,
                email: userData.email,
                password: '',
                role: userData.role.split(','),
                // applicationId: userData.applicationId
            });
        } catch (error) {
            console.error('Error fetching user details:', error);
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch user details.',
            });
        }
    };

    // const handleRoleChange = (e, type, role) => {
    //     const selectedRoles = type === "add"
    //         ? newUser.role
    //         : editedUser.role;

    //     if (e.target.checked) {
    //         type === "add"
    //             ? setNewUser({ ...newUser, role: [...selectedRoles, role] })
    //             : setEditedUser({ ...editedUser, role: [...selectedRoles, role] });
    //     } else {
    //         type === "add"
    //             ? setNewUser({ ...newUser, role: selectedRoles.filter(r => r !== role) })
    //             : setEditedUser({ ...editedUser, role: selectedRoles.filter(r => r !== role) });
    //     }
    // };
    const handleRoleChange = (e, type, role) => {
        const allowedRoles = ['ADMINBC', 'CUSMOD', 'P2'];
        if (!allowedRoles.includes(role)) return;

        const selectedRoles = type === "add" ? newUser.role : editedUser.role;

        if (e.target.checked) {
            type === "add"
                ? setNewUser({ ...newUser, role: [...selectedRoles, role] })
                : setEditedUser({ ...editedUser, role: [...selectedRoles, role] });
        } else {
            type === "add"
                ? setNewUser({ ...newUser, role: selectedRoles.filter(r => r !== role) })
                : setEditedUser({ ...editedUser, role: selectedRoles.filter(r => r !== role) });
        }
    };

    return {
        dataUser,
        loading,
        newUser,
        setNewUser,
        editedUser,
        setEditedUser,
        getDataUser,
        handleAddUser,
        handleUpdateUser,
        handleDeleteUser,
        handleOpenEdit,
        handleRoleChange,
        error
    };
};

export default useUser;
