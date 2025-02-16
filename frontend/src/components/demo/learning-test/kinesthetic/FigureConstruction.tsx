//src/components/demo/learning-test/kinesthetic/FigureConstruction.tsx
import React from 'react';
import { ActivityWrapper } from '../ActivityWrapper';
import { Square, Triangle, Circle, RotateCcw } from 'lucide-react';

export const FigureConstruction: React.FC<{ onComplete: (score: any) => void }> = ({ onComplete }) => {
    return (
        <ActivityWrapper
            title="Construcción de Figuras"
            instruction="Arrastra y gira las piezas para recrear la figura modelo."
            timeLimit={120}
            onComplete={onComplete}
        >
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Figura modelo */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Figura a construir:</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex justify-center">
                        {/* Cohete espacial hecho con formas básicas */}
                        <div className="relative w-48 h-64">
                            {/* Cuerpo del cohete */}
                            <div className="absolute top-16 left-12 w-24 h-40 bg-blue-200 rounded-lg opacity-50" />
                            {/* Punta del cohete */}
                            <div className="absolute top-0 left-16 w-0 h-0 
                  border-l-[32px] border-l-transparent
                  border-b-[48px] border-b-red-200
                  border-r-[32px] border-r-transparent
                  opacity-50" />
                            {/* Ventana circular */}
                            <div className="absolute top-24 left-20 w-12 h-12 bg-purple-200 rounded-full opacity-50" />
                            {/* Aletas laterales */}
                            <div className="absolute bottom-8 left-2 w-0 h-0 
                  border-t-[24px] border-t-transparent
                  border-r-[32px] border-r-orange-200
                  border-b-[24px] border-b-transparent
                  opacity-50" />
                            <div className="absolute bottom-8 right-2 w-0 h-0 
                  border-t-[24px] border-t-transparent
                  border-l-[32px] border-l-orange-200
                  border-b-[24px] border-b-transparent
                  opacity-50" />
                        </div>
                    </div>
                </div>

                {/* Área de construcción */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Tu área de trabajo:</h3>
                    <div className="border-2 border-gray-300 rounded-lg p-4 min-h-[200px] bg-gray-50 relative">
                        <div className="text-center text-gray-400">
                            Aquí aparecerán las piezas que arrastres
                        </div>
                    </div>
                </div>

                {/* Piezas disponibles */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Piezas disponibles:</h3>
                    <div className="flex flex-wrap gap-6 justify-center">
                        {/* Cuadrado */}
                        <div className="group relative">
                            <div className="w-16 h-16 bg-blue-200 rounded-lg cursor-move 
                           hover:shadow-lg transition-all hover:scale-105">
                            </div>
                            <button className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow
                             flex items-center justify-center opacity-0 group-hover:opacity-100
                             transition-opacity">
                                <RotateCcw className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>

                        {/* Triángulo */}
                        <div className="group relative">
                            <div className="w-16 h-16 flex items-center justify-center cursor-move
                           hover:shadow-lg transition-all hover:scale-105">
                                <div className="w-0 h-0 
                             border-l-[32px] border-l-transparent
                             border-b-[48px] border-b-red-200
                             border-r-[32px] border-r-transparent">
                                </div>
                            </div>
                            <button className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow
                             flex items-center justify-center opacity-0 group-hover:opacity-100
                             transition-opacity">
                                <RotateCcw className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>

                        {/* Círculo */}
                        <div className="group relative">
                            <div className="w-16 h-16 bg-purple-200 rounded-full cursor-move 
                           hover:shadow-lg transition-all hover:scale-105">
                            </div>
                            <button className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow
                             flex items-center justify-center opacity-0 group-hover:opacity-100
                             transition-opacity">
                                <RotateCcw className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Ayuda visual */}
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-blue-700 text-sm">
                        Tip: Puedes girar las piezas usando el botón circular que aparece al pasar el mouse sobre ellas
                    </p>
                </div>
            </div>
        </ActivityWrapper>
    );
};