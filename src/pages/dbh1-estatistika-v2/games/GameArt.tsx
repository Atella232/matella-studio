import { Car } from '../../../features/unit-v2/games/GameKit'
import type { StatisticsGameId } from './info'

/** Small illustration of each statistics game, in the notebook style */
export function StatisticsGameArt({ game }: { game: StatisticsGameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral)" label="%" x={104} y={20} width={72} />
                <Car color="var(--blue)" x={40} y={50} width={62} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">x̄ · Me · Mo · P</text>
            </svg>
        )
    }
    if (game === 'mean') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="20" y1="80" x2="200" y2="80" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
                {[40, 70, 70, 130, 180].map((x, index) => <circle key={index} cx={x} cy={index === 2 ? 44 : 66} r="9" fill="var(--blue-tint, #dde7f7)" stroke="var(--blue)" strokeWidth="2.2" />)}
                <polygon points="98,84 86,106 110,106" fill="var(--coral)" stroke="var(--ink)" strokeWidth="1.6" />
                <text x="98" y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--coral)">x̄ ?</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['5/20', '25 %', 'P(6)', '1/6'].map((label, index) => (
                <g key={label} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">{label}</text>
                </g>
            ))}
        </svg>
    )
}
