import { useState } from 'react';
import DemoWireframes from '../components/DemoWireframes';
import TourController, { tourSteps } from '../components/demo/GuidedTour';

export default function DemoPage() {
    const [showTour, setShowTour] = useState(true);
    const [currentScreen, setCurrentScreen] = useState('login');

    return (
        <>
            {showTour && (
                <TourController
                    steps={tourSteps}
                    currentScreen={currentScreen}
                    onComplete={() => setShowTour(false)}
                />
            )}
            <DemoWireframes
                tourActive={showTour}
                onScreenChange={(screen) => setCurrentScreen(screen)}
            />
        </>
    );
}