import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { DeterminanteakGameId } from './info'

const INK = 'var(--ink)'

/** A small determinant with its two bars */
function Bars({ x, y, rows, color = INK }: { x: number; y: number; rows: string[][]; color?: string }) {
    const height = rows.length * 22
    return (
        <g>
            <line x1={x} x2={x} y1={y - 16} y2={y - 16 + height} stroke={INK} strokeWidth={2.4} />
            <line x1={x + rows[0].length * 24 + 8} x2={x + rows[0].length * 24 + 8} y1={y - 16} y2={y - 16 + height} stroke={INK} strokeWidth={2.4} />
            {rows.map((row, r) => row.map((cell, c) => (
                <text key={`${r}${c}`} x={x + 16 + c * 24} y={y + r * 22} textAnchor="middle" fontSize={15} fontWeight={700} fill={color} direction="ltr">{cell}</text>
            )))}
        </g>
    )
}

/** Small illustration of each game; the art is the same in every language */
export function DeterminanteakGameArt({ game }: { game: DeterminanteakGameId }) {
    if (game === 'detective') return <DetectiveArt lines={['|2A| = 2|A| ?', 'ad + bc ?', 'A₁₂ = M₁₂ ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="|A|" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="Aᵢⱼ" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">ad − bc · Aᵢⱼ · rg · A⁻¹</text>
            </svg>
        )
    }
    if (game === 'what-happens') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="14" y="30" width="72" height="44" rx="10" fill="var(--card)" stroke={INK} strokeWidth="2" />
                <text x="50" y="59" textAnchor="middle" fontSize="18" fontWeight="700" fill={INK} direction="ltr">|A| = 5</text>
                <text x="110" y="46" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">E₁ ↔ E₂</text>
                <text x="110" y="64" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--muted)" direction="ltr">→</text>
                <rect x="134" y="30" width="72" height="44" rx="10" fill="var(--violet-tint, #e8e0f7)" stroke={INK} strokeWidth="2" strokeDasharray="5 4" />
                <text x="170" y="59" textAnchor="middle" fontSize="20" fontWeight="700" fill={INK} direction="ltr">?</text>
                <text x="110" y="104" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--muted)" direction="ltr">|kA| = kⁿ|A|</text>
            </svg>
        )
    }
    if (game === 'zero-or-not') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <Bars x={20} y={40} rows={[['1', '2', '3'], ['2', '4', '6'], ['0', '5', '1']]} />
                <rect x="24" y="47" width="78" height="20" rx="6" fill="var(--success-tint, #d9efe2)" opacity="0.7" />
                <Bars x={20} y={40} rows={[['1', '2', '3'], ['2', '4', '6'], ['0', '5', '1']]} />
                <text x="160" y="52" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">E₂ = 2E₁</text>
                <text x="160" y="82" textAnchor="middle" fontSize="22" fontWeight="700" fill={INK} direction="ltr">|A| = 0</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="16" y="22" width="84" height="78" rx="10" fill="var(--card)" stroke={INK} strokeWidth="2" />
            <Bars x={30} y={56} rows={[['3', '1'], ['2', '4']]} />
            <rect x="120" y="22" width="84" height="78" rx="10" fill="var(--success-tint, #d9efe2)" stroke={INK} strokeWidth="2" />
            <text x="162" y="70" textAnchor="middle" fontSize="28" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">10</text>
        </svg>
    )
}
