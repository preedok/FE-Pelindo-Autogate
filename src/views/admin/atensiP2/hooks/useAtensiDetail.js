import { useState } from 'react';
import api from '../../../../service/api';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../../../../utils/token';

const useDetailView = () => {
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [loadingDetail, setLoadingDetail] = useState(false);

    const handleOpenDetail = async (id) => {
        const token = localStorage.getItem('token');
        setLoadingDetail(true);
        try {
            const response = await api.get(`/AtensiP2/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSelectedDetail(response.data);
            setOpenDetail(true);
        } catch (error) {
            console.error('Error fetching detail:', error);
            if (error.response && error.response.status === 401) {
                //TODO : handleUnauthorized();
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'An error occurred while fetching Atensi data. Unauthorized access.',
                });
                clearAuth();
                navigate('/login');
            }
            // Handle error (e.g., show error message to user)
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleCloseDetail = () => {
        setOpenDetail(false);
        setSelectedDetail(null);
    };

    return {
        openDetail,
        selectedDetail,
        loadingDetail,
        handleOpenDetail,
        handleCloseDetail,
    };
};

export default useDetailView;