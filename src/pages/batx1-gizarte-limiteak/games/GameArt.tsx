import { Car } from '../../../features/unit-v2/games/GameKit'
import { BachLimitsGameArt } from '../../batx1-zientziak-limiteak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { SocLimitsGameId } from './info'

/** Small illustration of each game; the same in every language, so it has no decimal commas */
export function SocLimitsGameArt({ game }: { game: SocLimitsGameId }) {
    if (game === 'forms' || game === 'asymptote' || game === 'discontinuity') return <BachLimitsGameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['∞/∞ = 1 ?', '6x²/2x²', '= 3']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="∞" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="0/0" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">lim · k · y = mx + n</text>
            </svg>
        )
    }
    if (game === 'long') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="16" x2="206" y1="96" y2="96" stroke="var(--ink)" strokeWidth="2" />
                <line x1="24" x2="24" y1="104" y2="12" stroke="var(--ink)" strokeWidth="2" />
                <line x1="24" x2="206" y1="34" y2="34" stroke="var(--muted)" strokeWidth="2" strokeDasharray="7 5" />
                <path d="M24 90 Q 70 40 130 37 T 204 35" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" />
                <text x="196" y="26" textAnchor="end" fontSize="15" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">x → +∞</text>
            </svg>
        )
    }
    if (game === 'join') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="110" x2="110" y1="10" y2="104" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="4 3" />
                <path d="M16 96 L 110 40" fill="none" stroke="var(--coral, #c4432a)" strokeWidth="4" strokeLinecap="round" />
                <path d="M110 66 L 204 30" fill="none" stroke="var(--success, #267b53)" strokeWidth="4" strokeLinecap="round" />
                <line x1="120" x2="120" y1="40" y2="66" stroke="var(--mustard, #e0a100)" strokeWidth="4" />
                <circle cx="110" cy="40" r="6" fill="var(--coral, #c4432a)" />
                <circle cx="110" cy="66" r="6" fill="var(--card)" stroke="var(--success, #267b53)" strokeWidth="2.5" />
                <text x="170" y="96" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">k = ?</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[0, 1, 2, 3].map((index) => <rect key={index} x={14 + index * 50} y={22} width={42} height={58} rx={8} fill={index % 2 === 0 ? 'var(--mustard-tint, #fbebc0)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />)}
            <text x="35" y="57" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)" direction="ltr">3x²/x²</text>
            <text x="85" y="57" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)" direction="ltr">3</text>
            <text x="135" y="57" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)" direction="ltr">x = 2</text>
            <text x="185" y="57" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)" direction="ltr">1/(x−2)</text>
            <text x="110" y="108" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">? = ?</text>
        </svg>
    )
}
