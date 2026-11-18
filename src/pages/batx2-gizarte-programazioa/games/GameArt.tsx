import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { ProgramazioaGameId } from './info'

const INK = 'var(--ink)'
const GREEN = 'var(--success, #267b53)'
const CORAL = 'var(--coral, #c4432a)'
const REGION = 'rgba(38, 123, 83, 0.25)'

/** Small illustration of each game; the art is the same in every language */
export function ProgramazioaGameArt({ game }: { game: ProgramazioaGameId }) {
    if (game === 'detective') return <DetectiveArt lines={['≤ → ≥ ?', 'min F = F(0, 0) ?', '(0, 6) ∈ R ?']} />
    if (game === 'express') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="10" y="12" width="200" height="40" rx="10" fill="var(--card)" stroke={INK} strokeWidth="2" />
                <text x="110" y="38" textAnchor="middle" fontSize="15" fontWeight="700" fill={INK}>«≤ 40 h»</text>
                {[['2x + y ≤ 40', GREEN], ['2x + y ≥ 40', CORAL]].map(([label, color], index) => (
                    <g key={label}>
                        <rect x={10 + index * 104} y="66" width="96" height="40" rx="10" fill={index === 0 ? 'var(--success-tint, #d9efe2)' : 'var(--card)'} stroke={color} strokeWidth="2" />
                        <text x={58 + index * 104} y="91" textAnchor="middle" fontSize="14" fontWeight="700" fill={color} direction="ltr">{label}</text>
                    </g>
                ))}
            </svg>
        )
    }
    if (game === 'memory') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[['F(2, 3)', 0], ['13', 1], ['(4, 2)', 2], ['?', 3]].map(([label, index]) => (
                    <g key={label}>
                        <rect x={14 + (Number(index) % 2) * 100} y={12 + Math.floor(Number(index) / 2) * 52} width={92} height={44} rx={10} fill={label === '?' ? 'var(--stage-tint, #dde7f7)' : 'var(--card)'} stroke={INK} strokeWidth={2} />
                        <text x={60 + (Number(index) % 2) * 100} y={40 + Math.floor(Number(index) / 2) * 52} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK} direction="ltr">{label}</text>
                    </g>
                ))}
            </svg>
        )
    }
    const best = game === 'which-vertex'
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <line x1="30" y1="104" x2="200" y2="104" stroke={INK} strokeWidth="2" />
            <line x1="30" y1="104" x2="30" y2="10" stroke={INK} strokeWidth="2" />
            <polygon points="30,104 150,104 120,60 30,30" fill={REGION} stroke={GREEN} strokeWidth="2" />
            <line x1={best ? 70 : 20} y1={best ? 118 : 20} x2={best ? 190 : 140} y2={best ? 22 : 104} stroke={CORAL} strokeWidth="2.6" strokeDasharray="7 5" />
            {[[30, 104], [150, 104], [120, 60], [30, 30]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={5} fill={best && x === 150 ? CORAL : GREEN} />)}
            {!best && <text x="175" y="40" textAnchor="middle" fontSize="18" fontWeight="700" fill={INK}>?</text>}
        </svg>
    )
}
