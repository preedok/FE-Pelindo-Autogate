import { useState, useEffect } from 'react';
import api from '../../../../service/api';
import swal from "sweetalert";
import { clearAuth } from "../../../../utils/token";
import { useNavigate } from "react-router-dom";

const useHistoryData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [inputValue, setInputValue] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const formatDate = (date, isEnd = false) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = isEnd ? '23' : '00';
            const minutes = isEnd ? '59' : '00';
            return `${day}-${month}-${year} ${hours}:${minutes}`;
        };

        const now = new Date();
        setStartDate(formatDate(now));
        setEndDate(formatDate(now, true));
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        setLoading(true);
        setError(false);
        try {
            const response = await api.get(
                `/HoldReleaseHistory/filter?startDate=${startDate}&endDate=${endDate}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setData(response.data);
            return response.data; // Return the fetched data
        } catch (error) {
            console.error("Error fetching data: ", error);
            if (error.response && error.response.status === 401) {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'An error occurred while fetching History or Unauthorized access.',
                });
                clearAuth();
                navigate('/login');
            } else {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'An error occurred while fetching History.',
                });
            }
            setError(true);
            return []; // Return an empty array in case of error
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(
                '/HoldReleaseHistory/users',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users: ", error);
            if (error.response && error.response.status === 401) {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'An error occurred while fetching users or Unauthorized access.',
                });
                clearAuth();
                navigate('/login');
            } else {
                swal({
                    icon: 'error',
                    title: 'Failed',
                    text: 'An error occurred while fetching users.',
                });
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (Array.isArray(data)) {
            const regEx = new RegExp(inputValue, "i");
            const results = data.filter((item) => {
                return (
                    regEx.test(item.username) ||
                    regEx.test(item.aktivitas) ||
                    regEx.test(item.tanggal)
                );
            });
            setFilteredData(results);
        } else {
            console.error("Data is not an array:", data);
            setFilteredData([]);
        }
    }, [inputValue, data]);

    return {
        data,
        loading,
        error,
        startDate,
        endDate,
        inputValue,
        filteredData,
        users,
        setStartDate,
        setEndDate,
        setInputValue,
        fetchData
    };
};

export default useHistoryData;
