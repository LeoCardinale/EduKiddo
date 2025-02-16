import React, { useState } from 'react';
import {
    Camera,
    Upload,
    TextCursor,
    Mic,
    ChevronDown,
    Image,
    X
} from 'lucide-react';
import FileSelectModal from './FileSelectModal';

interface HomeworkSetupProps {
    onStartExercise: () => void;
}

const HomeworkSetup: React.FC<HomeworkSetupProps> = ({ onStartExercise }) => {
    const [showFileModal, setShowFileModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingPhase, setLoadingPhase] = useState<'analyzing' | 'generating' | null>(null);

    const handleStartHomework = async () => {
        setIsLoading(true);
        setLoadingPhase('analyzing');

        // Simular análisis
        await new Promise(resolve => setTimeout(resolve, 3000));
        setLoadingPhase('generating');

        // Simular generación
        await new Promise(resolve => setTimeout(resolve, 3000));

        onStartExercise();
    };

    const handleFileSelect = (fileName: string) => {
        setSelectedFile(fileName);
        setShowFileModal(false);
    };

    return (
        <>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">
                    Preparemos el contenido
                </h1>

                {/* Selección de asignatura */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selecciona la asignatura:
                    </label>
                    <div className="relative">
                        <select
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 
                 focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                 rounded-md"
                            defaultValue="ciencias-naturales"
                            onChange={(e) => e.preventDefault()}  // Prevenir cambios
                        >
                            <option value="ciencias-naturales">Ciencias Naturales</option>
                            <option value="musica">Música</option>
                            <option value="matematicas">Matemáticas</option>
                            <option value="ingles">Inglés</option>
                            <option value="ciencias-sociales">Ciencias Sociales</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Tema principal */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Escribe el tema principal de la tarea que haremos hoy:
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md 
                             focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: El Sistema Solar"
                    />
                </div>

                {/* Opciones de entrada */}
                <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        Indica el contenido de la tarea de hoy
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                        <button className="flex flex-col items-center p-4 rounded-lg border-2 
                                         border-gray-200 hover:border-blue-500 hover:bg-blue-50 
                                         transition-colors">
                            <Camera className="w-8 h-8 text-blue-600 mb-2" />
                            <span className="text-sm text-gray-600">Tomar foto</span>
                        </button>

                        <button
                            onClick={() => setShowFileModal(true)}
                            className="flex flex-col items-center p-4 rounded-lg border-2 
                                     border-gray-200 hover:border-blue-500 hover:bg-blue-50 
                                     transition-colors"
                        >
                            <Upload className="w-8 h-8 text-blue-600 mb-2" />
                            <span className="text-sm text-gray-600">Subir archivo</span>
                        </button>

                        <button className="flex flex-col items-center p-4 rounded-lg border-2 
                                         border-gray-200 hover:border-blue-500 hover:bg-blue-50 
                                         transition-colors">
                            <TextCursor className="w-8 h-8 text-blue-600 mb-2" />
                            <span className="text-sm text-gray-600">Escribir texto</span>
                        </button>

                        <button className="flex flex-col items-center p-4 rounded-lg border-2 
                                         border-gray-200 hover:border-blue-500 hover:bg-blue-50 
                                         transition-colors">
                            <Mic className="w-8 h-8 text-blue-600 mb-2" />
                            <span className="text-sm text-gray-600">Instrucciones por voz</span>
                        </button>
                    </div>

                    {selectedFile && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Image className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm text-blue-600">
                                        Imagen cargada: {selectedFile}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setSelectedFile(null)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                </div>
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">
                        💡Asegúrate de incluir todo el material antes de empezar
                    </p>

                    {isLoading ? (
                        <div className="inline-flex items-center px-6 py-3 text-lg bg-blue-100 text-blue-800 rounded-lg">
                            {loadingPhase === 'analyzing' ? '🔎 Analizando...' : '⚙️ Generando...'}
                        </div>
                    ) : (
                        <button
                            onClick={handleStartHomework}
                            disabled={!selectedFile}
                            className={`px-6 py-3 text-lg rounded-lg transition-all ${selectedFile
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            ¡Empecemos los deberes! 🚀
                        </button>
                    )}
                </div>
            </div>

            {showFileModal && (
                <FileSelectModal
                    onClose={() => setShowFileModal(false)}
                    onSelect={handleFileSelect}
                />
            )}
        </>
    );
};

export default HomeworkSetup;