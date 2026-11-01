import { Car } from '../../../features/unit-v2/games/GameKit'
import type { AlgebraGameId } from './info'

/** Small illustration of each algebra game, in the notebook style */
export function AlgebraGameArt({ game }: { game: AlgebraGameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral)" label="x²" x={104} y={20} width={72} />
                <Car color="var(--blue)" x={40} y={50} width={62} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">(a + b)² = a² + 2ab + b²</text>
            </svg>
        )
    }
    if (game === 'expand') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="30" y="16" width="70" height="70" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="100" y="16" width="36" height="70" fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="30" y="86" width="70" height="24" fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="100" y="86" width="36" height="24" fill="var(--coral-tint, #f8dcd0)" stroke="var(--ink)" strokeWidth="2" />
                <text x="65" y="57" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">x²</text>
                <text x="178" y="60" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--coral)">? x</text>
            </svg>
        )
    }
    if (game === 'pyramid') {
        const bricks: Array<[number, number, string, boolean]> = [[85, 8, '12x³', false], [50, 44, '2x', false], [120, 44, '?', true], [15, 80, 'x', false], [85, 80, '2', false], [155, 80, '3x²', false]]
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {bricks.map(([x, y, label, empty]) => (
                    <g key={`${x}-${y}`}>
                        <rect x={x} y={y} width="50" height="32" rx="4" fill={empty ? 'var(--mustard-tint, #fbebc0)' : 'var(--paper-deep)'} stroke="var(--ink)" strokeWidth="2" strokeDasharray={empty ? '5 4' : undefined} />
                        <text x={x + 25} y={y + 22} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">{label}</text>
                    </g>
                ))}
            </svg>
        )
    }
    if (game === 'detective') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="14" y="10" width="132" height="100" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
                <text x="26" y="38" fontSize="13" fontWeight="700" fill="var(--ink)">3x + 2x</text>
                <text x="26" y="64" fontSize="13" fontWeight="700" fill="var(--coral)">= 5x²</text>
                <line x1="24" y1="68" x2="80" y2="58" stroke="var(--coral)" strokeWidth="2.5" />
                <text x="26" y="92" fontSize="13" fontWeight="700" fill="var(--ink)">(x+3)² = …</text>
                <circle cx="168" cy="58" r="24" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="3" />
                <line x1="185" y1="75" x2="206" y2="98" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['(x+3)²', 'x²+6x+9', '4x(x+2)', '4x²+8x'].map((label, index) => (
                <g key={label} transform={`translate(${10 + index * 52} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="48" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="24" y="36" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="var(--ink)">{label}</text>
                </g>
            ))}
        </svg>
    )
}
