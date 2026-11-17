import { DistributionsBatx2GameArt } from '../../batx2-zientziak-banaketak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { InferenceBatx2gGameId } from './info'

const INK = 'var(--ink)'
const BLUE = 'var(--blue, #2f6fdb)'
const CORAL = 'var(--coral, #c4432a)'
const GREEN = 'var(--success, #267b53)'

/** Small illustration of each game; the art is the same in every language */
export function InferenceBatx2gGameArt({ game }: { game: InferenceBatx2gGameId }) {
    if (game === 'race' || game === 'memory') return <DistributionsBatx2GameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['P(Z ≤ z) = 0.95 ?', 'n = 96.04 → 96 ?', 'σ = pq / n ?']} />
    if (game === 'truth') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="110" x2="110" y1="10" y2="110" stroke={INK} strokeWidth="2.4" />
                {[-0.6, 0.4, 1.2, -1.1, 2.6].map((shift, index) => <line key={index} x1={110 + (shift - 1.96) * 18} x2={110 + (shift + 1.96) * 18} y1={22 + index * 18} y2={22 + index * 18} stroke={Math.abs(shift) > 1.96 ? CORAL : BLUE} strokeWidth="5" strokeLinecap="round" />)}
                <text x="30" y="112" fontSize="18" fontWeight="700" fill={GREEN}>✓</text>
                <text x="180" y="112" fontSize="18" fontWeight="700" fill={CORAL}>✗</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <line x1="20" x2="200" y1="70" y2="70" stroke={INK} strokeWidth="2" />
            <rect x="50" y="52" width="120" height="36" rx="10" fill="none" stroke={BLUE} strokeWidth="3" />
            <circle cx="110" cy="70" r="7" fill={CORAL} />
            <text x="110" y="40" textAnchor="middle" fontSize="16" fontWeight="700" fill={CORAL} direction="ltr">x̄ ?</text>
            <text x="170" y="110" textAnchor="middle" fontSize="16" fontWeight="700" fill={BLUE} direction="ltr">n ?</text>
            <text x="50" y="110" textAnchor="middle" fontSize="16" fontWeight="700" fill={BLUE} direction="ltr">E ?</text>
        </svg>
    )
}
