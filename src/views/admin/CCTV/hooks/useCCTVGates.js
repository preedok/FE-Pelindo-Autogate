import { useState, useEffect, useCallback } from 'react';
import api from '../../../../service/api';

const useCCTVGates = () => {
    const [gates, setGates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGates = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get('/CCTV/gates');
            setGates(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching gates:', err);
            setError('Failed to load gates and cameras');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGates();
    }, [fetchGates]);

    // const refetch = () => {
    //     fetchGates();
    // };

    return { gates, loading, error };
};

export default useCCTVGates;