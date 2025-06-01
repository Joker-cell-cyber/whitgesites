import React from 'react';

interface ProcessingLoaderProps {
    message?: string;
}

const ProcessingLoader: React.FC<ProcessingLoaderProps> = ({ message = "Processing your order..." }) => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-notion-accent-200">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-notion-accent-500 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Please wait...</h3>
                <p className="text-gray-600">{message}</p>
            </div>
        </div>
    );
};

export default ProcessingLoader; 