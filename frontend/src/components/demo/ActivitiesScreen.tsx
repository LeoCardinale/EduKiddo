// src/components/demo/ActivitiesScreen.tsx
import { BookOpen, BookCheck, Gamepad2, Backpack, Brain } from 'lucide-react';
import { Kiddo } from '@/types/demo';

interface ActivityOption {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    disabled?: boolean;
    action?: () => void;
}

interface ActivitiesScreenProps {
    kiddo: Kiddo;
    onActivitySelect: (activityId: string) => void;
    testCompleted?: boolean;
    testResults?: {
        primaryStyle: string;
        secondaryStyle?: string;
    };
    homeworkCompleted?: boolean;
}

const ActivityButton: React.FC<{ activity: ActivityOption }> = ({ activity }) => {
    const Icon = activity.icon;
    return (
        <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-50">
                <Icon className="h-6 w-6 text-blue-500" />
            </div>
            <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                    {activity.title}
                </h3>
                <p className="text-sm text-gray-500">
                    {activity.description}
                </p>
            </div>
        </div>
    );
};

export const ActivitiesScreen: React.FC<ActivitiesScreenProps> = ({
    kiddo,
    onActivitySelect,
    testCompleted,
    testResults,
    homeworkCompleted
}) => {
    const activities = [
        {
            id: 'exam-prep',
            title: 'Estudiar',
            description: 'Aprende y practica para tu próximo examen',
            icon: BookOpen,
            action: () => onActivitySelect('exam-prep'),
            disabled: !homeworkCompleted
        },
        {
            id: 'homework',
            title: 'Deberes',
            description: 'Te ayudo con tus deberes escolares',
            icon: BookCheck,
            action: () => onActivitySelect('homework'),
            disabled: !testCompleted
        },
        {
            id: 'minigames',
            title: 'Minijuegos',
            description: 'Refuerza habilidades mientras te diviertes',
            icon: Gamepad2,
            disabled: true
        },
        {
            id: 'backpack',
            title: 'Mochila',
            description: 'Tus recursos y progreso',
            icon: Backpack,
            action: () => onActivitySelect('backpack'),
            disabled: !homeworkCompleted
        },
        {
            id: 'learning-test',
            title: 'Test de Aprendizaje',
            description: 'Descubre tu estilo de aprendizaje',
            icon: Brain,
            action: () => onActivitySelect('learning-test'),
            disabled: testCompleted
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    ¡Hola {kiddo.name}! 👋
                </h2>
                <p className="text-gray-600">
                    ¿Qué te gustaría hacer hoy?
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Primeras 4 actividades en grid 2x2 */}
                {activities.slice(0, 4).map((activity) => (
                    <button
                        key={activity.id}
                        onClick={() => activity.action && activity.action()}
                        disabled={activity.disabled}
                        className={`
            w-full text-left p-6 rounded-lg border-2 transition-all
            ${activity.id === 'homework' ? 'homework-button' : ''}  // Añadido homework-button
            ${activity.disabled
                                ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50'
                                : 'border-blue-200 bg-white hover:border-blue-500 hover:shadow-md'}
        `}
                    >
                        <ActivityButton activity={activity} />
                    </button>
                ))}

                {/* Test de Aprendizaje ocupando ancho completo */}
                <button
                    onClick={() => activities[4].action && activities[4].action()}
                    className="col-span-2 w-full text-left p-6 rounded-lg border-2 border-blue-200 
                         bg-white hover:border-blue-500 hover:shadow-md transition-all
                         learning-test-button"
                    disabled={activities[4].disabled}
                >
                    <div className="flex justify-between items-start">
                        <ActivityButton activity={activities[4]} />
                        {testCompleted && testResults && (
                            <div className="text-sm bg-blue-50 px-4 py-2 rounded-lg">
                                <p className="font-medium text-blue-800">Resultado:</p>
                                <p className="text-blue-600 font-bold font-large">{testResults.primaryStyle}</p>
                            </div>
                        )}
                    </div>
                </button>
            </div>
        </div>
    );
};