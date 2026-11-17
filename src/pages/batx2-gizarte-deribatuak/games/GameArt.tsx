import { Car } from '../../../features/unit-v2/games/GameKit'
import { BachDerivativesGameArt } from '../../batx1-zientziak-deribatuak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { Bach2gDerivativesGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function Bach2gDerivativesGameArt({ game }: { game: Bach2gDerivativesGameId }) {
    if (game === 'memory') return <BachDerivativesGameArt game="memory" />
    if (game === 'detective') return <DetectiveArt lines={["(uv)' = u'v' ?", "f'(a) = f(a) ?", "(ln u)' = 1/u ?"]} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="f′" x={104} y={20} width={60} />
                <Car color="var(--blue)" label="€" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">T.V.M. · f′(a) · C′(x)</text>
            </svg>
        )
    }
    if (game === 'next-cost') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="20" x2="204" y1="100" y2="100" stroke="var(--ink)" strokeWidth="1.6" />
                <path d="M24 96 C 80 90, 140 60, 200 14" fill="none" stroke="var(--blue, #2f6fdb)" strokeWidth="4" strokeLinecap="round" />
                <line x1="110" y1="70" x2="150" y2="70" stroke="var(--success, #267b53)" strokeWidth="2" strokeDasharray="4 3" />
                <line x1="150" y1="70" x2="150" y2="48" stroke="var(--success, #267b53)" strokeWidth="3" />
                <text x="60" y="40" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">x + 1 ?</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <path d="M14 90 Q 60 10, 100 90" fill="none" stroke="var(--blue, #2f6fdb)" strokeWidth="4" />
            <line x1="120" y1="20" x2="206" y2="96" stroke="var(--coral, #c4432a)" strokeWidth="4" />
            <text x="40" y="112" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">f</text>
            <text x="160" y="112" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">f′</text>
        </svg>
    )
}
