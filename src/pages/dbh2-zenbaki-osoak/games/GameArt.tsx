import { Car } from '../../../features/unit-v2/games/GameKit'
import type { IntegerGameId } from './info'

/** Small illustration of each integer game, in the notebook style */
export function IntegerGameArt({ game }: { game: IntegerGameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <line x1="14" y1="100" x2="206" y2="100" stroke="var(--ink)" strokeWidth="1.6" />
                {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((tick, index) => (
                    <g key={tick}>
                        <line x1={14 + index * 19.2} y1="96" x2={14 + index * 19.2} y2={tick === 0 ? 108 : 104} stroke="var(--ink)" strokeWidth="1.6" />
                        {tick % 5 === 0 && <text x={14 + index * 19.2} y="118" textAnchor="middle" fontSize="11" fill="var(--ink)">{tick < 0 ? `−${-tick}` : tick > 0 ? `+${tick}` : '0'}</text>}
                    </g>
                ))}
                <Car color="var(--coral)" label="−3" x={104} y={20} width={72} />
                <Car color="var(--blue)" x={40} y={50} width={62} />
            </svg>
        )
    }
    if (game === 'pyramid') {
        const rows = [['−1'], ['+4', '−5'], ['+6', '−2', '−3']]
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {rows.map((row, rowIndex) => row.map((label, index) => {
                    const width = 56
                    const x = 110 - (row.length * width) / 2 + index * width
                    const y = 8 + rowIndex * 36
                    const hidden = rowIndex === 1 && index === 1
                    return (
                        <g key={`${rowIndex}-${index}`}>
                            <rect x={x + 2} y={y} width={width - 4} height="32" rx="6" fill={hidden ? '#fffcf6' : rowIndex === 2 ? 'var(--coral-tint)' : 'var(--mustard-tint)'} stroke="var(--ink)" strokeWidth="2" strokeDasharray={hidden ? '5 4' : undefined} />
                            <text x={x + width / 2} y={y + 22} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" fontFamily="Fraunces, serif">{hidden ? '?' : label}</text>
                        </g>
                    )
                }))}
            </svg>
        )
    }
    if (game === 'memory') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {([['|−4|', -6, 'var(--violet-tint)'], ['+4', 2, '#fffcf6'], ['−4', 8, 'var(--coral-tint)']] as const).map(([label, rotation, fill], index) => (
                    <g key={label} transform={`rotate(${rotation} ${50 + index * 60} 60)`}>
                        <rect x={22 + index * 60} y="18" width="56" height="80" rx="10" fill={fill} stroke="var(--ink)" strokeWidth="2" />
                        <text x={50 + index * 60} y="64" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--ink)" fontFamily="Fraunces, serif">{label}</text>
                    </g>
                ))}
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {(['−7', '−2', '0', '+3', '+8'] as const).map((label, index) => (
                <g key={label}>
                    <rect x={10 + index * 42} y={40 + (index % 2) * 10} width="36" height="40" rx="8" fill={index < 2 ? 'var(--mustard-tint)' : '#fffcf6'} stroke="var(--ink)" strokeWidth="2" />
                    <text x={28 + index * 42} y={66 + (index % 2) * 10} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" fontFamily="Fraunces, serif">{label}</text>
                    {index < 2 && <text x={28 + index * 42} y={30 + (index % 2) * 10} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">{index + 1}</text>}
                </g>
            ))}
            <path d="M18 104 H200" stroke="var(--ink)" strokeWidth="2" markerEnd="url(#integers-order-arrow)" />
            <defs>
                <marker id="integers-order-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                    <path d="M0 0 L10 5 L0 10 z" fill="var(--ink)" />
                </marker>
            </defs>
        </svg>
    )
}
