import React from 'react';
import CCTVDisplay from './CCTVDisplay';

const PopupCCTV = ({ popupCCTV, autoRefresh, onClose }) => (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
    >
        <div 
            className="bg-white rounded-lg w-full max-w-4xl h-auto max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-bold">{`${popupCCTV.cameraName} (Gate ${popupCCTV.gateId})`}</h3>
                <button 
                    onClick={onClose}
                    className="text-2xl hover:text-gray-700 transition-colors"
                    aria-label="Close"
                >
                    &times;
                </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
                <div className="mb-4 bg-gray-100 p-4 rounded flex flex-wrap justify-between items-center">
                    <div className="flex-1 min-w-[200px] mb-2 md:mb-0">
                        <p><strong>Gate ID:</strong> {popupCCTV.gateId}</p>
                    </div>
                    <div className="flex-1 min-w-[200px] mb-2 md:mb-0">
                        <p><strong>Camera ID:</strong> {popupCCTV.cameraId}</p>
                    </div>
                    <div className="flex-1 min-w-[200px] mb-2 md:mb-0">
                        <p><strong>Camera Name:</strong> {popupCCTV.cameraName}</p>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <p><strong>Auto Refresh:</strong> {autoRefresh ? 'On' : 'Off'}</p>
                    </div>
                </div>
                <div className="aspect-w-16 aspect-h-9">
                    <CCTVDisplay 
                        gateId={popupCCTV.gateId}
                        cameraId={popupCCTV.cameraId}
                        cameraName={popupCCTV.cameraName}
                        autoRefresh={autoRefresh}
                        onCCTVClick={() => {}}
                    />
                </div>
            </div>
            <div className="p-4 border-t text-right">
                <button
                    onClick={onClose}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
);

export default PopupCCTV;