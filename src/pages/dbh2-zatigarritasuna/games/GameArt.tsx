import { Car } from '../../../features/unit-v2/games/GameKit'
import type { DivisibilityGameId } from './info'

/** Small illustration of each divisibility game, in the notebook style */
export function DivisibilityGameArt({ game }: { game: DivisibilityGameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                {[0, 1, 2, 3, 4].map((index) => (
                    <g key={index}>
                        <circle cx={30 + index * 40} cy="104" r="11" fill={index % 2 === 0 ? 'var(--mustard-tint)' : '#fffcf6'} stroke="var(--ink)" strokeWidth="1.6" />
                        <text x={30 + index * 40} y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">{(index + 1) * 6}</text>
                    </g>
                ))}
                <Car color="var(--coral)" label="6" x={104} y={20} width={72} />
                <Car color="var(--blue)" x={40} y={50} width={62} />
            </svg>
        )
    }
    if (game === 'hunt') {
        const values = [12, 7, 18, 25, 30, 11, 24, 9]
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {values.map((value, index) => {
                    const hit = value % 6 === 0
                    return (
                        <g key={value}>
                            <rect x={14 + (index % 4) * 50} y={14 + Math.floor(index / 4) * 50} width="42" height="42" rx="9" fill={hit ? 'var(--violet-tint)' : '#fffcf6'} stroke="var(--ink)" strokeWidth={hit ? 2.4 : 1.6} />
                            <text x={35 + (index % 4) * 50} y={41 + Math.floor(index / 4) * 50} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" fontFamily="Fraunces, serif">{value}</text>
                        </g>
                    )
                })}
            </svg>
        )
    }
    if (game === 'factor') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="20" y="14" width="96" height="92" rx="12" fill="#fffcf6" stroke="var(--ink)" strokeWidth="2" />
                <line x1="72" y1="24" x2="72" y2="96" stroke="var(--ink)" strokeWidth="2.2" />
                {[['60', '2'], ['30', '2'], ['15', '3'], ['5', '5']].map(([value, prime], index) => (
                    <g key={value}>
                        <text x="64" y={40 + index * 18} textAnchor="end" fontSize="15" fontWeight="700" fill="var(--ink)">{value}</text>
                        <text x="80" y={40 + index * 18} fontSize="15" fontWeight="700" fill="var(--blue)">{prime}</text>
                    </g>
                ))}
                {[2, 3, 5, 7].map((prime, index) => (
                    <g key={prime}>
                        <rect x={132 + (index % 2) * 40} y={24 + Math.floor(index / 2) * 42} width="32" height="32" rx="8" fill={index === 0 ? 'var(--mustard-tint)' : '#fffcf6'} stroke="var(--ink)" strokeWidth="2" />
                        <text x={148 + (index % 2) * 40} y={46 + Math.floor(index / 2) * 42} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">{prime}</text>
                    </g>
                ))}
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {([['72', -6, 'var(--mustard-tint)'], ['2³·3²', 2, '#fffcf6'], ['8·9', 8, 'var(--green-tint)']] as const).map(([label, rotation, fill], index) => (
                <g key={label} transform={`rotate(${rotation} ${50 + index * 60} 60)`}>
                    <rect x={22 + index * 60} y="18" width="56" height="80" rx="10" fill={fill} stroke="var(--ink)" strokeWidth="2" />
                    <text x={50 + index * 60} y="64" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" fontFamily="Fraunces, serif">{label}</text>
                </g>
            ))}
        </svg>
    )
}
