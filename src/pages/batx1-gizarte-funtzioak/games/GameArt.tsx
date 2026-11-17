import { Car } from '../../../features/unit-v2/games/GameKit'
import { CurveArt } from '../../dbh4-games/CurveGames'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import { FunctionArt } from '../../dbh4-games/FunctionGames'
import type { SocFunctionsGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function SocFunctionsGameArt({ game }: { game: SocFunctionsGameId }) {
    if (game === 'domain') return <FunctionArt game="domain" />
    if (game === 'laser') return <CurveArt game="laser" />
    if (game === 'detective') return <DetectiveArt lines={['B(x) = −x² + 60x − 500', 'Bmax = 30 ?', 'B(30) = 400']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="p·q" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="k/x" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">m · V · F/x · |f|</text>
            </svg>
        )
    }
    if (game === 'estimate') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="20" y="10" width="110" height="100" fill="var(--success-tint, #d9efe2)" />
                <rect x="130" y="10" width="70" height="100" fill="#f6d5cc" opacity="0.6" />
                <line x1="20" x2="200" y1="100" y2="100" stroke="var(--ink)" strokeWidth="2" />
                <line x1="20" x2="20" y1="10" y2="100" stroke="var(--ink)" strokeWidth="2" />
                <line x1="40" y1="84" x2="200" y2="20" stroke="var(--blue)" strokeWidth="3" />
                <circle cx="50" cy="80" r="7" fill="var(--ink)" />
                <circle cx="120" cy="52" r="7" fill="var(--ink)" />
                <circle cx="88" cy="65" r="7" fill="var(--success, #267b53)" />
                <circle cx="180" cy="28" r="7" fill="var(--coral, #c4432a)" />
            </svg>
        )
    }
    if (game === 'price') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="30" x2="200" y1="104" y2="104" stroke="var(--ink)" strokeWidth="2" />
                <line x1="30" x2="30" y1="10" y2="104" stroke="var(--ink)" strokeWidth="2" />
                <rect x="30" y="57" width="85" height="47" fill="var(--mustard-tint, #fbebc0)" stroke="var(--mustard, #e0a100)" strokeWidth="2" />
                <line x1="30" y1="14" x2="196" y2="104" stroke="var(--blue)" strokeWidth="3" />
                <circle cx="115" cy="57" r="6" fill="var(--ink)" />
                <text x="72" y="86" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">p · q</text>
            </svg>
        )
    }
    if (game === 'bill') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="30" x2="200" y1="104" y2="104" stroke="var(--ink)" strokeWidth="2" />
                <line x1="30" x2="30" y1="10" y2="104" stroke="var(--ink)" strokeWidth="2" />
                <line x1="110" x2="110" y1="14" y2="104" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M30 88 L110 62" stroke="var(--blue)" strokeWidth="3.5" fill="none" />
                <path d="M110 62 L196 16" stroke="var(--success, #267b53)" strokeWidth="3.5" fill="none" />
                <circle cx="160" cy="35" r="7" fill="var(--coral, #c4432a)" />
                <text x="70" y="40" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)">€</text>
            </svg>
        )
    }
    // Memory
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[0, 1, 2, 3].map((index) => (
                <g key={index}>
                    <rect x={14 + index * 50} y={22} width={42} height={58} rx={8} fill={index % 2 === 0 ? 'var(--mustard-tint, #fbebc0)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                </g>
            ))}
            <text x="35" y="57" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">√x</text>
            <text x="85" y="57" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)" direction="ltr">[0, ∞)</text>
            <text x="135" y="57" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">x²−4x</text>
            <text x="185" y="57" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)" direction="ltr">V(2,−4)</text>
            <text x="110" y="108" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">? = ?</text>
        </svg>
    )
}
