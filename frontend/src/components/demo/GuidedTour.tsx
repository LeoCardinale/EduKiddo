import React, { useState, useEffect } from 'react';
import { TourStep, tourSteps } from './tourSteps';

interface TooltipProps {
    step: TourStep;
    onNext?: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({ step, onNext }) => {
    if (step.fixed) {
        return (
            <div
                className="fixed w-64 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg shadow-lg p-4"
                style={{
                    left: '20px',  // Posición fija a la izquierda
                    top: '50%',    // Centro vertical
                    transform: 'translateY(-50%)',  // Ajuste para centrado vertical
                    zIndex: 50
                }}
            >
                <p className="text-gray-700">{step.content}</p>
            </div>
        );
    }

    return (
        <div
            className="fixed z-50 max-w-xs bg-white rounded-lg shadow-lg p-4"
            style={{
                top: step.position.top,
                left: step.position.left,
                transform: `translate(${step.position.translateX || '0'}, ${step.position.translateY || '0'})`,
                minWidth: '280px'
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="space-y-3">
                <p className="text-gray-700">{step.content}</p>
                <p className="text-blue-600 font-medium">
                    {step.nextAction}
                </p>
                <button
                    onClick={onNext}
                    className="w-full text-center py-2 text-sm font-medium text-gray-700
                             border border-gray-200 rounded-md hover:bg-gray-50
                             transition-colors active:bg-gray-100"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

interface TourControllerProps {
    steps: TourStep[];
    currentScreen: string;
    onComplete: () => void;
}

const TourController: React.FC<TourControllerProps> = ({ steps, currentScreen, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [currentPhase, setCurrentPhase] = useState('1');
    const [processedPhases, setProcessedPhases] = useState<Set<string>>(new Set());

    useEffect(() => {
        // Encontrar el paso que corresponde a la pantalla actual
        const matchingStep = steps.find(step => {
            // Si estamos en el dashboard y la fase es 14, solo coincide si testCompleted es true
            if (step.screen === 'kiddo-dashboard' && step.phase === '14') {
                return currentScreen === 'kiddo-dashboard' &&
                    !processedPhases.has(step.phase) &&
                    window.location.search.includes('testCompleted=true'); // Usaremos un query param para indicar el estado
            }

            return step.screen === currentScreen &&
                !processedPhases.has(step.phase) &&
                step.phase !== '14'; // Ignorar fase 14 en otros casos
        });

        if (matchingStep && matchingStep.phase) {
            setCurrentPhase(matchingStep.phase);
        }
    }, [currentScreen, steps, processedPhases]);

    useEffect(() => {
        console.log('TourController - Current Screen:', currentScreen);
        console.log('TourController - Current Phase:', currentPhase);

        const nextStepIndex = steps.findIndex(
            (step, index) => {
                const matches = step.screen === currentScreen &&
                    step.phase === currentPhase;
                console.log('Checking step:', {
                    stepScreen: step.screen,
                    currentScreen,
                    stepPhase: step.phase,
                    currentPhase,
                    matches
                });
                return matches;
            }
        );

        console.log('Next step index:', nextStepIndex);

        if (nextStepIndex !== -1) {
            setCurrentStep(nextStepIndex);
        }
    }, [currentScreen, currentPhase, steps]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setProcessedPhases(prev => new Set([...prev, currentPhase]));
            const nextStep = steps[currentStep + 1];
            setCurrentPhase(nextStep.phase);
            setCurrentStep(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const currentTourStep = steps[currentStep];

    if (!currentTourStep ||
        currentTourStep.screen !== currentScreen ||
        currentTourStep.phase !== currentPhase) {
        return null;
    }

    return (
        <>
            {!currentTourStep.fixed && (
                <div className="fixed inset-0 bg-black bg-opacity-30 z-40" />
            )}
            <Tooltip step={currentTourStep} onNext={handleNext} />
        </>
    );
};

export { tourSteps };
export default TourController;