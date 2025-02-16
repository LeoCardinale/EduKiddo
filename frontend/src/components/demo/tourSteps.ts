export interface TourStep {
    screen: string;
    phase: string;
    selector: string;
    content: string;
    position: {
        top: string | number;
        left: string | number;
        translateX?: string;
        translateY?: string;
    };
    fixed?: boolean;
    actionRequired?: boolean;
    nextAction?: string;
}

export const tourSteps: TourStep[] = [
    // Login Screen
    {
        screen: 'login',
        phase: '1',
        selector: '.login-form',
        content: "Aquí el tutor ingresa sus credenciales para acceder al sistema.",
        position: { top: '50%', left: '20%', translateX: '-50%' },
        nextAction: "Haz clic en Iniciar Sesión"
    },

    // Kiddos List
    {
        screen: 'kiddos-list',
        phase: '2',
        selector: '[data-kiddo-id="1"]',
        content: "Imaginemos que acabas de crear el perfil de Yudith. Vamos a configurar su aprendizaje.",
        position: { top: '30%', left: '15%' },
        nextAction: "Selecciona el perfil del kiddo Yudith"
    },

    // Activities Dashboard (Primera visita)
    {
        screen: 'kiddo-dashboard',
        phase: '3',
        selector: '.learning-test-button',
        content: "Cada vez que creamos un perfil de Kiddo, debemos descubrir su estilo de aprendizaje.",
        position: { top: '60%', left: '50%', translateX: '-50%' },
        nextAction: "Haz clic en Test de Aprendizaje"
    },

    // Test Intro
    {
        screen: 'learning-test',
        phase: '4',
        selector: '.start-test-button',
        content: "¡Vamos a descubrir cómo aprende mejor Yudith!",
        position: { top: '10%', left: '50%', translateX: '-50%' },
        actionRequired: true,
        nextAction: 'Haz click en ¡Comenzar mi Aventura!'
    },

    // Exercise tooltips (fixed, no action required)
    {
        screen: 'pattern-memory',
        phase: '5',
        selector: '.activity-area',
        content: "Este ejercicio corresponde al tipo de aprendizaje VISUAL y mide: memoria visual y atención al detalle",
        position: { top: '30%', left: '20%' },
        fixed: true
    },
    {
        screen: 'sequence-differences',
        phase: '6',
        selector: '.activity-area',
        content: "Este ejercicio corresponde al tipo de aprendizaje VISUAL y mide: discriminación visual y capacidad de comparación",
        position: { top: '30%', left: '20%' },
        fixed: true
    },
    {
        screen: 'musical-sequence',
        phase: '7',
        selector: '.activity-area',
        content: "Este ejercicio corresponde al tipo de aprendizaje AUDITIVO y mide: memoria auditiva y discriminación de sonidos",
        position: { top: '30%', left: '20%' },
        fixed: true
    },
    {
        screen: 'visual-rhyme',
        phase: '8',
        selector: '.activity-area',
        content: "Este ejercicio corresponde al tipo de aprendizaje AUDITIVO y mide: conciencia fonológica",
        position: { top: '30%', left: '20%' },
        fixed: true
    },
    {
        screen: 'complete-story',
        phase: '9',
        selector: '.activity-area',
        content: "Este ejercicio corresponde al tipo de aprendizaje VERBAL y mide: comprensión lectora y vocabulario",
        position: { top: '30%', left: '20%' },
        fixed: true
    },
    {
        screen: 'word-categories',
        phase: '10',
        selector: '.activity-area',
        content: "Este ejercicio corresponde al tipo de aprendizaje VERBAL y mide: organización verbal y clasificación",
        position: { top: '30%', left: '20%' },
        fixed: true
    },
    {
        screen: 'mirror-tracing',
        phase: '11',
        selector: '.activity-area',
        content: "Este ejercicio corresponde al tipo de aprendizaje KINESTÉSICO y mide: coordinación motora fina y orientación espacial",
        position: { top: '30%', left: '20%' },
        fixed: true
    },
    {
        screen: 'figure-construction',
        phase: '12',
        selector: '.activity-area',
        content: "Este ejercicio corresponde al tipo de aprendizaje KINESTÉSICO y mide: manipulación espacial y planificación motora",
        position: { top: '30%', left: '20%' },
        fixed: true
    },

    // Results Screen
    {
        screen: 'test-results',
        phase: '13',
        selector: '.results-container',
        content: "¡Excelente! Estos son los resultados del test. Hemos determinado el estilo de aprendizaje predominante de Yudith.",
        position: { top: '50%', left: '50%', translateX: '-50%' },
        actionRequired: true,
        nextAction: 'Haz click en "Comenzar mi aventura" para volver al perfil'
    },

    // Back to Dashboard with Homework enabled
    {
        screen: 'kiddo-dashboard',
        phase: '14',
        selector: '.homework-button',
        content: "¡Perfecto! Ahora que conocemos el estilo de aprendizaje de Yudith, hagamos nuestra primera sesión de Deberes.",
        position: { top: '31%', left: '55%' },
        actionRequired: true,
        nextAction: 'Ir a Deberes'
    }
];