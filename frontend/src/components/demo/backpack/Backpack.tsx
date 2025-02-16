// En src/components/demo/backpack/Backpack.tsx
import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';

interface CompletedHomework {
    id: string;
    title: string;
    date: string;
    subject: string;
}

interface BackpackProps {
    items: Array<{
        id: string;
        title: string;
        date: string;
        subject: string;
    }>;
    onViewHomework: (homeworkId: string) => void;
    onBack: () => void;
}

const Backpack: React.FC<BackpackProps> = ({ items, onViewHomework, onBack }) => {
    const subjects = [
        'Ciencias Naturales',
        'Matemáticas',
        'Inglés',
        'Ciencias Sociales',
        'Música'
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Mi Mochila</h1>
                <button
                    onClick={onBack}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 
                             bg-gray-100 hover:bg-gray-200 rounded-lg 
                             transition-colors"
                >
                    Volver al Dashboard
                </button>
            </div>

            <div className="space-y-8">
                {subjects.map(subject => {
                    const subjectHomework = items.filter(hw => hw.subject === subject);

                    return (
                        <div key={subject} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="px-6 py-4 bg-blue-50 border-b flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-blue-900">
                                    {subject}
                                </h2>
                                {subjectHomework.length > 0 && (
                                    <span className="text-sm text-blue-600">
                                        {subjectHomework.length} {subjectHomework.length === 1 ? 'tarea' : 'tareas'}
                                    </span>
                                )}
                            </div>

                            <div className="p-6">
                                {subjectHomework.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {subjectHomework.map(homework => (
                                            <button
                                                key={homework.id}
                                                onClick={() => onViewHomework(homework.id)}
                                                className="flex flex-col items-center p-4 rounded-lg 
                                                         border-2 border-gray-200 hover:border-blue-500 
                                                         hover:bg-blue-50 transition-colors group"
                                            >
                                                <div className="mb-2 relative">
                                                    <FileText className="w-12 h-12 text-blue-500" />
                                                    <ChevronRight className="w-4 h-4 absolute -right-1 top-1/2 -translate-y-1/2 
                                                                          opacity-0 group-hover:opacity-100 transition-opacity 
                                                                          text-blue-600" />
                                                </div>
                                                <span className="text-sm text-gray-900 text-center mb-1">
                                                    {homework.title}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {homework.date}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">
                                        Aún no hay tareas completadas
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Backpack;