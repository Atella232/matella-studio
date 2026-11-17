import { Car } from '../../../features/unit-v2/games/GameKit'
import { BachDerivativesGameArt } from '../../batx1-zientziak-deribatuak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { Bach2gApplicationsGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function Bach2gApplicationsGameArt({ game }: { game: Bach2gApplicationsGameId }) {
    if (game === 'memory') return <BachDerivativesGameArt game="memory" />
    if (game === 'detective') return <DetectiveArt lines={["f'(a) = 0 → max ?", "f'' > 0 → max ?", "(c/x)' = −c/x ?"]} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 80 Q 110 0, 206 80" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="max" x={96} y={20} width={64} />
                <Car color="var(--blue)" label="€" x={44} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">f′ = 0 · f″ · B(x)</text>
            </svg>
        )
    }
    if (game === 'extreme') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <path d="M16 96 C 50 10, 90 10, 110 60 S 170 110, 204 20" fill="none" stroke="var(--blue, #2f6fdb)" strokeWidth="4" strokeLinecap="round" />
                <circle cx="66" cy="34" r="6" fill="var(--success, #267b53)" />
                <circle cx="152" cy="84" r="6" fill="var(--coral, #c4432a)" />
                <text x="44" y="22" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">+ 0 −</text>
                <text x="132" y="112" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">− 0 +</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <line x1="20" x2="204" y1="100" y2="100" stroke="var(--ink)" strokeWidth="1.6" />
            <path d="M24 98 Q 112 -20, 200 98" fill="none" stroke="var(--success, #267b53)" strokeWidth="4" strokeLinecap="round" />
            <line x1="112" x2="112" y1="40" y2="100" stroke="var(--coral, #c4432a)" strokeWidth="2" strokeDasharray="4 3" />
            <text x="126" y="34" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">B′ = 0</text>
        </svg>
    )
}
