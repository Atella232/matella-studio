import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { BachApplicationsGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it carries no words */
export function BachApplicationsGameArt({ game }: { game: BachApplicationsGameId }) {
    if (game === 'detective') return <DetectiveArt lines={["f′(a) = 0 ⇒ ↗↘ ?", "f″(0) = 0 ⇒ ∩∪ ?", "y = P − x ?"]} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="↗" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="∪" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">f′ = 0 · f″ · x₀</text>
            </svg>
        )
    }
    if (game === 'updown') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="6" width="208" height="108" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M20 88 C 60 10, 90 10, 110 56 S 160 104, 200 24" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" />
                <rect x="16" y="96" width="62" height="12" rx="4" fill="#267b53" />
                <rect x="80" y="96" width="62" height="12" rx="4" fill="#c4432a" />
                <rect x="144" y="96" width="62" height="12" rx="4" fill="#267b53" />
            </svg>
        )
    }
    if (game === 'extrema') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="6" width="208" height="108" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="16" y1="62" x2="204" y2="62" stroke="var(--ink)" strokeWidth="1.5" />
                <path d="M24 20 Q 110 150, 196 20" fill="none" stroke="var(--coral, #c4432a)" strokeWidth="4" strokeLinecap="round" />
                <circle cx="62" cy="62" r="6" fill="#7b52c7" />
                <circle cx="158" cy="62" r="6" fill="#e0a100" />
                <text x="196" y="106" textAnchor="end" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">f′</text>
            </svg>
        )
    }
    if (game === 'shape') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[['∪', 14, 'var(--success-tint, #d9efe2)'], ['∩', 80, 'var(--coral-tint, #f6d5cc)'], ['∩∪', 146, 'var(--paper-deep)']].map(([label, x, fill]) => (
                    <g key={label as string}>
                        <rect x={x as number} y="28" width="58" height="62" rx="10" fill={fill as string} stroke="var(--ink)" strokeWidth="2" />
                        <text x={(x as number) + 29} y="68" textAnchor="middle" fontSize="26" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                    </g>
                ))}
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[['x²−6x', 14, 'var(--paper-deep)'], ['x = 3', 80, 'var(--coral-tint, #f6d5cc)'], ['25', 146, 'var(--paper-deep)']].map(([label, x, fill]) => (
                <g key={label as string}>
                    <rect x={x as number} y="28" width="58" height="62" rx="10" fill={fill as string} stroke="var(--ink)" strokeWidth="2" />
                    <text x={(x as number) + 29} y="66" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
