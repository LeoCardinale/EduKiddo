// src/components/demo/Header.tsx
import { Tutor } from '@/types/demo';

interface HeaderProps {
    tutor: Tutor;
}

export const Header: React.FC<HeaderProps> = ({ tutor }) => (
    <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
                <div className="font-nunito font-extrabold text-2xl">
                    <span className="text-[#1976D2]">EDU</span>
                    <span className="text-orange-primary">K</span>
                    <span className="text-[#03A9F4]">I</span>
                    <span className="text-[#00BCD4]">D</span>
                    <span className="text-[#00ACC1]">D</span>
                    <span className="text-orange-accent">O</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">¡Hola, {tutor.name}!</span>
                </div>
            </div>
        </div>
    </div>
);