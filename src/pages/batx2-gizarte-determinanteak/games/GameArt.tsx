import { DeterminanteakGameArt } from '../../batx2-zientziak-determinanteak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { GizarteDeterminanteakGameId } from './info'

const INK = 'var(--ink)'
const GREEN = 'var(--success, #267b53)'
const CORAL = 'var(--coral, #c4432a)'

/** Small illustration of each game; the art is the same in every language */
export function GizarteDeterminanteakGameArt({ game }: { game: GizarteDeterminanteakGameId }) {
    if (game === 'race' || game === 'what-happens' || game === 'memory') return <DeterminanteakGameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['ad + bc ?', 'A⁻¹ = Adj A ?', '|A⁻¹| = |A| ?']} />
    if (game === 'unique-prices') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[{ x: 14, rows: ['2  1', '3  2'], verdict: '≠ 0 ✓', color: GREEN }, { x: 116, rows: ['2  3', '4  6'], verdict: '= 0 ✗', color: CORAL }].map((card) => (
                    <g key={card.x}>
                        <rect x={card.x} y={10} width={90} height={100} rx={10} fill="var(--card)" stroke={INK} strokeWidth={2} />
                        <line x1={card.x + 22} x2={card.x + 22} y1={22} y2={70} stroke={INK} strokeWidth={2.4} />
                        <line x1={card.x + 68} x2={card.x + 68} y1={22} y2={70} stroke={INK} strokeWidth={2.4} />
                        {card.rows.map((row, index) => <text key={row} x={card.x + 45} y={42 + index * 22} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK} direction="ltr">{row}</text>)}
                        <text x={card.x + 45} y={96} textAnchor="middle" fontSize={16} fontWeight={700} fill={card.color} direction="ltr">{card.verdict}</text>
                    </g>
                ))}
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="12" y="14" width="96" height="92" rx="10" fill="var(--card)" stroke={INK} strokeWidth="2" />
            {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
                <text key={`${r}${c}`} x={36 + c * 24} y={44 + r * 26} textAnchor="middle" fontSize={16} fontWeight={700} fill={r === 1 || c === 0 ? 'var(--muted)' : INK} opacity={r === 1 || c === 0 ? 0.45 : 1} direction="ltr">{[[1, 2, 0], [0, 1, 1], [1, 0, 1]][r][c]}</text>
            )))}
            <line x1="18" x2="102" y1="66" y2="66" stroke={CORAL} strokeWidth="2" />
            <line x1="36" x2="36" y1="24" y2="100" stroke={CORAL} strokeWidth="2" />
            <text x="164" y="54" textAnchor="middle" fontSize="20" fontWeight="700" fill={INK} direction="ltr">A₂₁</text>
            <text x="164" y="86" textAnchor="middle" fontSize="20" fontWeight="700" fill={GREEN} direction="ltr">= −2</text>
        </svg>
    )
}
