import { Car } from '../../../features/unit-v2/games/GameKit'
import type { DecimalsGameId } from './info'

/** Small illustration of each decimals game, in the notebook style */
export function DecimalsGameArt({ game }: { game: DecimalsGameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral)" x={104} y={20} width={72} />
                <Car color="var(--blue)" x={40} y={50} width={62} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">1/10 · 1/100 · 1/1000</text>
            </svg>
        )
    }
    if (game === 'target') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="20" y1="76" x2="200" y2="76" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
                {Array.from({ length: 11 }, (_, index) => <line key={index} x1={20 + index * 18} x2={20 + index * 18} y1={index % 5 === 0 ? 66 : 70} y2={index % 5 === 0 ? 86 : 82} stroke="var(--ink)" strokeWidth={index % 5 === 0 ? 2.4 : 1.4} />)}
                <circle cx={20 + 6.5 * 18} cy="76" r="9" fill="var(--coral)" stroke="var(--ink)" strokeWidth="2" />
                <text x={20 + 6.5 * 18} y="44" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--coral)" direction="ltr">65/100</text>
            </svg>
        )
    }
    return (
        // Fractions only: the art is the same in every language, and Arabic writes the decimal point
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['45/100', '9/20', '3/4', '75/100'].map((label, index) => (
                <g key={label} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
