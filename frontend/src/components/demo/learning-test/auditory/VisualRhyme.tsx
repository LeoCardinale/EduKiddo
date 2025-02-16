//src/components/demo/learning-test/auditory/VisualRhyme.tsx
import React from 'react';
import { ActivityWrapper } from '../ActivityWrapper';
import { Volume2 } from 'lucide-react';

interface RhymeCard {
    id: string;
    word: string;
    image: string;
    sound?: boolean;
}

export const VisualRhyme: React.FC<{ onComplete: (score: any) => void }> = ({ onComplete }) => {
    const centralWord: RhymeCard = {
        id: 'central',
        word: 'FLOR',
        image: '🌸'
    };

    const options: RhymeCard[] = [
        { id: '1', word: 'COLOR', image: '🎨' },
        { id: '2', word: 'TAMBOR', image: '🥁' },
        { id: '3', word: 'CASA', image: '🏠' },
        { id: '4', word: 'PERRO', image: '🐕' }
    ];

    return (
        <ActivityWrapper
            title="Rimas Visuales"
            instruction="Selecciona la imagen cuya palabra rime con la palabra central."
            timeLimit={120}
            onComplete={onComplete}
        >
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Palabra central */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="mb-4">
                        <span className="text-6xl mb-4">{centralWord.image}</span>
                        <div className="flex items-center justify-center gap-2">
                            <h3 className="text-2xl font-bold">{centralWord.word}</h3>
                            <button className="p-2 hover:bg-blue-50 rounded-full transition-colors">
                                <Volume2 className="w-5 h-5 text-blue-500" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Opciones de rima */}
                <div className="grid grid-cols-2 gap-4">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-center"
                        >
                            <span className="text-4xl mb-3 block">{option.image}</span>
                            <div className="flex items-center justify-center gap-2">
                                <span className="font-medium">{option.word}</span>
                                <Volume2 className="w-4 h-4 text-blue-500" />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Ayuda visual */}
                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-700 text-sm text-center">
                        Tip: Las palabras riman cuando terminan con el mismo sonido.
                        Por ejemplo: AMOR - CALOR
                    </p>
                </div>
            </div>
        </ActivityWrapper>
    );
};