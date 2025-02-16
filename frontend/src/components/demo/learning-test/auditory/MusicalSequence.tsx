//src/components/demo/learning-test/auditory/MusicalSequence.tsx
import React from 'react';
import { ActivityWrapper } from '../ActivityWrapper';
import { Music, Play, Piano, Guitar, Drum, Mic } from 'lucide-react';

const INSTRUMENTS = [
    { id: 'piano', name: 'Piano', icon: Piano },
    { id: 'guitar', name: 'Guitarra', icon: Guitar },
    { id: 'drums', name: 'Batería', icon: Drum },
    { id: 'voice', name: 'Voz', icon: Mic },
];

export const MusicalSequence: React.FC<{ onComplete: (score: any) => void }> = ({ onComplete }) => {
    return (
        <ActivityWrapper
            title="Secuencia Musical"
            instruction="Escucha la secuencia de sonidos y luego ordena los instrumentos en el orden correcto."
            timeLimit={120}
            onComplete={onComplete}
        >
            <div className="max-w-2xl mx-auto p-4 space-y-8">
                {/* Reproductor de secuencia */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <Music className="w-8 h-8 text-blue-500" />
                        <h3 className="text-lg font-medium">Secuencia original</h3>
                    </div>

                    <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto">
                        <Play className="w-5 h-5" />
                        Reproducir secuencia
                    </button>
                </div>

                {/* Área de ordenamiento */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium mb-4 text-center">Ordena los instrumentos</h3>

                    {/* Zona de respuesta */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        {[1, 2, 3, 4].map((position) => (
                            <div
                                key={position}
                                className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
                            >
                                <span className="text-gray-400">#{position}</span>
                            </div>
                        ))}
                    </div>

                    {/* Instrumentos disponibles */}
                    <div className="grid grid-cols-4 gap-4">
                        {INSTRUMENTS.map((instrument) => {
                            const Icon = instrument.icon;
                            return (
                                <div
                                    key={instrument.id}
                                    className="aspect-square bg-blue-50 rounded-lg p-4 cursor-pointer hover:bg-blue-100 transition-colors"
                                >
                                    <div className="h-full flex flex-col items-center justify-center gap-2">
                                        <Icon className="w-8 h-8 text-blue-600" />
                                        <span className="text-sm text-blue-700">{instrument.name}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Controles */}
                <div className="flex justify-center gap-4">
                    <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                        Reiniciar
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Comprobar
                    </button>
                </div>
            </div>
        </ActivityWrapper>
    );
};