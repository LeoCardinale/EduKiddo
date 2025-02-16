// src/components/demo/homework/FileSelectModal.tsx
import React from 'react';
import { X, FileImage } from 'lucide-react';

interface FileSelectModalProps {
    onClose: () => void;
    onSelect: (fileName: string) => void;
}

const FileSelectModal: React.FC<FileSelectModalProps> = ({ onClose, onSelect }) => {
    const demoFile = {
        name: 'tarea_natural_science.jpg',
        type: 'image'
    };

    const handleSelect = () => {
        onSelect(demoFile.name);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl w-[500px]">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h3 className="text-lg font-medium">Seleccionar archivo</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    <div className="bg-gray-50 border rounded-lg p-4 mb-4 h-[200px] overflow-y-auto">
                        <div
                            className="flex items-center gap-3 p-2 rounded hover:bg-blue-50 cursor-pointer"
                            onClick={handleSelect}
                        >
                            <FileImage className="w-8 h-8 text-blue-500" />
                            <span className="text-sm">{demoFile.name}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSelect}
                        className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Subir archivo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileSelectModal;