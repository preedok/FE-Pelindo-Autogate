import React from 'react';
import useCCTVImage from '../hooks/useCCTVImage';

const CCTVDisplay = ({ gateId, gateName, cameraId, cameraName, autoRefresh, onCCTVClick }) => {
    const { imageUrl, timestamp, error } = useCCTVImage(gateId, cameraId, autoRefresh);

    return (
        <div 
            className="cctv-container relative border rounded-lg overflow-hidden cursor-pointer" 
            style={{ paddingTop: '56.25%' }} // 16:9 aspect ratio
            onClick={() => onCCTVClick(gateId, cameraId, gateName, cameraName)}
        >
            <div className="absolute top-0 left-0 right-0 text-sm font-medium p-2 bg-gray-200 z-10">
                <div className="font-bold">{gateName}</div>
                <div>{cameraName}</div>
            </div>
            <div className="absolute inset-0 mt-16"> {/* Adjust for larger header */}
                {imageUrl ? (
                    <img 
                        src={imageUrl} 
                        alt={`CCTV Feed - ${gateName}, ${cameraName}`} 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500">
                        {error ? <div className="text-red-500">{error}</div> : 'Loading CCTV feed...'}
                    </div>
                )}
            </div>
            {imageUrl && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                    {timestamp}
                </div>
            )}
        </div>
    );
};

export default CCTVDisplay;