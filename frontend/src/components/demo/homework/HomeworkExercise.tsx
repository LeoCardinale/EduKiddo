// En src/components/demo/homework/HomeworkExercise.tsx
import React from 'react';
import { LightbulbIcon } from 'lucide-react';
import AudioParagraph from './AudioParagraph';

interface HomeworkExerciseProps {
    onComplete?: () => void;
    viewMode?: boolean;
    onBack?: () => void;
}

const HomeworkExercise: React.FC<HomeworkExerciseProps> = ({ onComplete, viewMode, onBack }) => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {/* Tooltip fijo */}
            <div className="fixed left-4 top-1/2 transform -translate-y-1/2 w-64 
                          bg-blue-50 border-l-4 border-blue-500 rounded-r-lg 
                          shadow-lg p-4 z-50">
                <p className="text-sm text-blue-700">
                    Esta interfaz será mucho más interactiva en el producto final,
                    con un sistema de feedback rápido con el estudiante para saber
                    su nivel de conocimiento y luego ofrecer asistencia en los
                    puntos donde más se necesita.
                </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Enunciado del ejercicio */}
                <div className="border-b bg-blue-50 p-6">
                    <AudioParagraph
                        text='Ejercicio: "Representa con un dibujo por qué hay día y noche en la Tierra"'
                        audioSrc="/audios/ejercicio.mp3"
                        className="text-xl font-bold text-blue-900"
                    />
                </div>

                {/* Contenido generado */}
                <div className="p-6 space-y-6">
                    <div className="prose max-w-none">
                        <AudioParagraph
                            text="El Sol siempre está alumbrando a la Tierra, pero como nuestro planeta 
                                  está girando constantemente, una parte recibe luz (día) mientras la 
                                  otra está en sombra (noche). ¡Vamos a verlo!"
                            audioSrc="/audios/explicacion.mp3"
                            className="text-lg"
                        />

                        <div className="bg-yellow-50 rounded-lg p-6 my-6">
                            <h3 className="text-lg font-bold text-yellow-800 mb-4">
                                Hagamos un experimento:
                            </h3>
                            <ol className="list-decimal pl-4 space-y-2 text-yellow-900">
                                <li>Sostén una naranja (o cualquier pelota pequeña): ese será nuestro <strong>Planeta Tierra</strong></li>
                                <li>En este <strong>Planeta Tierra</strong>, marca un punto con tu lápiz (o con tu dedo): ¡esa es tu <strong>Casa</strong>!</li>
                                <li>Pide a tu tutor que te encienda la linterna de un teléfono móvil como si fuera el <strong>Sol</strong> y apunta al <strong>Planeta</strong>, ahora gira lentamente este <strong>Planeta</strong></li>
                                <li>¿Ves cómo tu <strong>Casa</strong> pasa del día a la noche?</li>
                            </ol>
                        </div>

                        <h3 className="font-bold text-lg text-blue-900">Resuelve el ejercicio:</h3>
                        <p>
                            Ahora que has entendido cómo funciona, realiza un dibujo del experimento
                            que acabamos de hacer.
                        </p>

                        <div className="bg-blue-50 rounded-lg p-6 mt-6">
                            <h4 className="flex items-center gap-2 font-bold text-blue-900 mb-3">
                                <LightbulbIcon className="w-5 h-5" />
                                Tips:
                            </h4>
                            <ul className="list-disc pl-4 space-y-1 text-blue-800">
                                <li>Asegúrate de incluir el Sol y el Planeta Tierra</li>
                                <li>Puedes utilizar color amarillo para dibujar los rayos de luz</li>
                                <li>Señala en el dibujo del Planeta Tierra dónde está el día y dónde está la noche</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Botón condicional */}
                <div className="p-6 border-t bg-gray-50 text-center">
                    {viewMode ? (
                        <button
                            onClick={onBack}  // Usando onBack en lugar de window.history.back()
                            className="px-6 py-3 text-lg bg-gray-500 text-white rounded-lg 
                                 hover:bg-gray-600 transition-colors shadow-sm"
                        >
                            Volver
                        </button>
                    ) : (
                        <button
                            onClick={onComplete}
                            className="px-6 py-3 text-lg bg-green-500 text-white rounded-lg 
                                 hover:bg-green-600 transition-colors shadow-sm"
                        >
                            ¡Completado! ✅
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeworkExercise;