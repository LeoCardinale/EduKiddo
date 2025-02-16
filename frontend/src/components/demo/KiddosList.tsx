// src/components/demo/KiddosList.tsx
import { Kiddo } from '@/types/demo';
import { KiddoCard } from './KiddoCard';

interface KiddosListProps {
    kiddos: Kiddo[];
    onKiddoSelect: (kiddo: Kiddo) => void;
    disabledKiddos?: string[];
}

export const KiddosList: React.FC<KiddosListProps> = ({
    kiddos,
    onKiddoSelect,
    disabledKiddos = []
}) => (
    <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Mis Kiddos</h2>
        <div className="grid gap-4 sm:grid-cols-2">
            {kiddos.map((kiddo) => (
                <KiddoCard
                    key={kiddo.id}
                    kiddo={kiddo}
                    onSelect={onKiddoSelect}
                    disabled={disabledKiddos.includes(kiddo.id)}
                />
            ))}
        </div>
    </div>
);