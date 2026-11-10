import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { MatrizeakGameId } from './info'

const INK = 'var(--ink)'

/** A domino tile: rows | columns */
function Domino({ x, y, rows, columns, tint = 'var(--card)', dashed = false }: { x: number; y: number; rows: string; columns: string; tint?: string; dashed?: boolean }) {
    return (
        <g>
            <rect x={x} y={y} width={56} height={34} rx={7} fill={tint} stroke={INK} strokeWidth={2} strokeDasharray={dashed ? '5 4' : undefined} />
            <line x1={x + 28} x2={x + 28} y1={y + 3} y2={y + 31} stroke={INK} strokeWidth={2} />
            <text x={x + 14} y={y + 23} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{rows}</text>
            <text x={x + 42} y={y + 23} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{columns}</text>
        </g>
    )
}

/** A small 2 × 2 matrix with its brackets */
function Mini({ x, y, cells, color = INK }: { x: number; y: number; cells: string[]; color?: string }) {
    return (
        <g>
            <path d={`M${x + 6} ${y - 18} q-8 0 -8 10 v28 q0 10 8 10`} fill="none" stroke={INK} strokeWidth={2} />
            <path d={`M${x + 58} ${y - 18} q8 0 8 10 v28 q0 10 -8 10`} fill="none" stroke={INK} strokeWidth={2} />
            {cells.map((cell, index) => (
                <text key={index} x={x + 18 + (index % 2) * 28} y={y + Math.floor(index / 2) * 22} textAnchor="middle" fontSize={15} fontWeight={700} fill={color} direction="ltr">{cell}</text>
            ))}
        </g>
    )
}

/** Small illustration of each game; the art is the same in every language */
export function MatrizeakGameArt({ game }: { game: MatrizeakGameId }) {
    if (game === 'detective') return <DetectiveArt lines={['(A+B)² = …', 'A²+2AB+B² ?', 'AB ≠ BA']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="A⁻¹" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="AB" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">aᵢⱼ · AB · rg · A⁻¹</text>
            </svg>
        )
    }
    if (game === 'dominoes') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <Domino x={10} y={40} rows="2" columns="3" />
                <text x="76" y="63" textAnchor="middle" fontSize="18" fontWeight="700" fill={INK}>·</text>
                <Domino x={84} y={40} rows="?" columns="?" tint="var(--mustard-tint, #fbebc0)" dashed />
                <text x="150" y="63" textAnchor="middle" fontSize="18" fontWeight="700" fill={INK}>=</text>
                <Domino x={158} y={40} rows="2" columns="4" tint="var(--success-tint, #d9efe2)" />
            </svg>
        )
    }
    if (game === 'solve-x') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="20" y="20" width="180" height="40" rx="10" fill="var(--card)" stroke={INK} strokeWidth="2" />
                <text x="110" y="47" textAnchor="middle" fontSize="20" fontWeight="700" fill={INK} direction="ltr">A X = B</text>
                <rect x="20" y="70" width="180" height="40" rx="10" fill="var(--success-tint, #d9efe2)" stroke="var(--success, #267b53)" strokeWidth="2" />
                <text x="110" y="97" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">X = A⁻¹ B</text>
            </svg>
        )
    }
    if (game === 'big-power') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <Mini x={14} y={52} cells={['0', '−1', '1', '0']} />
                <text x="110" y="58" textAnchor="middle" fontSize="22" fontWeight="700" fill={INK} direction="ltr">→</text>
                <text x="168" y="62" textAnchor="middle" fontSize="26" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">A²⁰²⁶</text>
                <text x="110" y="108" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--muted)" direction="ltr">A⁴ = I</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="16" y="22" width="84" height="78" rx="10" fill="var(--card)" stroke={INK} strokeWidth="2" />
            <Mini x={26} y={56} cells={['2', '1', '1', '1']} />
            <rect x="120" y="22" width="84" height="78" rx="10" fill="var(--success-tint, #d9efe2)" stroke={INK} strokeWidth="2" />
            <Mini x={130} y={56} cells={['1', '−1', '−1', '2']} color="var(--success, #267b53)" />
        </svg>
    )
}
