import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { DistributionsBatx2GameId } from './info'

const INK = 'var(--ink)'
const BLUE = 'var(--blue, #2f6fdb)'
const CORAL = 'var(--coral, #c4432a)'
const MUSTARD = 'var(--mustard, #e0a100)'

/** A point of the bell e^(−z²/2) between z = −3 and 3, on a 180 × 70 box */
const point = (z: number) => `${(20 + ((z + 3) / 6) * 180).toFixed(1)} ${(90 - Math.exp((-z * z) / 2) * 70).toFixed(1)}`
const curve = (a: number, b: number) => Array.from({ length: 31 }, (_, index) => a + ((b - a) * index) / 30).map((z, index) => `${index ? 'L' : 'M'}${point(z)}`).join(' ')

/** Small illustration of each game; the art is the same in every language */
export function DistributionsBatx2GameArt({ game }: { game: DistributionsBatx2GameId }) {
    if (game === 'detective') return <DetectiveArt lines={['σ = npq ?', 'P(Z > k) = Φ(k) ?', 'P(X ≤ k) ≈ P(Y ≤ k) ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke={INK} strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color={CORAL} label="μ" x={104} y={20} width={72} />
                <Car color={BLUE} label="σ" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">B(n; p) · N(μ; σ)</text>
            </svg>
        )
    }
    if (game === 'binomial') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[1, 4, 6, 4, 1].map((value, index) => <rect key={index} x={30 + index * 32} y={86 - value * 11} width={26} height={value * 11} fill="var(--mustard-tint, #fbebc0)" stroke={MUSTARD} strokeWidth="2" />)}
                <line x1="20" x2="200" y1="86" y2="86" stroke={INK} strokeWidth="2" />
                <text x="110" y="110" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">B(n; p) ?</text>
            </svg>
        )
    }
    if (game === 'area') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <path d={`${curve(1, 3)} L200 90 L${(20 + (4 / 6) * 180).toFixed(1)} 90 Z`} fill={CORAL} fillOpacity="0.4" />
                <path d={curve(-3, 3)} fill="none" stroke={INK} strokeWidth="2.4" />
                <line x1="14" x2="206" y1="90" y2="90" stroke={INK} strokeWidth="2" />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">P(Z &gt; k) ?</text>
            </svg>
        )
    }
    if (game === 'hunt') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="24" y="14" width="172" height="72" rx="8" fill="var(--card)" stroke={INK} strokeWidth="2" />
                {[0, 1, 2].map((row) => [0, 1, 2].map((column) => (
                    <rect key={`${row}-${column}`} x={62 + column * 44} y={22 + row * 20} width={38} height={16} rx="3" fill={row === 1 && column === 1 ? 'var(--blue-tint, #dde7f7)' : 'none'} stroke={row === 1 && column === 1 ? BLUE : 'var(--line)'} strokeWidth="1.6" />
                )))}
                <line x1="54" x2="54" y1="18" y2="82" stroke={INK} strokeWidth="1.6" />
                <text x="110" y="110" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">P(Z ≤ k) = 0.9 → k ?</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[0, 1, 2, 3].map((index) => <rect key={index} x={24 + index * 46} y="20" width="38" height="52" rx="8" fill={index % 2 ? 'var(--blue-tint, #dde7f7)' : 'var(--card)'} stroke={INK} strokeWidth="2" />)}
            <text x="110" y="106" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">μ = np ↔ B(n; p)</text>
        </svg>
    )
}
