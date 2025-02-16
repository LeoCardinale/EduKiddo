//src/components/demo/learning-test/verbal/WordCategories.tsx
import React from 'react';
import { ActivityWrapper } from '../ActivityWrapper';
import { Book, Leaf, PawPrint, Car, Menu } from 'lucide-react';

const CATEGORIES = [
    {
        id: 'animals',
        name: 'Animales',
        icon: PawPrint,
        color: 'bg-orange-100 border-orange-300',
        iconColor: 'text-orange-500'
    },
    {
        id: 'nature',
        name: 'Naturaleza',
        icon: Leaf,
        color: 'bg-green-100 border-green-300',
        iconColor: 'text-green-500'
    },
    {
        id: 'transport',
        name: 'Transporte',
        icon: Car,
        color: 'bg-blue-100 border-blue-300',
        iconColor: 'text-blue-500'
    },
    {
        id: 'school',
        name: 'Escuela',
        icon: Book,
        color: 'bg-purple-100 border-purple-300',
        iconColor: 'text-purple-500'
    }
];

const WORDS = [
    'delfín',
    'montaña',
    'lápiz',
    'bicicleta',
    'tigre',
    'río',
    'autobús',
    'cuaderno'
];

export const WordCategories: React.FC<{ onComplete: (score: any) => void }> = ({ onComplete }) => {
    return (
        <ActivityWrapper
            title="Categorías de Palabras"
            instruction="Arrastra cada palabra a la categoría correcta."
            timeLimit={120}
            onComplete={onComplete}
        >
            <div className="max-w-4xl mx-auto p-4 space-y-8">
                {/* Categorías */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {CATEGORIES.map((category) => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={category.id}
                                className={`${category.color} border-2 rounded-lg p-4 min-h-[200px] flex flex-col items-center`}
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <Icon className={`w-6 h-6 ${category.iconColor}`} />
                                    <h3 className="font-medium">{category.name}</h3>
                                </div>

                                {/* Zona para soltar palabras */}
                                <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg bg-white/50 p-2 flex flex-col gap-2">
                                    {/* Aquí irían las palabras clasificadas */}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Palabras para clasificar */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                        <Menu className="w-5 h-5 text-blue-500" />
                        <h3 className="font-medium">Palabras para clasificar:</h3>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {WORDS.map((word, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-move transition-colors text-sm font-medium"
                            >
                                {word}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Barra de progreso */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Progreso</span>
                        <span className="text-sm font-medium">0 de 8 palabras</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full w-0 transition-all duration-500"></div>
                    </div>
                </div>
            </div>
        </ActivityWrapper>
    );
};