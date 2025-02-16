import { useState } from 'react'
import { Journey, Step } from '@/types'

interface JourneyViewerProps {
    journey: Journey
}

export default function JourneyViewer({ journey }: JourneyViewerProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const currentStep = journey.steps[currentStepIndex]

    const handleStepComplete = () => {
        if (currentStepIndex < journey.steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1)
        }
    }

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">{journey.title}</h2>

            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">
                    Step {currentStep.order}: {currentStep.title}
                </h3>

                <div className="prose mb-6">
                    {currentStep.content}
                </div>

                {currentStep.visual_reference && (
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <h4 className="font-medium mb-2">Visual Reference:</h4>
                        <div className="aspect-video bg-white rounded">
                            {/* Visual reference will be rendered here */}
                            {currentStep.visual_reference}
                        </div>
                    </div>
                )}

                <button
                    onClick={handleStepComplete}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                    Done
                </button>
            </div>

            <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>Step {currentStepIndex + 1} of {journey.steps.length}</span>
                <span>Duration: {currentStep.duration}</span>
            </div>
        </div>
    )
}