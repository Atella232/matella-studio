import { DistributionsBatx2GameArt } from '../../batx2-zientziak-banaketak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { SamplingBatx2gGameId } from './info'

const INK = 'var(--ink)'
const BLUE = 'var(--blue, #2f6fdb)'
const CORAL = 'var(--coral, #c4432a)'
const GOLD = 'var(--mustard, #e0a100)'

/** Small illustration of each game; the art is the same in every language */
export function SamplingBatx2gGameArt({ game }: { game: SamplingBatx2gGameId }) {
    if (game === 'race' || game === 'memory') return <DistributionsBatx2GameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['h = n / N ?', 'σ / n ?', '√(pq/n) = pq/n ?']} />
    if (game === 'bias') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {Array.from({ length: 18 }, (_, index) => {
                    const x = 20 + (index % 6) * 22
                    const y = 26 + Math.floor(index / 6) * 30
                    const picked = index % 6 >= 4
                    return <circle key={index} cx={x} cy={y} r={8} fill={picked ? CORAL : 'none'} stroke={INK} strokeWidth={2} />
                })}
                <rect x={98} y={10} width={50} height={92} rx={10} fill="none" stroke={CORAL} strokeWidth={2.4} strokeDasharray="6 4" />
                <text x={186} y={68} textAnchor="middle" fontSize={34} fontWeight={700} fill={CORAL}>?</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[{ x: 14, w: 96, c: BLUE }, { x: 112, w: 62, c: GOLD }, { x: 176, w: 32, c: CORAL }].map((stratum) => (
                <g key={stratum.x}>
                    <rect x={stratum.x} y={14} width={stratum.w} height={40} fill={stratum.c} fillOpacity={0.3} stroke={INK} strokeWidth={2} />
                    <rect x={stratum.x + stratum.w / 2 - stratum.w / 8} y={70} width={stratum.w / 4} height={34} fill={stratum.c} stroke={INK} strokeWidth={2} />
                    <line x1={stratum.x + stratum.w / 2} x2={stratum.x + stratum.w / 2} y1={56} y2={68} stroke={INK} strokeWidth={2} />
                </g>
            ))}
        </svg>
    )
}
