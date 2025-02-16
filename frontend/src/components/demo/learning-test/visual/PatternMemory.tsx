// src/components/demo/learning-test/visual/PatternMemory.tsx
import React, { useState, useEffect } from 'react';
import { ActivityWrapper } from '../ActivityWrapper';
import { ActivityScore } from '../types';
import { shuffle } from 'lodash';  // Para ordenar aleatoriamente

interface Pattern {
    id: string;
    color: string;
    position: number;
    displayPosition?: { x: number; y: number };  // Para posición "desordenada"
}

export const PatternMemory: React.FC<{ onComplete: (score: ActivityScore) => void }> = ({ onComplete }) => {
    const [phase, setPhase] = useState<'initial' | 'memorize' | 'recreate'>('initial');
    const [selectedShapes, setSelectedShapes] = useState<Pattern[]>([]);
    const [originalPattern, setOriginalPattern] = useState<Pattern[]>([]);
    const [availableShapes, setAvailableShapes] = useState<Pattern[]>([]);

    // Generar patrón aleatorio
    const generateRandomPattern = () => {
        const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];
        return shuffle(colors.map((color, index) => ({
            id: `original-${index}`,
            color,
            position: index
        })));
    };

    // Generar posiciones "desordenadas"
    const generateScatteredPositions = (shapes: Pattern[]) => {
        return shapes.map(shape => ({
            ...shape,
            displayPosition: {
                x: Math.random() * 20 - 10,  // -10px a +10px
                y: Math.random() * 20 - 10   // -10px a +10px
            }
        }));
    };

    const handleStart = () => {
        const newPattern = generateRandomPattern();
        setOriginalPattern(newPattern);
        setPhase('memorize');

        // Configurar la fase de recreación después de 10 segundos
        setTimeout(() => {
            setPhase('recreate');
            setAvailableShapes(generateScatteredPositions([...newPattern]));
        }, 5000);
    };

    const handleShapeClick = (selectedShape: Pattern) => {
        if (phase === 'recreate' && selectedShapes.length < 4) {
            setSelectedShapes([...selectedShapes, {
                ...selectedShape,
                position: selectedShapes.length
            }]);
        }
    };

    const handleReset = () => {
        setSelectedShapes([]);
    };

    const handleSubmit = () => {
        let correct = 0;
        selectedShapes.forEach((shape, index) => {
            if (shape.color === originalPattern[index].color) {
                correct++;
            }
        });

        const accuracy = Math.floor((correct / 4) * 3); // 0-3 scale
        onComplete({
            accuracy,
            timeBonus: 2,  // Este valor vendrá del ActivityWrapper
            total: calculateTotal(accuracy, 2)  // Función de utilidad que proporcionamos antes
        });
    };

    return (
        <ActivityWrapper
            title="Memoria de Patrones"
            instruction={
                phase === 'initial' ? "Haz clic en 'Comenzar' cuando estés listo" :
                    phase === 'memorize' ? "Memoriza el patrón de colores. Tienes 10 segundos." :
                        "Recrea el patrón haciendo clic en los colores en el orden correcto."
            }
            timeLimit={120}
            onComplete={onComplete}
            onStart={handleStart}
        >
            <div className="space-y-8">
                {phase === 'memorize' && (
                    <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                        {originalPattern.map((shape) => (
                            <div
                                key={shape.id}
                                className={`w-20 h-20 ${shape.color} rounded-lg shadow-md`}
                            />
                        ))}
                    </div>
                )}

                {phase === 'recreate' && (
                    <div className="space-y-6">
                        {/* Área de recreación */}
                        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                            {Array(4).fill(null).map((_, index) => {
                                const selected = selectedShapes[index];
                                return (
                                    <div
                                        key={`slot-${index}`}
                                        className={`w-20 h-20 rounded-lg shadow-md transition-colors ${selected ? selected.color : 'bg-gray-100'
                                            }`}
                                    />
                                );
                            })}
                        </div>

                        {/* Colores disponibles "desordenados" */}
                        <div className="relative h-40 max-w-md mx-auto">
                            {availableShapes.map((shape) => (
                                <button
                                    key={shape.id}
                                    onClick={() => handleShapeClick(shape)}
                                    disabled={selectedShapes.some(s => s.id === shape.id)}
                                    className={`
                    absolute w-16 h-16 ${shape.color} rounded-lg shadow-md 
                    hover:scale-105 transition-transform
                    ${selectedShapes.some(s => s.id === shape.id) ? 'opacity-50' : ''}
                  `}
                                    style={{
                                        transform: `translate(${shape.displayPosition?.x || 0}px, ${shape.displayPosition?.y || 0}px)`,
                                        left: `${(shape.position * 25) + 25}%`
                                    }}
                                />
                            ))}
                        </div>

                        {/* Botones de control */}
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Reiniciar
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={selectedShapes.length !== 4}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
                            >
                                Comprobar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ActivityWrapper>
    );
};

// Utility function
const calculateTotal = (accuracy: number, timeBonus: number): number => {
    return (accuracy * 0.7 + timeBonus * 0.3);
};