import { Car } from '../../../features/unit-v2/games/GameKit'
import { BachApplicationsGameArt } from '../../batx1-zientziak-aplikazioak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { Bach2ApplicationsGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas and no sin */
export function Bach2ApplicationsGameArt({ game }: { game: Bach2ApplicationsGameId }) {
    if (game === 'extrema' || game === 'shape' || game === 'memory') return <BachApplicationsGameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['∞ · 0 = 0 ?', 'f(c) = m ?', 'd = D ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="c" x={104} y={20} width={60} />
                <Car color="var(--blue)" label="0/0" x={52} y={54} width={50} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">f′(c) = 0 · max</text>
            </svg>
        )
    }
    if (game === 'hopital') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="6" width="208" height="108" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <text x="110" y="46" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--ink)" direction="ltr">0/0 · ∞/∞</text>
                <text x="110" y="78" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">0·∞ · ∞ − ∞ · 1^∞</text>
                <text x="110" y="104" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--blue)" direction="ltr">f′/g′ ?</text>
            </svg>
        )
    }
    if (game === 'rolle') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="6" width="208" height="108" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M30 40 C 60 110, 160 110, 190 40" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" />
                <line x1="30" y1="40" x2="190" y2="40" stroke="var(--ink)" strokeWidth="2" strokeDasharray="6 4" />
                <line x1="78" y1="88" x2="142" y2="88" stroke="var(--coral, #c4432a)" strokeWidth="3" />
                <circle cx="110" cy="88" r="6" fill="var(--coral, #c4432a)" />
                <text x="110" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">f(a) = f(b) ?</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="6" y="6" width="208" height="108" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
            <rect x="26" y="34" width="70" height="50" fill="#d9efe2" stroke="var(--ink)" strokeWidth="2" />
            <path d="M120 90 Q 150 10, 196 90" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" />
            <circle cx="158" cy="50" r="6" fill="var(--coral, #c4432a)" />
            <text x="61" y="104" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">x · y</text>
            <text x="158" y="104" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">f′ = 0</text>
        </svg>
    )
}
