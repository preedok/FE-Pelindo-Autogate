import React, { useState, useCallback, useEffect } from 'react';
import { Helmet } from "react-helmet";
import ContentCard from "../../../components/common/Card/CardContent";
import CCTVDisplay from './components/CCTVDisplay';
import useCCTVGates from './hooks/useCCTVGates';
import PopupCCTV from './components/PopupCCTV';
import CameraConfigPanel from './components/CameraConfigPanel';

const CCTVMonitor = () => {
    const { gates, loading, error } = useCCTVGates();
    const [filter, setFilter] = useState('all');
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [popupCCTV, setPopupCCTV] = useState(null);
    const [cardSize, setCardSize] = useState(320);
    const [configOpen, setConfigOpen] = useState(false);
    const [activeCameras, setActiveCameras] = useState({});

    useEffect(() => {
        if (gates) {
            const initialActiveCameras = {};
            gates.forEach(gate => {
                gate.cameras.forEach(camera => {
                    initialActiveCameras[`${gate.id}_${camera.id}`] = true;
                });
            });
            setActiveCameras(initialActiveCameras);
        }
    }, [gates]);

    const handleSaveCameraConfig = (updatedActiveCameras) => {
        setActiveCameras(updatedActiveCameras);
        setConfigOpen(false);
    };

    const toggleAutoRefresh = useCallback(() => {
        setAutoRefresh(prev => !prev);
    }, []);

    const handleSizeChange = (e) => {
        setCardSize(Number(e.target.value));
    };

    const handleCCTVClick = (gateId, cameraId, gateName, cameraName) => {
        setPopupCCTV({ gateId, cameraId, gateName, cameraName });
    };

    const handleCameraChange = (gateId, cameraId, isChecked) => {
        setActiveCameras(prev => ({
            ...prev,
            [`${gateId}_${cameraId}`]: isChecked
        }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const filteredGates = gates.filter(gate => {
        if (filter === 'all') return true;
        if (filter === 'IN') return gate.name.startsWith('IN');
        if (filter === 'OUT') return gate.name.startsWith('O');
        return false;
    });

    return (
        <>
            <Helmet>
                <title>TPK AUTOGATE Monitoring | CCTV Monitor</title>
            </Helmet>
            <section className="p-6 mx-5 mt-[78px] rounded-lg w-full">
                <ContentCard>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
                        <h1 className="text-xl font-bold">Monitoring / CCTV</h1>
                        <div className="flex flex-wrap items-center space-x-2 sm:space-x-4">
                            <div className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-gray-600">
                                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                                    <circle cx="12" cy="13" r="3"/>
                                </svg>
                                <input 
                                    type="range"
                                    min="120"
                                    max="800"
                                    step="1"
                                    value={cardSize}
                                    onChange={handleSizeChange}
                                    className="w-24"
                                />
                                <span className="text-sm font-medium w-12">{cardSize}px</span>
                            </div>
                            <select 
                                value={filter} 
                                onChange={(e) => setFilter(e.target.value)}
                                className="p-2 border rounded"
                            >
                                <option value="all">All Gates</option>
                                <option value="IN">Gate In</option>
                                <option value="OUT">Gate Out</option>
                            </select>
                            <button 
                                onClick={toggleAutoRefresh}
                                className={`px-4 py-2 rounded whitespace-nowrap ${autoRefresh ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                            >
                                Auto Refresh: {autoRefresh ? 'ON' : 'OFF'}
                            </button>
                            <button 
                                onClick={() => setConfigOpen(true)}
                                className="px-4 py-2 rounded whitespace-nowrap bg-blue-500 text-white"
                            >
                                Configure Cameras
                            </button>
                        </div>
                    </div>
                    <div className="grid gap-4" style={{
                        gridTemplateColumns: `repeat(auto-fit, minmax(${cardSize}px, 1fr))`,
                        gridAutoRows: 'auto'
                    }}>
                        {filteredGates.flatMap((gate) => 
                            gate.cameras.map((camera) => (
                                activeCameras[`${gate.id}_${camera.id}`] && (
                                    <CCTVDisplay 
                                        key={`${gate.id}_camera_${camera.id}`}
                                        gateId={gate.id}
                                        gateName={gate.name}
                                        cameraId={camera.id}
                                        cameraName={camera.name}
                                        autoRefresh={autoRefresh}
                                        onCCTVClick={handleCCTVClick}
                                    />
                                )
                            ))
                        )}
                    </div>
                </ContentCard>
            </section>

            {popupCCTV && (
                <PopupCCTV 
                    popupCCTV={popupCCTV} 
                    autoRefresh={autoRefresh} 
                    onClose={() => setPopupCCTV(null)} 
                />
            )}

            {configOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Configure Cameras</h2>
                            <CameraConfigPanel 
                                gates={gates}
                                initialActiveCameras={activeCameras}
                                onSave={handleSaveCameraConfig}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CCTVMonitor;