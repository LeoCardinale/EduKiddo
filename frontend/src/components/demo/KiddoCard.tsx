// src/components/demo/KiddoCard.tsx
import { Kiddo } from '@/types/demo';

interface KiddoCardProps {
    kiddo: Kiddo;
    onSelect: (kiddo: Kiddo) => void;
    disabled?: boolean;
}

export const KiddoCard: React.FC<KiddoCardProps> = ({ kiddo, onSelect, disabled }) => (
    <button
        onClick={() => onSelect(kiddo)}
        disabled={disabled}
        data-kiddo-id={kiddo.id}
        className={`w-full bg-white rounded-lg shadow-md p-6 transition-all
      ${disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:shadow-lg hover:scale-102 transform'}`}
    >
        <div className="flex items-center gap-4">
            <div className="text-4xl">{kiddo.avatar}</div>
            <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-gray-900">{kiddo.name}</h3>
                <p className="text-sm text-gray-500">{kiddo.grade}</p>
                {kiddo.lastActivity && (
                    <p className="text-xs text-gray-400 mt-1">
                        Última actividad: {kiddo.lastActivity}
                    </p>
                )}
            </div>
        </div>
    </button>
);