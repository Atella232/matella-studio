import { DistributionsBatx2GameArt } from '../../batx2-zientziak-banaketak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { DistributionsBatx2gGameId } from './info'

const INK = 'var(--ink)'
const BLUE = 'var(--blue, #2f6fdb)'
const CORAL = 'var(--coral, #c4432a)'

/** Small illustration of each game; the art is the same in every language */
export function DistributionsBatx2gGameArt({ game }: { game: DistributionsBatx2gGameId }) {
    if (game === 'race' || game === 'area' || game === 'hunt' || game === 'memory') return <DistributionsBatx2GameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['P(X = 2) = 0.5² · 0.5² ?', 'P(Z > 1) = 0.8413 ?', '50 ± 1.96 ?']} />
    if (game === 'cutoff') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <path d="M 10 96 C 60 96, 80 18, 110 18 C 140 18, 160 96, 210 96" fill="none" stroke={INK} strokeWidth="2.6" />
                <path d="M 150 70 C 165 86, 180 94, 210 96 L 210 96 L 150 96 Z" fill={CORAL} fillOpacity="0.4" />
                <line x1="150" x2="150" y1="20" y2="100" stroke={CORAL} strokeWidth="2.4" strokeDasharray="6 4" />
                <line x1="6" x2="214" y1="96" y2="96" stroke={INK} strokeWidth="2" />
                <text x="182" y="60" textAnchor="middle" fontSize="16" fontWeight="700" fill={CORAL} direction="ltr">10%</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <line x1="20" x2="200" y1="70" y2="70" stroke={INK} strokeWidth="2" />
            {[-2, -1, 0, 1, 2].map((z) => <line key={z} x1={110 + z * 40} x2={110 + z * 40} y1="64" y2="76" stroke={INK} strokeWidth="1.6" />)}
            <circle cx="160" cy="70" r="9" fill={CORAL} />
            <circle cx="150" cy="70" r="7" fill={BLUE} />
            <text x="160" y="50" textAnchor="middle" fontSize="15" fontWeight="700" fill={CORAL} direction="ltr">z = 1.25</text>
            <text x="110" y="104" textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} direction="ltr">z = (x − μ) / σ</text>
        </svg>
    )
}
