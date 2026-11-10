import { Car } from '../../../features/unit-v2/games/GameKit'
import { BachDerivativesGameArt } from '../../batx1-zientziak-deribatuak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { Bach2DerivativesGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas and no sin */
export function Bach2DerivativesGameArt({ game }: { game: Bach2DerivativesGameId }) {
    if (game === 'match' || game === 'tangent' || game === 'memory') return <BachDerivativesGameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['(y²)′ = 2y ?', '(xˣ)′ = x·xˣ⁻¹ ?', 'm⊥ = −m ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="y′" x={104} y={20} width={60} />
                <Car color="var(--blue)" label="f⁽ⁿ⁾" x={52} y={54} width={50} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">a, b · 1/f′(a) · c</text>
            </svg>
        )
    }
    if (game === 'derivable') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="6" width="208" height="108" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M20 90 Q 70 90, 110 50" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" />
                <path d="M110 50 L 200 20" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" />
                <line x1="60" y1="90" x2="160" y2="10" stroke="var(--coral, #c4432a)" strokeWidth="2" strokeDasharray="6 4" />
                <circle cx="110" cy="50" r="6" fill="var(--ink)" />
                <text x="160" y="104" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">f′(a⁻) = f′(a⁺) ?</text>
            </svg>
        )
    }
    if (game === 'onion') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <ellipse cx="110" cy="60" rx="96" ry="50" fill="#fbebc0" stroke="var(--ink)" strokeWidth="2" />
                <ellipse cx="110" cy="60" rx="64" ry="33" fill="#ece4f8" stroke="var(--ink)" strokeWidth="2" />
                <ellipse cx="110" cy="60" rx="32" ry="17" fill="#d9efe2" stroke="var(--ink)" strokeWidth="2" />
                <text x="110" y="66" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">3x</text>
                <text x="110" y="35" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">eᵘ</text>
                <text x="110" y="20" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">( )²</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="6" y="6" width="208" height="108" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
            <circle cx="96" cy="64" r="40" fill="none" stroke="var(--blue)" strokeWidth="4" />
            <line x1="100" y1="10" x2="172" y2="66" stroke="var(--coral, #c4432a)" strokeWidth="2.6" />
            <line x1="104" y1="70" x2="180" y2="14" stroke="#7b52c7" strokeWidth="2.6" />
            <line x1="120" y1="8" x2="152" y2="80" stroke="#e0a100" strokeWidth="2.6" />
            <circle cx="128" cy="40" r="6" fill="var(--ink)" />
            <text x="190" y="104" textAnchor="end" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">A · B · C ?</text>
        </svg>
    )
}
