import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Brain, Eye, Music, Book, Hand, ArrowRight } from 'lucide-react';

interface Kiddo {
    name: string;
    avatar: string;
}

interface TestResultsProps {
    kiddo: Kiddo;
    onContinue: () => void;
}

const TestResults: React.FC<TestResultsProps> = ({ kiddo, onContinue }) => {
    // Datos simulados de los resultados
    const learningStyles = [
        { type: 'Kinestésico', score: 85, icon: Hand, color: '#FF9800', description: 'Aprendes mejor a través del movimiento y la práctica' },
        { type: 'Visual', score: 70, icon: Eye, color: '#2196F3', description: 'Procesas muy bien la información a través de imágenes y diagramas' },
        { type: 'Auditivo', score: 45, icon: Music, color: '#4CAF50', description: 'Captas conceptos a través del sonido y el ritmo' },
        { type: 'Verbal', score: 40, icon: Book, color: '#9C27B0', description: 'Te ayuda leer y escribir sobre lo que aprendes' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
            <div className="max-w-4xl mx-auto results-container">
                {/* Encabezado */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-lg mb-6">
                        <Brain className="w-12 h-12 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        ¡{kiddo.name}, hemos descubierto tu superpoder de aprendizaje! 🎉
                    </h1>
                    <p className="text-lg text-gray-600">
                        Cada persona aprende de manera única y especial. ¡Veamos cómo aprendes tú!
                    </p>
                </div>

                {/* Gráfico de resultados */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Tus Estilos de Aprendizaje</h2>
                    <div className="h-64 w-full">
                        <ResponsiveContainer>
                            <BarChart data={learningStyles} layout="vertical" margin={{ left: 100 }}>  {/* Añadido margin left */}
                                <XAxis type="number" domain={[0, 100]} hide />
                                <YAxis
                                    dataKey="type"
                                    type="category"
                                    tick={{ fill: '#1a1a1a', fontSize: 14 }}  // Mostrar los nombres
                                    width={100}  // Espacio para los nombres
                                />
                                <Bar dataKey="score" radius={[0, 8, 8, 0]}>
                                    {learningStyles.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Explicación de resultados */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {learningStyles.map((style, index) => {
                        const Icon = style.icon;
                        return (
                            <div
                                key={style.type}
                                className={`bg-white rounded-lg p-6 shadow-md transform hover:scale-105 transition-transform
                  ${index === 0 || index === 1 ? 'border-2 border-' + style.color : ''}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full" style={{ backgroundColor: `${style.color}20` }}>
                                        <Icon className="w-6 h-6" style={{ color: style.color }} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-900">{style.type}</h3>
                                            <span className="text-sm font-medium" style={{ color: style.color }}>
                                                {style.score}%
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{style.description}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mensaje motivacional y CTA */}
                <div className="text-center bg-blue-50 rounded-xl p-8 mb-8">
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">
                        ¡Es hora de comenzar tu aventura! 🚀
                    </h3>
                    <p className="text-lg text-blue-700 mb-6">
                        Con EduKiddo, aprenderás de la manera que más te funciona.
                        Hemos preparado actividades especiales que se adaptan a tu forma única de aprender.
                    </p>
                    <button
                        onClick={onContinue}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg
                     text-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                        Comenzar mi aventura
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestResults;