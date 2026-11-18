import { Car } from '../../../features/unit-v2/games/GameKit'
import { BachApplicationsGameArt } from '../../batx1-zientziak-aplikazioak/games/GameArt'
import { BachDerivativesGameArt } from '../../batx1-zientziak-deribatuak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { SocDerivGameId } from './info'

/** Small illustration of each game; the same in every language, so it has no decimal commas */
export function SocDerivGameArt({ game }: { game: SocDerivGameId }) {
    if (game === 'slopes' || game === 'match') return <BachDerivativesGameArt game={game} />
    if (game === 'updown' || game === 'extrema') return <BachApplicationsGameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['(x⁴)′ = 4x⁴ ?', '(e³ˣ)′ = e³ˣ ?', 'B(x) = 0 ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="f′" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="B′" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">f′(a) · max · min</text>
            </svg>
        )
    }
    if (game === 'produce') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="20" y="30" width="150" height="18" rx="8" fill="var(--blue)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="20" y="60" width="150" height="18" rx="8" fill="var(--coral, #c4432a)" stroke="var(--ink)" strokeWidth="2" />
                <text x="184" y="45" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">I′</text>
                <text x="184" y="75" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">C′</text>
                <text x="110" y="106" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">I′ = C′</text>
            </svg>
        )
    }
    if (game === 'rates') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="16" x2="206" y1="100" y2="100" stroke="var(--ink)" strokeWidth="2" />
                <path d="M20 96 Q 110 92 200 20" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" />
                <line x1="60" y1="93" x2="180" y2="36" stroke="var(--coral, #c4432a)" strokeWidth="3" strokeDasharray="7 5" />
                <line x1="80" y1="105" x2="170" y2="65" stroke="var(--mustard, #e0a100)" strokeWidth="3" />
                <text x="40" y="30" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">TVM · f′(a)</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[0, 1, 2, 3].map((index) => <rect key={index} x={14 + index * 50} y={22} width={42} height={58} rx={8} fill={index % 2 === 0 ? 'var(--mustard-tint, #fbebc0)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />)}
            <text x="35" y="57" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)" direction="ltr">3x⁴</text>
            <text x="85" y="57" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)" direction="ltr">12x³</text>
            <text x="135" y="57" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)" direction="ltr">x² − 6x</text>
            <text x="185" y="57" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)" direction="ltr">x = 3</text>
            <text x="110" y="108" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">? = ?</text>
        </svg>
    )
}
