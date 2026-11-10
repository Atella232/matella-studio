import { Car } from '../../../features/unit-v2/games/GameKit'
import { BachLimitsGameArt } from '../../batx1-zientziak-limiteak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { Bach2LimitsGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function Bach2LimitsGameArt({ game }: { game: Bach2LimitsGameId }) {
    if (game === 'forms' || game === 'discontinuity' || game === 'memory') return <BachLimitsGameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['δ = ε ?', '1^∞ = 1 ?', 'x⁵ ≫ 2ˣ ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="ε" x={104} y={20} width={60} />
                <Car color="var(--blue)" label="δ" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">eᵃ · a, b · Bolzano</text>
            </svg>
        )
    }
    if (game === 'winner') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="18" y="20" width="150" height="24" rx="8" fill="var(--blue, #2f6fdb)" />
                <rect x="18" y="62" width="70" height="24" rx="8" fill="var(--coral, #c4432a)" />
                <text x="176" y="38" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">eˣ</text>
                <text x="96" y="80" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">x¹⁰</text>
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--muted)" direction="ltr">0 · c · +∞</text>
            </svg>
        )
    }
    if (game === 'assure') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="16" x2="204" y1="70" y2="70" stroke="var(--ink)" strokeWidth="1.6" />
                <path d="M30 100 C 70 100, 80 30, 110 40 S 160 60, 190 20" fill="none" stroke="var(--blue, #2f6fdb)" strokeWidth="4" strokeLinecap="round" />
                <circle cx="30" cy="100" r="6" fill="var(--coral, #c4432a)" />
                <circle cx="190" cy="20" r="6" fill="var(--success, #267b53)" />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">[a, b] ?</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[-3, -2, -1, 0, 1, 2].map((n, index) => (
                <g key={n}>
                    <rect x={10 + index * 34} y="30" width="30" height="40" rx="7" fill={[1, 4].includes(index) ? 'var(--success-tint, #d9efe2)' : 'var(--paper-deep)'} stroke="var(--ink)" strokeWidth="1.6" />
                    <text x={25 + index * 34} y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">{n}</text>
                </g>
            ))}
            <text x="110" y="104" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">f(n) · f(n + 1) &lt; 0</text>
        </svg>
    )
}
