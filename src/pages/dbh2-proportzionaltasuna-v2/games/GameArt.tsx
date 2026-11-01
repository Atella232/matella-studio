import { Car } from '../../../features/unit-v2/games/GameKit'
import type { ProportionDbh2GameId } from './info'

/** Small illustration of each game; no decimal commas, the art is the same in every language */
export function ProportionDbh2GameArt({ game }: { game: ProportionDbh2GameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral)" label="%" x={104} y={20} width={72} />
                <Car color="var(--blue)" x={40} y={50} width={62} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">600 · 8/10 · 15/18</text>
            </svg>
        )
    }
    if (game === 'tag') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr">
                <path d="M40 30 h110 l30 30 l-30 30 h-110 Z" fill="var(--card)" stroke="var(--ink)" strokeWidth="2.4" strokeLinejoin="round" />
                <circle cx="152" cy="60" r="6" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="52" y="20" width="44" height="24" rx="6" fill="var(--coral-tint, #f6d5cc)" stroke="var(--ink)" strokeWidth="2" transform="rotate(-8 74 32)" />
                <text x="74" y="37" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" transform="rotate(-8 74 32)">−20%</text>
                <rect x="88" y="74" width="44" height="24" rx="6" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" transform="rotate(6 110 86)" />
                <text x="110" y="91" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" transform="rotate(6 110 86)">+20%</text>
                <text x="96" y="66" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)">96</text>
            </svg>
        )
    }
    if (game === 'kind') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr">
                {[0, 1, 2, 3].map((index) => (
                    <g key={index}>
                        <rect x={30 + index * 40} y="18" width="40" height="28" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
                        <rect x={30 + index * 40} y="46" width="40" height="28" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
                        <text x={50 + index * 40} y="37" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">{[1, 2, 3, 6][index]}</text>
                        <text x={50 + index * 40} y="65" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">{[12, 6, 4, 2][index]}</text>
                    </g>
                ))}
                <text x="110" y="104" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--coral, #c4432a)">x · y = 12</text>
            </svg>
        )
    }
    if (game === 'work') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr">
                {Array.from({ length: 12 }, (_, index) => (
                    <rect key={index} x={40 + (index % 4) * 36 + (Math.floor(index / 4) % 2) * 18} y={80 - Math.floor(index / 4) * 20} width="34" height="18" rx="2" fill={index < 9 ? 'var(--coral-tint, #f6d5cc)' : 'var(--card)'} stroke="var(--ink)" strokeWidth="1.6" strokeDasharray={index < 9 ? undefined : '4 3'} />
                ))}
                <circle cx="190" cy="34" r="9" fill="var(--mustard, #e0a100)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="190" y1="43" x2="190" y2="70" stroke="var(--ink)" strokeWidth="3" />
                <line x1="190" y1="52" x2="174" y2="62" stroke="var(--ink)" strokeWidth="3" />
                <line x1="190" y1="70" x2="182" y2="96" stroke="var(--ink)" strokeWidth="3" />
                <line x1="190" y1="70" x2="198" y2="96" stroke="var(--ink)" strokeWidth="3" />
            </svg>
        )
    }
    if (game === 'detective') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr">
                <rect x="30" y="14" width="120" height="92" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
                <text x="90" y="44" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)">+20% −20%</text>
                <text x="90" y="72" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--coral, #c4432a)">= 0% ?</text>
                <circle cx="164" cy="72" r="24" fill="none" stroke="var(--ink)" strokeWidth="4" />
                <line x1="181" y1="89" x2="204" y2="112" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['+12%', '×112/100', '−15%', '×85/100'].map((label, index) => (
                <g key={label} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize={label.length > 5 ? 8 : 11} fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
