import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorPopUpProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string;
}

const ErrorPopUp: React.FC<ErrorPopUpProps> = ({ 
    isOpen, 
    onClose, 
    title = "Error", 
    message 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-red-200">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{message}</p>
                    
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-notion-accent-500 text-white rounded-lg hover:bg-notion-accent-600 transition-colors font-medium"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPopUp; 