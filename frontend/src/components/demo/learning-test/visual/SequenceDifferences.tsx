// src/components/demo/learning-test/visual/SequenceDifferences.tsx
import React from 'react';
import { ActivityWrapper } from '../ActivityWrapper';
import { Circle, Square, Triangle, Star } from 'lucide-react';

const SYMBOLS = {
    circle: Circle,
    square: Square,
    triangle: Triangle,
    star: Star
};

export const SequenceDifferences: React.FC<{ onComplete: (score: any) => void }> = ({ onComplete }) => {
    // Este es solo el UI, sin funcionalidad aún
    return (
        <ActivityWrapper
            title="Encuentra las Diferencias"
            instruction="Compara las dos secuencias y encuentra las 3 diferencias haciendo clic en los símbolos que son diferentes."
            timeLimit={120}
            onComplete={onComplete}
        >
            <div className="space-y-12 max-w-2xl mx-auto p-4">
                {/* Primera secuencia */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Secuencia 1</h3>
                    <div className="flex justify-center gap-6">
                        {['circle', 'square', 'triangle', 'star', 'circle', 'triangle', 'circle', 'triangle'].map((symbol, index) => {
                            const IconComponent = SYMBOLS[symbol as keyof typeof SYMBOLS];
                            return (
                                <div
                                    key={`seq1-${index}`}
                                    className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors"
                                >
                                    <IconComponent className="w-8 h-8 text-blue-600" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Segunda secuencia */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Secuencia 2</h3>
                    <div className="flex justify-center gap-6">
                        {['circle', 'triangle', 'triangle', 'star', 'circle', 'star', 'square', 'triangle'].map((symbol, index) => {
                            const IconComponent = SYMBOLS[symbol as keyof typeof SYMBOLS];
                            return (
                                <div
                                    key={`seq2-${index}`}
                                    className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors"
                                >
                                    <IconComponent className="w-8 h-8 text-blue-600" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Contador de diferencias encontradas */}
                <div className="text-center">
                    <span className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full">
                        Diferencias encontradas: 0/3
                    </span>
                </div>
            </div>
        </ActivityWrapper>
    );
};