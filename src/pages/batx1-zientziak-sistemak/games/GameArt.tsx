import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import { SystemsGameArt } from '../../dbh4-akademikoak-sistemak/games/GameArt'
import type { BachSystemsGameId } from './info'

const INK = 'var(--ink)'

/** A small augmented matrix drawn in the art, without decimal commas (the art has no language) */
function MiniMatrix({ rows, x, y, highlight }: { rows: string[][]; x: number; y: number; highlight?: [number, number] }) {
    return (
        <g>
            <path d={`M${x + 6} ${y - 18} q-8 0 -8 10 v${rows.length * 24 - 4} q0 10 8 10`} fill="none" stroke={INK} strokeWidth="2" />
            <path d={`M${x + 130} ${y - 18} q8 0 8 10 v${rows.length * 24 - 4} q0 10 -8 10`} fill="none" stroke={INK} strokeWidth="2" />
            <line x1={x + 100} x2={x + 100} y1={y - 14} y2={y + rows.length * 24 - 8} stroke={INK} strokeWidth="1.6" />
            {rows.map((row, r) => row.map((value, c) => {
                const lit = highlight && highlight[0] === r && highlight[1] === c
                return (
                    <g key={`${r}${c}`}>
                        {lit && <rect x={x + 8 + c * 30 + (c === 3 ? 8 : 0)} y={y - 15 + r * 24} width="26" height="22" rx="6" fill="var(--success-tint, #d9efe2)" stroke="var(--success, #267b53)" strokeWidth="1.6" />}
                        <text x={x + 21 + c * 30 + (c === 3 ? 8 : 0)} y={y + r * 24} textAnchor="middle" fontSize="15" fontWeight="700" fill={c === 3 ? 'var(--coral, #c4432a)' : INK} direction="ltr">{value}</text>
                    </g>
                )
            }))}
        </g>
    )
}

/** Small illustration of each game; the art is the same in every language */
export function BachSystemsGameArt({ game }: { game: BachSystemsGameId }) {
    if (game === 'cross' || game === 'touch') return <SystemsGameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['E₂ − 2E₁', '−3y = 3 ?', '−3y = −9']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="λ" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="E₂" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">Gauss · a · xy · ≤</text>
            </svg>
        )
    }
    if (game === 'zero') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <MiniMatrix rows={[['1', '1', '1', '6'], ['0', '−3', '−1', '−9'], ['0', '1', '−2', '−4']]} x={40} y={40} highlight={[1, 0]} />
                <text x="110" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">E₂ − 2E₁ → 0</text>
            </svg>
        )
    }
    if (game === 'last-row') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <MiniMatrix rows={[['1', '2', '1', '4'], ['0', '1', '3', '2'], ['0', '0', '0', '5']]} x={40} y={40} highlight={[2, 3]} />
                <text x="110" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">0z = 5 → ∅</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="24" y="22" width="78" height="74" rx="12" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
            <text x="63" y="54" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">x + y = 5</text>
            <text x="63" y="76" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">x − y = 1</text>
            <rect x="118" y="22" width="78" height="74" rx="12" fill="var(--success-tint, #d9efe2)" stroke="var(--success, #267b53)" strokeWidth="2" />
            <text x="157" y="66" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">(3, 2)</text>
        </svg>
    )
}
