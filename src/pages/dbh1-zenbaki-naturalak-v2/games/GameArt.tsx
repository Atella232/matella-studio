import { Car } from '../../../features/unit-v2/games/GameKit'
import type { NaturalsGameId } from './info'

/** Small illustration of each natural numbers game, in the notebook style */
export function NaturalsGameArt({ game }: { game: NaturalsGameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                {['1', '10', '100', '10³', '10⁶'].map((label, index) => (
                    <g key={label}>
                        <circle cx={30 + index * 40} cy="104" r="11" fill={index % 2 === 0 ? 'var(--blue-tint)' : '#fffcf6'} stroke="var(--ink)" strokeWidth="1.6" />
                        <text x={30 + index * 40} y="108" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--ink)">{label}</text>
                    </g>
                ))}
                <Car color="var(--coral)" label="1" x={104} y={20} width={72} />
                <Car color="var(--blue)" x={40} y={50} width={62} />
            </svg>
        )
    }
    if (game === 'hunt') {
        const values = ['27.310', '17.402', '41.700', '70.113', '93.705', '85.700', '12.706', '57.004']
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {values.map((value, index) => {
                    const hit = value[value.length - 3] === '7'
                    return (
                        <g key={value}>
                            <rect x={8 + (index % 4) * 52} y={14 + Math.floor(index / 4) * 50} width="48" height="42" rx="9" fill={hit ? 'var(--blue-tint)' : '#fffcf6'} stroke="var(--ink)" strokeWidth={hit ? 2.4 : 1.6} />
                            <text x={32 + (index % 4) * 52} y={40 + Math.floor(index / 4) * 50} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">{value}</text>
                        </g>
                    )
                })}
            </svg>
        )
    }
    if (game === 'sprint') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="14" y="36" width="192" height="48" rx="12" fill="#fffcf6" stroke="var(--ink)" strokeWidth="2" />
                {([['20', 34, null], ['−', 58, 'var(--green-tint)'], ['(3+5)', 96, 'var(--coral-tint)'], ['·', 134, 'var(--mustard-tint)'], ['2', 156, null], ['+', 178, 'var(--green-tint)']] as const).map(([label, x, fill]) => (
                    <g key={label}>
                        {fill && <rect x={x - (label.length > 1 ? 22 : 10)} y="46" width={label.length > 1 ? 44 : 20} height="28" rx="7" fill={fill} stroke="var(--ink)" strokeWidth="1.4" />}
                        <text x={x} y="66" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" fontFamily="Fraunces, serif">{label}</text>
                    </g>
                ))}
                {(['var(--coral)', 'var(--mustard)', 'var(--green)'] as const).map((color, index) => (
                    <circle key={color} cx={86 + index * 24} cy="104" r="9" fill={color} stroke="var(--ink)" strokeWidth="1.6" />
                ))}
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {([['XL', -6, 'var(--violet-tint)'], ['40', 2, '#fffcf6'], ['2³', 8, 'var(--green-tint)']] as const).map(([label, rotation, fill], index) => (
                <g key={label} transform={`rotate(${rotation} ${50 + index * 60} 60)`}>
                    <rect x={22 + index * 60} y="18" width="56" height="80" rx="10" fill={fill} stroke="var(--ink)" strokeWidth="2" />
                    <text x={50 + index * 60} y="64" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)" fontFamily="Fraunces, serif">{label}</text>
                </g>
            ))}
        </svg>
    )
}
