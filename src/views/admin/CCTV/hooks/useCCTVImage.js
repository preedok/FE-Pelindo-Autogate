import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../../../../service/api';

const useCCTVImage = (gateId, cameraId, autoRefresh) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [timestamp, setTimestamp] = useState(null);
    const [error, setError] = useState(null);
    const intervalIdRef = useRef(null);

    const fetchImage = useCallback(async () => {
        try {
            const response = await api.get(`/CCTV/latest-image/${gateId}/${cameraId}`, {
                responseType: 'blob'
            });
            const blob = new Blob([response.data], { type: 'image/jpeg' });
            setImageUrl(URL.createObjectURL(blob));
            setTimestamp(new Date().toLocaleString());
            setError(null);
        } catch (err) {
            console.error('Error fetching CCTV image:', err);
            setError('Failed to load CCTV feed');
        }
    }, [gateId, cameraId]);

    useEffect(() => {
        fetchImage(); // Fetch once immediately

        if (autoRefresh) {
            intervalIdRef.current = setInterval(fetchImage, 333);
        }

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        };
    }, [fetchImage, autoRefresh]);

    return { imageUrl, timestamp, error };
};

export default useCCTVImage;