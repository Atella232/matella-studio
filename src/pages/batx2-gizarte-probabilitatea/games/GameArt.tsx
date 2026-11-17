import { ProbabilityBatx2GameArt } from '../../batx2-zientziak-probabilitatea/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { ProbabilityBatx2gGameId } from './info'

const INK = 'var(--ink)'
const BLUE = 'var(--blue, #2f6fdb)'
const CORAL = 'var(--coral, #c4432a)'

/** Small illustration of each game; the art is the same in every language */
export function ProbabilityBatx2gGameArt({ game }: { game: ProbabilityBatx2gGameId }) {
    if (game === 'race' || game === 'venn' || game === 'culprit' || game === 'memory') return <ProbabilityBatx2GameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['C₁₀,₃ = V₁₀,₃ ?', 'P(S/G) = 30/200 ?', 'P(E/+) = P(+/E) ?']} />
    if (game === 'divide') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[0, 1, 2].map((row) => [0, 1, 2].map((column) => (
                    <rect key={`${row}-${column}`} x={40 + column * 48} y={12 + row * 32} width={44} height={28} rx={6} fill={row === 0 && column === 0 ? 'var(--blue-tint, #dde7f7)' : row === 0 && column === 2 ? 'var(--coral-tint, #f6d5cc)' : 'var(--card)'} stroke={row === 0 && column === 0 ? BLUE : row === 0 && column === 2 ? CORAL : INK} strokeWidth={2} />
                )))}
                <text x={62} y={31} textAnchor="middle" fontSize={14} fontWeight={700} fill={BLUE}>30</text>
                <text x={158} y={31} textAnchor="middle" fontSize={14} fontWeight={700} fill={CORAL}>50</text>
                <text x={110} y={116} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK} direction="ltr">30 / 50 = 0.6</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['V', 'VR', 'P', 'C'].map((name, index) => (
                <g key={name}>
                    <rect x={14 + index * 50} y={30} width={42} height={42} rx={8} fill={index === 3 ? 'var(--mustard-tint, #fbebc0)' : 'var(--card)'} stroke={INK} strokeWidth={2} />
                    <text x={35 + index * 50} y={58} textAnchor="middle" fontSize={17} fontWeight={700} fill={index === 3 ? CORAL : INK}>{name}</text>
                </g>
            ))}
            <text x={110} y={104} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK} direction="ltr">{'{A, B, C} = {C, A, B}'}</text>
        </svg>
    )
}
