import { Car } from '../../../features/unit-v2/games/GameKit'
import type { SolidsGameId } from './info'

/** Small illustration of each solids game; no decimal commas, the art is the same in every language */
export function SolidsGameArt({ game }: { game: SolidsGameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral)" label="V" x={104} y={20} width={72} />
                <Car color="var(--blue)" x={40} y={50} width={62} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">V = A · h</text>
            </svg>
        )
    }
    if (game === 'euler') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <polygon points="30,40 80,20 130,40 130,100 80,112 30,100" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2.5" />
                <polyline points="30,40 80,58 130,40" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
                <line x1="80" y1="58" x2="80" y2="112" stroke="var(--ink)" strokeWidth="2.5" />
                <text x="172" y="44" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">6 + 8</text>
                <text x="172" y="70" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">=</text>
                <text x="172" y="96" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--coral)" direction="ltr">12 + 2</text>
            </svg>
        )
    }
    if (game === 'tank') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="60" y="30" width="100" height="78" fill="var(--card)" stroke="var(--ink)" strokeWidth="2.5" />
                <rect x="62" y="62" width="96" height="44" fill="var(--blue-tint, #b9d3f5)" />
                <path d="M 150 14 h 30 v 10 h -14 v 8" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
                <line x1="166" y1="34" x2="166" y2="58" stroke="var(--blue, #2f5fb3)" strokeWidth="3" strokeDasharray="4 4" />
                <text x="110" y="90" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">? L</text>
            </svg>
        )
    }
    if (game === 'detective') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="14" y="10" width="132" height="100" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
                <text x="24" y="38" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">V = Ab · h / 3</text>
                <text x="24" y="64" fontSize="13" fontWeight="700" fill="var(--coral)" direction="ltr">1 cm³ = 1 L</text>
                <line x1="22" y1="68" x2="104" y2="56" stroke="var(--coral)" strokeWidth="2.5" />
                <text x="24" y="92" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">r = d / 2</text>
                <circle cx="168" cy="58" r="24" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="3" />
                <line x1="185" y1="75" x2="206" y2="98" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['1 m³', '1000 L', '6 · 4²', '96'].map((label, index) => (
                <g key={label} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize={label.length > 4 ? 10 : 12} fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
