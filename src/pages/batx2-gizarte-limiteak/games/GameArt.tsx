import { Car } from '../../../features/unit-v2/games/GameKit'
import { BachLimitsGameArt } from '../../batx1-zientziak-limiteak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { Bach2gLimitsGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function Bach2gLimitsGameArt({ game }: { game: Bach2gLimitsGameId }) {
    if (game === 'forms' || game === 'discontinuity' || game === 'memory') return <BachLimitsGameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['∞ − ∞ = 0 ?', '1^∞ = 1 ?', 'k/0 = 0 ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="∞" x={104} y={20} width={60} />
                <Car color="var(--blue)" label="€" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">lim · eᵃ · k</text>
            </svg>
        )
    }
    if (game === 'long-run') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="20" x2="204" y1="92" y2="92" stroke="var(--ink)" strokeWidth="1.6" />
                <line x1="20" x2="20" y1="12" y2="92" stroke="var(--ink)" strokeWidth="1.6" />
                <line x1="20" x2="204" y1="34" y2="34" stroke="var(--success, #267b53)" strokeWidth="2" strokeDasharray="7 5" />
                <path d="M22 86 C 50 40, 90 38, 200 36" fill="none" stroke="var(--blue, #2f6fdb)" strokeWidth="4" strokeLinecap="round" />
                <text x="110" y="114" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--muted)" direction="ltr">0 · L · +∞</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <line x1="20" x2="204" y1="98" y2="98" stroke="var(--ink)" strokeWidth="1.6" />
            <line x1="24" y1="92" x2="110" y2="50" stroke="var(--blue, #2f6fdb)" strokeWidth="4" strokeLinecap="round" />
            <line x1="110" y1="30" x2="200" y2="10" stroke="var(--coral, #c4432a)" strokeWidth="4" strokeLinecap="round" />
            <line x1="110" y1="50" x2="110" y2="30" stroke="var(--coral, #c4432a)" strokeWidth="2" strokeDasharray="4 3" />
            <circle cx="110" cy="50" r="6" fill="var(--blue, #2f6fdb)" />
            <circle cx="110" cy="30" r="6" fill="var(--paper)" stroke="var(--coral, #c4432a)" strokeWidth="3" />
            <text x="150" y="80" fontSize="20" fontWeight="700" fill="var(--ink)" direction="ltr">k = ?</text>
        </svg>
    )
}
