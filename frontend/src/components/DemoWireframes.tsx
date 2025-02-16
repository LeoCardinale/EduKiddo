import React, { useState, useEffect } from 'react';
import { Lock, Mail } from 'lucide-react';
import { DemoState, DEMO_DATA, Kiddo } from '@/types/demo';
import { Header } from '@/components/demo/Header';
import { KiddosList } from '@/components/demo/KiddosList';
import { ActivitiesScreen } from '@/components/demo/ActivitiesScreen';
import { TestContainer } from '@/components/demo/learning-test/TestContainer';
import HomeworkSetup from './demo/homework/HomeworkSetup';
import HomeworkExercise from './demo/homework/HomeworkExercise';
import Backpack from './demo/backpack/Backpack';


interface DemoWireframesProps {
    tourActive: boolean;
    onScreenChange: (screen: string) => void;
}

interface ExtendedDemoState extends DemoState {
    homeworkCompleted?: boolean;
    backpackItems?: {
        id: string;
        title: string;
        date: string;
        subject: string;
    }[];
}

const DemoWireframes: React.FC<DemoWireframesProps> = ({ tourActive, onScreenChange }) => {
    const [state, setState] = useState<ExtendedDemoState>({
        currentScreen: 'login',
        homeworkCompleted: false,
        backpackItems: []
    });

    const handleViewHomework = (homeworkId: string) => {
        setState(prev => ({
            ...prev,
            currentScreen: 'view-homework',
            selectedHomeworkId: homeworkId
        }));
    };

    const handleBackToActivities = () => {
        setState(prev => ({
            ...prev,
            currentScreen: 'kiddo-dashboard'
        }));
    };

    const handleHomeworkComplete = () => {
        // Añadir la tarea a la mochila
        setState(prev => ({
            ...prev,
            homeworkCompleted: true,
            backpackItems: [
                ...(prev.backpackItems || []),
                {
                    id: Date.now().toString(),
                    title: 'Día y Noche en la Tierra',
                    date: new Date().toLocaleDateString(),
                    subject: 'Ciencias Naturales'
                }
            ],
            currentScreen: 'kiddo-dashboard'
        }));
    };

    // Añadir useEffect para notificar cambios de pantalla
    useEffect(() => {
        onScreenChange(state.currentScreen);
    }, [state.currentScreen, onScreenChange]);

    const handleReturnFromTest = () => {
        setState(prev => ({
            ...prev,
            currentScreen: 'kiddo-dashboard',
            testCompleted: true,
            testResults: {
                primaryStyle: 'Kinestésico',
                secondaryStyle: 'Visual'
            }
        }));
    };

    const handleLogin = () => {
        setState({
            currentScreen: 'kiddos-list',
            tutor: DEMO_DATA.tutor,
            kiddos: DEMO_DATA.kiddos
        });
    };

    const handleKiddoSelect = (kiddo: Kiddo) => {
        setState(prev => ({
            ...prev,
            currentScreen: 'kiddo-dashboard',
            selectedKiddo: kiddo
        }));
    };

    const handleActivitySelect = (activityId: string) => {
        setState(prev => ({
            ...prev,
            currentScreen: activityId === 'learning-test' ? 'learning-test' :
                activityId === 'homework' ? 'homework-setup' :
                    activityId === 'backpack' ? 'backpack' :
                        'activity-details',
            selectedActivity: activityId
        }));
    };

    const handleStartExercise = () => {
        setState(prev => ({
            ...prev,
            currentScreen: 'homework-exercise'
        }));
    };

    const screens = {
        login: (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Logo and title */}
                    <div className="text-center space-y-6 mb-12">
                        <div className="font-nunito font-extrabold text-5xl">
                            <span className="text-[#1976D2]">EDU</span>
                            <span className="text-orange-primary">K</span>
                            <span className="text-[#03A9F4]">I</span>
                            <span className="text-[#00BCD4]">D</span>
                            <span className="text-[#00ACC1]">D</span>
                            <span className="text-orange-accent">O</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Inicia sesión
                        </h1>
                    </div>

                    {/* Login form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg space-y-6 login-form">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Usuario
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value="antonio@example.com"
                                        readOnly
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value="••••••••"
                                        readOnly
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleLogin}
                            className="w-full py-3 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200 shadow-sm"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </div>
            </div>
        ),
        'kiddos-list': state.tutor && state.kiddos && (
            <div className="min-h-screen bg-gray-50">
                <Header tutor={state.tutor} />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <KiddosList
                        kiddos={state.kiddos}
                        onKiddoSelect={handleKiddoSelect}
                        disabledKiddos={['2']}
                    />
                </main>
            </div>
        ),
        'kiddo-dashboard': state.selectedKiddo && (
            <div className="min-h-screen bg-gray-50">
                <Header tutor={state.tutor!} />
                <ActivitiesScreen
                    kiddo={state.selectedKiddo}
                    onActivitySelect={handleActivitySelect}
                    testCompleted={state.testCompleted}
                    testResults={state.testResults}
                    homeworkCompleted={state.homeworkCompleted}
                />
            </div>
        ),
        'learning-test': state.selectedKiddo && (
            <div className="min-h-screen bg-gray-50">
                <Header tutor={state.tutor!} />
                <TestContainer
                    onComplete={handleReturnFromTest}
                />
            </div>
        ),
        'homework-setup': state.selectedKiddo && (
            <div className="min-h-screen bg-gray-50">
                <Header tutor={state.tutor!} />
                <HomeworkSetup onStartExercise={handleStartExercise} />
            </div>
        ),
        'homework-exercise': state.selectedKiddo && (
            <div className="min-h-screen bg-gray-50">
                <Header tutor={state.tutor!} />
                <HomeworkExercise onComplete={handleHomeworkComplete} />
            </div>
        ),
        'backpack': state.selectedKiddo && (
            <div className="min-h-screen bg-gray-50">
                <Header tutor={state.tutor!} />
                <Backpack
                    items={state.backpackItems || []}
                    onViewHomework={handleViewHomework}
                    onBack={handleBackToActivities}
                />
            </div>
        ),
        'view-homework': state.selectedKiddo && (
            <div className="min-h-screen bg-gray-50">
                <Header tutor={state.tutor!} />
                <HomeworkExercise
                    viewMode={true}
                    onBack={() => setState(prev => ({
                        ...prev,
                        currentScreen: 'backpack'
                    }))}
                />
            </div>
        )
    };

    return screens[state.currentScreen as keyof typeof screens] || null;
};

export default DemoWireframes;