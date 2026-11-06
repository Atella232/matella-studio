import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import { StatisticsAkGameArt } from '../../dbh4-akademikoak-estatistika/games/GameArt'
import type { BachStatsGameId } from './info'

const INK = 'var(--ink)'

/** Small illustration of each game; the art is the same in every language */
export function BachStatsGameArt({ game }: { game: BachStatsGameId }) {
    if (game === 'box') return <StatisticsAkGameArt game="box" />
    if (game === 'detective') return <DetectiveArt lines={['z = (x − x̄) / σ²  ?', 'x̄ ± 3σ', 'CV = σ / x̄']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke={INK} strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="σ" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="x̄" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">h · x̄ · Q₁ · σ · z</text>
            </svg>
        )
    }
    if (game === 'standout') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[34, 74].map((y, row) => (
                    <g key={y}>
                        <line x1="20" x2="200" y1={y} y2={y} stroke={INK} strokeWidth="2" />
                        {[-2, -1, 0, 1, 2].map((z) => <line key={z} x1={110 + z * 40} x2={110 + z * 40} y1={y - 5} y2={y + 5} stroke={INK} strokeWidth="1.6" />)}
                        <circle cx={row === 0 ? 130 : 190} cy={y} r="8" fill={row === 0 ? 'var(--blue-tint, #dde7f7)' : 'var(--coral-tint, #f6d5cc)'} stroke={row === 0 ? 'var(--blue, #2f6fdb)' : 'var(--coral, #c4432a)'} strokeWidth="2.4" />
                    </g>
                ))}
                <text x="110" y="108" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">z = (x − x̄) / σ</text>
            </svg>
        )
    }
    if (game === 'histogram') {
        const shapes = [[1, 3, 6, 3, 1], [3, 2, 2, 2, 3], [6, 3, 2, 1, 1]]
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {shapes.map((shape, panel) => (
                    <g key={panel}>
                        <rect x={8 + panel * 70} y="14" width="64" height="84" rx="10" fill={panel === 1 ? 'var(--success-tint, #d9efe2)' : 'var(--paper)'} stroke={panel === 1 ? 'var(--success, #267b53)' : INK} strokeWidth="2" />
                        {shape.map((height, index) => <rect key={index} x={16 + panel * 70 + index * 10} y={88 - height * 10} width="9" height={height * 10} fill="var(--blue-tint, #dde7f7)" stroke="var(--blue, #2f6fdb)" strokeWidth="1.2" />)}
                    </g>
                ))}
                <text x="110" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill={INK} direction="ltr">σ ?  CV ?</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="24" y="22" width="78" height="74" rx="12" fill="var(--paper)" stroke={INK} strokeWidth="2" />
            <text x="63" y="54" textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} direction="ltr">x̄ = 50</text>
            <text x="63" y="76" textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} direction="ltr">σ = 5</text>
            <rect x="118" y="22" width="78" height="74" rx="12" fill="var(--success-tint, #d9efe2)" stroke="var(--success, #267b53)" strokeWidth="2" />
            <text x="157" y="66" textAnchor="middle" fontSize="17" fontWeight="700" fill={INK} direction="ltr">CV = 1/10</text>
        </svg>
    )
}
