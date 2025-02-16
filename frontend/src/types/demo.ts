// src/types/demo.ts
export interface Tutor {
    id: string;
    name: string;
    email: string;
}

export interface Kiddo {
    id: string;
    name: string;
    age: number;
    grade: string;
    avatar: string;
    lastActivity?: string;
}

export interface DemoState {
    currentScreen: string;
    tutor?: Tutor;
    kiddos?: Kiddo[];
    selectedKiddo?: Kiddo;
    testCompleted?: boolean;
    testResults?: {
        primaryStyle: string;
        secondaryStyle?: string;
    };
}

// Demo data - removed 'as const' to allow mutability
export const DEMO_DATA = {
    tutor: {
        id: '1',
        name: 'Antonio',
        email: 'example@edukiddo.com'
    },
    kiddos: [
        {
            id: '1',
            name: 'Yudith',
            age: 8,
            grade: '3º Primaria',
            avatar: '👧',
            lastActivity: 'Hace 2 días'
        },
        {
            id: '2',
            name: 'Miguel',
            age: 6,
            grade: '1º Primaria',
            avatar: '👦',
            lastActivity: 'Ayer'
        }
    ]
};