//src/components/demo/learning-test/verbal/CompleteStory.tsx
import React, { useState } from 'react';
import { ActivityWrapper } from '../ActivityWrapper';
import { Book, CheckCircle } from 'lucide-react';

interface StoryOption {
    id: string;
    text: string;
    feedback?: string;
}

export const CompleteStory: React.FC<{ onComplete: (score: any) => void }> = ({ onComplete }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const storyContext = {
        title: "Un Día en el Parque",
        preText: "Era una tarde soleada en el parque. Los pájaros cantaban y las mariposas volaban entre las flores. Sara vio un pequeño conejo saltando cerca de los",
        postText: ". El conejo la miró con curiosidad y siguió saltando felizmente.",
        options: [
            {
                id: '1',
                text: "arbustos",
                feedback: "¡Excelente! Los arbustos son un lugar perfecto para que se escondan los conejos."
            },
            {
                id: '2',
                text: "helados",
                feedback: "Hmm... Los conejos normalmente no se acercan a los helados."
            },
            {
                id: '3',
                text: "edificios",
                feedback: "Los conejos prefieren lugares con naturaleza, no edificios."
            },
            {
                id: '4',
                text: "teléfonos",
                feedback: "Los conejos no suelen estar cerca de objetos electrónicos."
            }
        ]
    };

    return (
        <ActivityWrapper
            title="Completa la Historia"
            instruction="Lee la historia y selecciona la palabra que mejor complete la frase."
            timeLimit={120}
            onComplete={onComplete}
        >
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Story Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center gap-3 mb-4">
                        <Book className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-medium text-gray-800">{storyContext.title}</h3>
                    </div>

                    <div className="prose max-w-none">
                        <p className="text-lg leading-relaxed">
                            {storyContext.preText}
                            <span className="mx-2 px-4 py-1 bg-yellow-100 rounded">
                                {selectedOption ?
                                    storyContext.options.find(opt => opt.id === selectedOption)?.text :
                                    "________"}
                            </span>
                            {storyContext.postText}
                        </p>
                    </div>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {storyContext.options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => setSelectedOption(option.id)}
                            className={`p-4 rounded-lg border-2 transition-all text-left
                ${selectedOption === option.id ?
                                    'border-blue-500 bg-blue-50' :
                                    'border-gray-200 hover:border-blue-200 hover:bg-gray-50'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${selectedOption === option.id ? 'border-blue-500' : 'border-gray-300'}`}>
                                    {selectedOption === option.id && (
                                        <CheckCircle className="w-4 h-4 text-blue-500" />
                                    )}
                                </div>
                                <span className="text-lg">{option.text}</span>
                            </div>

                            {selectedOption === option.id && option.feedback && (
                                <p className="mt-2 text-sm text-gray-600 ml-9">
                                    {option.feedback}
                                </p>
                            )}
                        </button>
                    ))}
                </div>

                {/* Visual Aid */}
                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-700 text-sm text-center">
                        Tip: Piensa en qué palabra tiene más sentido en el contexto de la historia.
                        ¿Dónde esperarías encontrar un conejo en el parque?
                    </p>
                </div>
            </div>
        </ActivityWrapper>
    );
};