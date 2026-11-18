import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import { SistemakGameArt } from '../../batx2-zientziak-sistemak/games/GameArt'
import type { GizarteSistemakGameId } from './info'

const INK = 'var(--ink)'
const GREEN = 'var(--success, #267b53)'
const CORAL = 'var(--coral, #c4432a)'

/** Small illustration of each game; the art is the same in every language */
export function GizarteSistemakGameArt({ game }: { game: GizarteSistemakGameId }) {
    if (game === 'race' || game === 'rouche-express' || game === 'cramer-columns' || game === 'memory') return <SistemakGameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['0z = 5 → ∞ ?', 'B = 2A → x = 2y ?', 'x = |A| / |Aₓ| ?']} />
    if (game === 'business') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="14" y="12" width="120" height="96" rx="10" fill="var(--card)" stroke={INK} strokeWidth="2" />
                {['2  1 │ 8', '1  1 │ 5', '4  3 │ 18'].map((row, index) => (
                    <text key={row} x="74" y={42 + index * 26} textAnchor="middle" fontSize="17" fontWeight="700" fill={INK} direction="ltr">{row}</text>
                ))}
                {[['0', CORAL], ['1', GREEN], ['∞', 'var(--blue)']].map(([label, color], index) => (
                    <g key={label}>
                        <circle cx="176" cy={28 + index * 32} r="13" fill={index === 1 ? 'var(--success-tint, #d9efe2)' : 'var(--card)'} stroke={color} strokeWidth="2.4" />
                        <text x="176" y={34 + index * 32} textAnchor="middle" fontSize="16" fontWeight="700" fill={color} direction="ltr">{label}</text>
                    </g>
                ))}
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="10" y="14" width="200" height="38" rx="10" fill="var(--card)" stroke={INK} strokeWidth="2" />
            <text x="110" y="39" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK}>«B = 2 · A»</text>
            {[['y = 2x', GREEN], ['x = 2y', CORAL]].map(([label, color], index) => (
                <g key={label}>
                    <rect x={14 + index * 100} y="66" width="92" height="40" rx="10" fill={index === 0 ? 'var(--success-tint, #d9efe2)' : 'var(--card)'} stroke={color} strokeWidth="2" />
                    <text x={60 + index * 100} y="92" textAnchor="middle" fontSize="18" fontWeight="700" fill={color} direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
