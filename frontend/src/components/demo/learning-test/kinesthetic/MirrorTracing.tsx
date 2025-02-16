// src/components/demo/learning-test/kinesthetic/MirrorTracing.tsx
import React, { useRef, useState, useEffect } from 'react';
import { ActivityWrapper } from '../ActivityWrapper';
import { Pencil, RotateCcw } from 'lucide-react';

export const MirrorTracing: React.FC<{ onComplete: (score: any) => void }> = ({ onComplete }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lastPointRef = useRef<{ x: number; y: number } | null>(null);

    // Función para dibujar el modelo
    const drawModel = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        const centerX = canvas.width / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar línea central
        ctx.beginPath();
        ctx.strokeStyle = '#CBD5E0';
        ctx.setLineDash([5, 5]);
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Establecer estilo para el modelo
        ctx.strokeStyle = '#94A3B8';
        ctx.lineWidth = 2;

        // Dibujar el modelo solo en la mitad izquierda
        const leftHalfWidth = centerX;
        const margin = 50;

        // Dibujar una forma curva simple
        ctx.beginPath();
        ctx.moveTo(margin, margin);
        ctx.quadraticCurveTo(
            margin, canvas.height / 2,
            margin, canvas.height - margin
        );
        ctx.stroke();

        // Añadir algunos detalles al modelo
        ctx.beginPath();
        ctx.moveTo(margin, canvas.height / 2);
        ctx.lineTo(leftHalfWidth - margin, canvas.height / 2);
        ctx.stroke();
    };

    // Inicializar canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        drawModel(ctx, canvas);
    }, []);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Solo permitir dibujar en la mitad derecha
        if (x > canvas.width / 2) {
            setIsDrawing(true);
            lastPointRef.current = { x, y };
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !canvasRef.current || !lastPointRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Solo dibujar en la mitad derecha
        if (x > canvas.width / 2) {
            ctx.beginPath();
            ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
            ctx.lineTo(x, y);
            ctx.strokeStyle = '#2563EB';
            ctx.lineWidth = 2;
            ctx.stroke();

            lastPointRef.current = { x, y };
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        lastPointRef.current = null;
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        drawModel(ctx, canvas);
        lastPointRef.current = null;
    };

    return (
        <ActivityWrapper
            title="Trazos Espejo"
            instruction="Completa la mitad derecha de la figura para que sea simétrica."
            timeLimit={120}
            onComplete={onComplete}
        >
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}
                        className="border border-gray-200 rounded-lg w-full h-[400px] touch-none"
                        style={{ cursor: 'crosshair' }}
                    />
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={clearCanvas}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Borrar y empezar de nuevo
                    </button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                            <Pencil className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-medium text-blue-800 mb-1">Consejos para un buen trazo espejo:</h4>
                            <ul className="text-blue-700 text-sm space-y-1">
                                <li>• Observa cuidadosamente la forma del lado izquierdo</li>
                                <li>• Intenta hacer trazos suaves y continuos</li>
                                <li>• Fíjate en la distancia de cada línea respecto al centro</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </ActivityWrapper>
    );
};