import { Car } from '../../../features/unit-v2/games/GameKit'
import type { PythagorasGameId } from './info'

/** Small illustration of each Pythagoras game; no decimal commas, the art is the same in every language */
export function PythagorasGameArt({ game }: { game: PythagorasGameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral)" label="a²" x={104} y={20} width={72} />
                <Car color="var(--blue)" x={40} y={50} width={62} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">a² = b² + c²</text>
            </svg>
        )
    }
    if (game === 'ladder') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="40" y="8" width="14" height="100" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="20" y1="108" x2="200" y2="108" stroke="var(--ink)" strokeWidth="3" />
                <rect x="40" y="22" width="14" height="16" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="130" y1="108" x2="56" y2="30" stroke="var(--mustard, #c8962b)" strokeWidth="6" strokeLinecap="round" />
                <circle cx="130" cy="108" r="6" fill="var(--coral)" stroke="var(--ink)" strokeWidth="2" />
                <text x="104" y="60" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">5 m</text>
                <text x="150" y="100" fontSize="15" fontWeight="700" fill="var(--coral)" direction="ltr">? m</text>
            </svg>
        )
    }
    if (game === 'classify') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <polygon points="30,100 190,100 80,22" fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth="2.5" />
                <text x="110" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)" direction="ltr">13</text>
                <text x="42" y="56" fontSize="14" fontWeight="700" fill="var(--ink)" direction="ltr">5</text>
                <text x="142" y="56" fontSize="14" fontWeight="700" fill="var(--ink)" direction="ltr">12</text>
                <text x="110" y="80" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--coral)">?</text>
            </svg>
        )
    }
    if (game === 'detective') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="14" y="10" width="132" height="100" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
                <text x="26" y="38" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">c² = 3² + 4²</text>
                <text x="26" y="64" fontSize="13" fontWeight="700" fill="var(--coral)" direction="ltr">c = 25</text>
                <line x1="24" y1="68" x2="80" y2="58" stroke="var(--coral)" strokeWidth="2.5" />
                <text x="26" y="92" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">c = √25 = 5</text>
                <circle cx="168" cy="58" r="24" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="3" />
                <line x1="185" y1="75" x2="206" y2="98" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['√169', '13', '√(6²+8²)', '10'].map((label, index) => (
                <g key={label} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize={label.length > 5 ? 8 : 12} fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
