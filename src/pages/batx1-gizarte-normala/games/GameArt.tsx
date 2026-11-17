import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { NormalBatx1gGameId } from './info'

const INK = 'var(--ink)'
const BLUE = 'var(--blue, #2f6fdb)'
const CORAL = 'var(--coral, #c4432a)'
const MUSTARD = 'var(--mustard, #e0a100)'

/** A point of the bell e^(−z²/2) between z = −3 and 3, on a 180 × 70 box */
const point = (z: number) => `${(20 + ((z + 3) / 6) * 180).toFixed(1)} ${(90 - Math.exp((-z * z) / 2) * 70).toFixed(1)}`
const curve = (a: number, b: number) => Array.from({ length: 31 }, (_, index) => a + ((b - a) * index) / 30).map((z, index) => `${index ? 'L' : 'M'}${point(z)}`).join(' ')
const sx = (z: number) => (20 + ((z + 3) / 6) * 180).toFixed(1)

/** Small illustration of each game; the art is the same in every language */
export function NormalBatx1gGameArt({ game }: { game: NormalBatx1gGameId }) {
    if (game === 'detective') return <DetectiveArt lines={['P(Z > k) = Φ(k) ?', 'z = (x − μ) / σ² ?', 'k = 0,5 · b · h ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke={INK} strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color={CORAL} label="μ" x={104} y={20} width={72} />
                <Car color={BLUE} label="σ" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">N(μ; σ)</text>
            </svg>
        )
    }
    if (game === 'density') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <polygon points="40,96 180,96 180,30" fill="var(--mustard-tint, #fbebc0)" stroke={MUSTARD} strokeWidth="2.4" />
                <line x1="30" x2="196" y1="96" y2="96" stroke={INK} strokeWidth="2" />
                <text x="80" y="60" textAnchor="middle" fontSize="18" fontWeight="700" fill={INK} direction="ltr">= 1 ?</text>
            </svg>
        )
    }
    const shade = game === 'cutoff' ? [0.84, 3] : game === 'percent' ? [-1, 1] : game === 'hunt' ? [-3, 1.28] : [1, 3]
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <path d={`${curve(shade[0], shade[1])} L${sx(shade[1])} 90 L${sx(shade[0])} 90 Z`} fill={CORAL} fillOpacity="0.4" />
            <path d={curve(-3, 3)} fill="none" stroke={INK} strokeWidth="2.4" />
            <line x1="14" x2="206" y1="90" y2="90" stroke={INK} strokeWidth="2" />
            <text x="110" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} direction="ltr">{game === 'percent' ? '68 · 95 · 99,7' : game === 'cutoff' ? 'x = μ + kσ' : game === 'memory' ? 'z ↔ %' : 'P(Z ≤ k)'}</text>
        </svg>
    )
}
