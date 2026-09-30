import { Car } from '../../../features/unit-v2/games/GameKit'
import type { EquationsGameId } from './info'

/** Small illustration of each equations game, in the notebook style */
export function EquationsGameArt({ game }: { game: EquationsGameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral)" label="x" x={104} y={20} width={72} />
                <Car color="var(--blue)" x={40} y={50} width={62} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">3x − 8 = 25</text>
            </svg>
        )
    }
    if (game === 'solve') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <polygon points="110,92 96,112 124,112" fill="var(--ink)" />
                <line x1="40" y1="80" x2="180" y2="80" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
                <line x1="110" y1="80" x2="110" y2="92" stroke="var(--ink)" strokeWidth="4" />
                <rect x="48" y="44" width="36" height="36" rx="6" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
                <text x="66" y="68" textAnchor="middle" fontSize="18" fontWeight="700" fontStyle="italic" fill="var(--ink)">x</text>
                {[0, 1, 2].map((index) => <rect key={index} x={130 + index * 16} y={62} width={14} height={18} rx={3} fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth="1.6" />)}
                <text x="110" y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--coral)">⏱ x = ?</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['2x+3=11', 'x = 4', 'x² = 49', 'x = ±7'].map((label, index) => (
                <g key={label} transform={`translate(${10 + index * 52} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="48" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="24" y="36" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--ink)">{label}</text>
                </g>
            ))}
        </svg>
    )
}
