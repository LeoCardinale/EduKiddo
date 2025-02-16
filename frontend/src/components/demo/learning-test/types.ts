// src/components/demo/learning-test/types.ts
export interface ActivityScore {
    accuracy: number;  // 0-3
    timeBonus: number;  // 0-3
    total: number;     // Weighted sum
}

export interface ActivityResult {
    activityId: string;
    learningType: 'visual' | 'auditory' | 'verbal' | 'kinesthetic';
    score: ActivityScore;
}

export interface TestState {
    currentActivity: number | 'intro' | 'results';
    scores: ActivityScore[];
    kiddo: {
        name: string;
        avatar: string;
    };
    showTour?: boolean;
}

