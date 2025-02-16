//src/components/demo/learning-test/TestContainer.tsx
import React, { useState } from 'react';
import { PatternMemory } from './visual/PatternMemory';
import { SequenceDifferences } from './visual/SequenceDifferences';
import { MusicalSequence } from './auditory/MusicalSequence';
import { VisualRhyme } from './auditory/VisualRhyme';
import { WordCategories } from './verbal/WordCategories';
import { CompleteStory } from './verbal/CompleteStory';
import { FigureConstruction } from './kinesthetic/FigureConstruction';
import { MirrorTracing } from './kinesthetic/MirrorTracing';

import { ActivityScore, TestState } from './types';
import { ChevronRight } from 'lucide-react';

import TestResults from './TestResults';
import TourController, { tourSteps } from '../GuidedTour';

interface TestContainerProps {
    onComplete: () => void;
}

const TOTAL_ACTIVITIES = 8;

export const TestContainer: React.FC<TestContainerProps> = ({ onComplete }) => {
    const [state, setState] = useState<TestState>({
        currentActivity: 'intro',
        scores: [],
        kiddo: {
            name: 'Yudith',
            avatar: '👧'
        }
    });

    const getCurrentScreen = () => {
        console.log('Estado actual:', state.currentActivity);

        if (state.currentActivity === 'intro') {
            return 'learning-test';
        }
        if (state.currentActivity === 'results') {
            return 'test-results';
        }
        if (typeof state.currentActivity === 'number') {
            const activityScreens = [
                'pattern-memory',
                'sequence-differences',
                'musical-sequence',
                'visual-rhyme',
                'complete-story',
                'word-categories',
                'mirror-tracing',
                'figure-construction'
            ];
            const currentScreen = activityScreens[state.currentActivity];
            console.log('Pantalla de ejercicio actual:', currentScreen);
            return currentScreen;
        }
        return '';
    };


    const handleActivityComplete = (score: ActivityScore) => {
        setState(prev => ({
            ...prev,
            scores: [...prev.scores, score]
        }));
    };

    const handleNextTest = () => {
        setState(prev => {
            if (typeof prev.currentActivity === 'number') {
                if (prev.currentActivity >= TOTAL_ACTIVITIES - 1) {
                    return { ...prev, currentActivity: 'results' };
                }
                return { ...prev, currentActivity: prev.currentActivity + 1 };
            }
            return { ...prev, currentActivity: 0 };
        });
    };

    // Progress Tracker Component
    const ProgressTracker = () => (
        <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-3xl">{state.kiddo.avatar}</span>
                    <span className="font-medium text-gray-700">{state.kiddo.name}</span>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="text-sm">
                    <p className="text-gray-500">Progreso</p>
                    <p className="font-medium text-blue-600">
                        Actividad {typeof state.currentActivity === 'number' ? state.currentActivity + 1 : 0} de {TOTAL_ACTIVITIES}
                    </p>
                </div>
            </div>
        </div>
    );

    const renderCurrentActivity = () => {
        if (state.currentActivity === 'results') {
            return (
                <TestResults
                    kiddo={state.kiddo}
                    onContinue={handleContinueAfterResults}
                />
            );
        }
        switch (state.currentActivity) {
            case 0:
                return <PatternMemory onComplete={handleActivityComplete} />;
            case 1:
                return <SequenceDifferences onComplete={handleActivityComplete} />;
            case 2:
                return <MusicalSequence onComplete={handleActivityComplete} />;
            case 3:
                return <VisualRhyme onComplete={handleActivityComplete} />;
            case 4:
                return <WordCategories onComplete={handleActivityComplete} />;
            case 5:
                return <CompleteStory onComplete={handleActivityComplete} />;
            case 6:
                return <FigureConstruction onComplete={handleActivityComplete} />;
            case 7:
                return <MirrorTracing onComplete={handleActivityComplete} />;
            default:
                return (
                    <div className="text-center p-8">
                        <h2 className="text-2xl font-bold mb-4">¡Test completado!</h2>
                        {/* Aquí irían los resultados */}
                    </div>
                );
        }
    };

    const handleContinueAfterResults = () => {
        // Añadir query param al retornar
        window.history.pushState({}, '', '?testCompleted=true');
        onComplete();
    };

    return (
        <div className="relative min-h-screen pb-20">
            {tourSteps && (
                <TourController
                    steps={tourSteps}
                    currentScreen={getCurrentScreen()}
                    onComplete={() => setState(prev => ({ ...prev, showTour: false }))}
                />
            )}
            <div className="relative min-h-screen pb-20">
                {state.currentActivity === 'intro' ? (
                    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-8">
                        <div className="max-w-2xl text-center space-y-6">
                            <div className="text-6xl mb-8">{state.kiddo.avatar}</div>
                            <h1 className="text-3xl font-bold text-blue-800 mb-4">
                                ¡Bienvenida a tu Aventura de Aprendizaje, {state.kiddo.name}! 🌟
                            </h1>
                            <p className="text-lg text-blue-700 mb-6">
                                ¿Sabías que cada persona tiene su propia forma especial de aprender?
                                ¡Es como tener un superpoder único! Algunos aprenden mejor viendo,
                                otros escuchando, leyendo o haciendo cosas con sus manos.
                            </p>
                            <p className="text-lg text-blue-700 mb-8">
                                Estás a punto de embarcarte en una emocionante misión para descubrir
                                tu superpoder de aprendizaje. A través de una serie de divertidos
                                desafíos, revelaremos juntos cuál es tu estilo especial.
                            </p>
                            <button
                                onClick={() => setState(prev => ({ ...prev, currentActivity: 0 }))}
                                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium 
               hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg
               start-test-button"
                            >
                                ¡Comenzar mi Aventura! 🚀
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <ProgressTracker />
                        <div className="max-w-4xl mx-auto p-4">
                            {renderCurrentActivity()}
                        </div>
                        {typeof state.currentActivity === 'number' &&
                            state.currentActivity < TOTAL_ACTIVITIES && (
                                <div className="fixed bottom-8 right-8">
                                    <button
                                        onClick={handleNextTest}
                                        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 
                             transition-colors flex items-center gap-2"
                                    >
                                        Siguiente test
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                    </>
                )}
            </div>
        </div>
    );
};