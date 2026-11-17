import { Car } from '../../../features/unit-v2/games/GameKit'
import { BachFunctionsGameArt } from '../../batx1-zientziak-funtzioak/games/GameArt'
import { CurveArt } from '../../dbh4-games/CurveGames'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { SocExpGameId } from './info'

/** Small illustration of each game; the same in every language, so it has no decimal commas */
export function SocExpGameArt({ game }: { game: SocExpGameId }) {
    if (game === 'where' || game === 'order' || game === 'undo') return <BachFunctionsGameArt game={game} />
    if (game === 'growth') return <CurveArt game="growth" />
    if (game === 'laser') return <CurveArt game="laser" />
    if (game === 'detective') return <DetectiveArt lines={['2ᵗ = 32', 't = 32/2 ?', 't = 5']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="aˣ" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="log" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">f ∘ g · 2ⁿ · logₐ</text>
            </svg>
        )
    }
    if (game === 'table') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={14 + i * 40} y={30} width={40} height={30} fill={i === 4 ? 'var(--mustard-tint, #fbebc0)' : 'var(--card)'} stroke="var(--ink)" strokeWidth="2" />)}
                {['3', '6', '12', '24', '?'].map((value, i) => <text key={i} x={34 + i * 40} y={51} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">{value}</text>)}
                <text x="110" y="92" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--blue)" direction="ltr">+3 ? ×2 ?</text>
            </svg>
        )
    }
    if (game === 'checkout') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="10" y="40" width="58" height="36" rx="8" fill="var(--card)" stroke="var(--coral, #c4432a)" strokeWidth="2.5" />
                <text x="39" y="64" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">− 10</text>
                <line x1="70" x2="86" y1="58" y2="58" stroke="var(--ink)" strokeWidth="2" />
                <rect x="88" y="40" width="58" height="36" rx="8" fill="var(--card)" stroke="var(--blue)" strokeWidth="2.5" />
                <text x="117" y="64" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--blue)" direction="ltr">×1.21</text>
                <line x1="148" x2="164" y1="58" y2="58" stroke="var(--ink)" strokeWidth="2" />
                <text x="190" y="64" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--success, #267b53)">€</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[0, 1, 2, 3].map((index) => <rect key={index} x={14 + index * 50} y={22} width={42} height={58} rx={8} fill={index % 2 === 0 ? 'var(--mustard-tint, #fbebc0)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />)}
            <text x="35" y="57" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)" direction="ltr">−15%</text>
            <text x="85" y="57" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)" direction="ltr">×0.85</text>
            <text x="135" y="57" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)" direction="ltr">log₂8</text>
            <text x="185" y="57" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">3</text>
            <text x="110" y="108" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">? = ?</text>
        </svg>
    )
}
