import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { BachDerivativesGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas and no sin */
export function BachDerivativesGameArt({ game }: { game: BachDerivativesGameId }) {
    if (game === 'detective') return <DetectiveArt lines={["(fg)′ = f′g′ ?", "(e³ˣ)′ = e³ˣ ?", "(2ˣ)′ = x·2ˣ⁻¹ ?"]} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="m" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="h" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">f′(a) · m · n</text>
            </svg>
        )
    }
    if (game === 'slopes') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="6" width="208" height="108" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M20 96 C 60 10, 110 10, 140 60 S 190 100, 204 30" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" />
                <line x1="58" y1="20" x2="104" y2="20" stroke="#e0a100" strokeWidth="3" />
                <line x1="128" y1="34" x2="160" y2="86" stroke="#7b52c7" strokeWidth="3" />
                <circle cx="81" cy="20" r="6" fill="#e0a100" />
                <circle cx="144" cy="60" r="6" fill="#7b52c7" />
                <text x="81" y="44" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">0</text>
                <text x="168" y="62" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">−</text>
            </svg>
        )
    }
    if (game === 'match') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="10" y="10" width="92" height="100" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M20 30 Q 56 150, 92 30" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" />
                <text x="110" y="66" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)" direction="ltr">→</text>
                <rect x="118" y="10" width="92" height="100" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="124" y1="60" x2="204" y2="60" stroke="var(--ink)" strokeWidth="1.5" />
                <line x1="128" y1="100" x2="200" y2="20" stroke="var(--coral, #c4432a)" strokeWidth="4" strokeLinecap="round" />
                <text x="196" y="104" textAnchor="end" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">f′</text>
            </svg>
        )
    }
    if (game === 'tangent') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="6" width="208" height="108" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M30 20 Q 110 170, 190 20" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" />
                <line x1="96" y1="106" x2="196" y2="22" stroke="var(--success, #267b53)" strokeWidth="3" />
                <circle cx="148" cy="62" r="6" fill="var(--blue)" />
                <text x="20" y="104" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">y = mx + n</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[['x³', 14, 'var(--paper-deep)'], ['3x²', 80, 'var(--coral-tint, #f6d5cc)'], ['eˣ', 146, 'var(--paper-deep)']].map(([label, x, fill]) => (
                <g key={label as string}>
                    <rect x={x as number} y="28" width="58" height="62" rx="10" fill={fill as string} stroke="var(--ink)" strokeWidth="2" />
                    <text x={(x as number) + 29} y="66" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
