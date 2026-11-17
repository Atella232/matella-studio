import { Car } from '../../../features/unit-v2/games/GameKit'
import { BachDerivativesGameArt } from '../../batx1-zientziak-deribatuak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { Bach2gIntegralsGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function Bach2gIntegralsGameArt({ game }: { game: Bach2gIntegralsGameId }) {
    if (game === 'memory') return <BachDerivativesGameArt game="memory" />
    if (game === 'detective') return <DetectiveArt lines={['∫ x⁴ = x⁵ ?', 'F(a) − F(b) ?', 'A = −4/3 ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 80 Q 110 30, 206 70" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="∫" x={96} y={20} width={56} />
                <Car color="var(--blue)" label="C" x={44} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">∫ · F(b) − F(a) · A</text>
            </svg>
        )
    }
    if (game === 'primitive') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <text x="110" y="40" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--ink)" direction="ltr">∫ 3x² dx</text>
                <rect x="20" y="58" width="80" height="40" rx="8" fill="var(--card, #fffcf6)" stroke="var(--success, #267b53)" strokeWidth="2.4" />
                <rect x="120" y="58" width="80" height="40" rx="8" fill="var(--card, #fffcf6)" stroke="var(--ink)" strokeWidth="1.6" />
                <text x="60" y="84" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">x³ + C</text>
                <text x="160" y="84" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">6x</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <line x1="16" x2="204" y1="60" y2="60" stroke="var(--ink)" strokeWidth="1.6" />
            <path d="M30 90 Q 70 120, 110 60 Q 150 0, 190 30 L190 60 L30 60 Z" fill="none" />
            <path d="M30 60 L30 90 Q 70 120, 110 60 Z" fill="var(--coral, #c4432a)" fillOpacity="0.3" />
            <path d="M110 60 Q 150 0, 190 30 L190 60 Z" fill="var(--blue, #2f6fdb)" fillOpacity="0.3" />
            <path d="M30 90 Q 70 120, 110 60 Q 150 0, 190 30" fill="none" stroke="var(--ink)" strokeWidth="3" />
            <text x="66" y="84" fontSize="20" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">−</text>
            <text x="146" y="50" fontSize="20" fontWeight="700" fill="var(--blue, #2f6fdb)" direction="ltr">+</text>
        </svg>
    )
}
