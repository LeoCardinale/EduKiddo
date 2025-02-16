// En ActivityWrapper.tsx
import React, { useState, useEffect } from 'react';
import { ActivityScore } from './types';
import { AlertTriangle } from 'lucide-react';

interface ActivityWrapperProps {
    title: string;
    instruction: string;
    timeLimit: number;
    onComplete: (score: ActivityScore) => void;
    onStart?: () => void;
    children: React.ReactNode;
}

export const ActivityWrapper: React.FC<ActivityWrapperProps> = ({
    title,
    instruction,
    timeLimit,
    onComplete,
    onStart,
    children
}) => {
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [isActive, setIsActive] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    // Efecto único al montar para simular el click en "Comenzar"
    useEffect(() => {
        const timer = setTimeout(() => {
            handleStart();
        }, 100); // Pequeño delay para asegurar que todo está renderizado

        return () => clearTimeout(timer);
    }, []); // Solo se ejecuta al montar

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            handleComplete({ accuracy: 0, timeBonus: 0, total: 0 });
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const handleStart = () => {
        setIsActive(true);
        setHasStarted(true);
        if (onStart) {
            onStart();
        }
    };

    const handleComplete = (score: ActivityScore) => {
        setIsActive(false);
        const timeBonus = calculateTimeBonus(timeLeft, timeLimit);
        onComplete({
            ...score,
            timeBonus,
            total: calculateTotal(score.accuracy, timeBonus)
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{instruction}</p>

                {/* Mensaje de demo */}
                <div className="bg-orange-50 border-l-4 border-orange-primary p-4 mb-6 rounded-r-lg">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-primary" />
                        <p className="text-orange-700 text-sm">
                            Esta actividad es una demostración y no es interactiva.
                            En la versión final podrás completarla.
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                    <span className="text-blue-600 font-medium">
                        Tiempo restante: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </span>
                    <button
                        onClick={handleStart}
                        disabled={true}
                        className="bg-gray-300 text-white px-4 py-2 rounded-md cursor-not-allowed opacity-50"
                    >
                        Comenzar
                    </button>
                </div>
            </div>

            <div className={`transition-opacity duration-300 ${hasStarted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="activity-area">
                    {children}
                </div>
            </div>
        </div>
    );
};

const calculateTimeBonus = (timeLeft: number, timeLimit: number): number => {
    const ratio = timeLeft / timeLimit;
    if (ratio >= 0.7) return 3;
    if (ratio >= 0.4) return 2;
    if (ratio >= 0.1) return 1;
    return 0;
};

const calculateTotal = (accuracy: number, timeBonus: number): number => {
    return (accuracy * 0.7 + timeBonus * 0.3);
};