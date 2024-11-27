import React, { useState, useEffect } from 'react';

const CameraConfigPanel = ({ gates, initialActiveCameras, onSave }) => {
    const [localActiveCameras, setLocalActiveCameras] = useState(initialActiveCameras);

    useEffect(() => {
        setLocalActiveCameras(initialActiveCameras);
    }, [initialActiveCameras]);

    const handleChange = (gateId, cameraId) => {
        setLocalActiveCameras(prev => ({
            ...prev,
            [`${gateId}_${cameraId}`]: !prev[`${gateId}_${cameraId}`]
        }));
    };

    const handleSelectAll = (gateId) => {
        const gate = gates.find(g => g.id === gateId);
        const allSelected = gate.cameras.every(camera => localActiveCameras[`${gateId}_${camera.id}`]);
        
        setLocalActiveCameras(prev => {
            const newState = { ...prev };
            gate.cameras.forEach(camera => {
                newState[`${gateId}_${camera.id}`] = !allSelected;
            });
            return newState;
        });
    };

    const handleSave = () => {
        onSave(localActiveCameras);
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gates.map((gate) => {
                    const allSelected = gate.cameras.every(camera => localActiveCameras[`${gate.id}_${camera.id}`]);
                    
                    return (
                        <div key={gate.id} className="bg-white rounded-lg shadow-md p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-semibold text-blue-600">{gate.name}</h3>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={allSelected}
                                        onChange={() => handleSelectAll(gate.id)}
                                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-400"
                                    />
                                    <span className="text-sm text-gray-600">Select All</span>
                                </label>
                            </div>
                            <div className="space-y-2">
                                {gate.cameras.map((camera) => (
                                    <label key={camera.id} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={localActiveCameras[`${gate.id}_${camera.id}`] || false}
                                            onChange={() => handleChange(gate.id, camera.id)}
                                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-400"
                                        />
                                        <span className="text-gray-700">{camera.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-6 flex justify-end">
                <button 
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default CameraConfigPanel;