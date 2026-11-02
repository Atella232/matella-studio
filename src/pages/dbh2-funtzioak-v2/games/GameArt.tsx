import { Car } from '../../../features/unit-v2/games/GameKit'
import type { FunctionsGameId } from './info'

/** Small illustration of each functions game, in the notebook style */
export function FunctionsGameArt({ game }: { game: FunctionsGameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral)" label="f" x={104} y={20} width={72} />
                <Car color="var(--blue, #2f6fdb)" x={40} y={50} width={62} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">y = mx + n</text>
            </svg>
        )
    }
    if (game === 'plot') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="50" y="8" width="120" height="100" rx="6" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
                {[0, 1, 2, 3, 4, 5].map((index) => <line key={`v${index}`} x1={50 + (index + 1) * 17.1} y1="8" x2={50 + (index + 1) * 17.1} y2="108" stroke="var(--line)" strokeWidth="1.4" />)}
                {[0, 1, 2, 3, 4].map((index) => <line key={`h${index}`} x1="50" y1={8 + (index + 1) * 16.6} x2="170" y2={8 + (index + 1) * 16.6} stroke="var(--line)" strokeWidth="1.4" />)}
                <line x1="50" y1="58" x2="170" y2="58" stroke="var(--ink)" strokeWidth="3" />
                <line x1="110" y1="8" x2="110" y2="108" stroke="var(--ink)" strokeWidth="3" />
                <circle cx="144" cy="24" r="8" fill="var(--coral)" stroke="var(--card)" strokeWidth="2.4" />
                <path d="M144 24 L144 58 M144 24 L110 24" stroke="var(--coral)" strokeWidth="2" strokeDasharray="4 4" />
                <text x="158" y="22" fontSize="14" fontWeight="700" fill="var(--coral)">(2, 3)</text>
            </svg>
        )
    }
    if (game === 'laser') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="20" y1="100" x2="200" y2="100" stroke="var(--ink)" strokeWidth="2" />
                <line x1="60" y1="112" x2="60" y2="8" stroke="var(--ink)" strokeWidth="2" />
                <line x1="24" y1="104" x2="196" y2="14" stroke="var(--coral)" strokeWidth="4" strokeLinecap="round" />
                {[[100, 63], [150, 37]].map(([cx, cy]) => (
                    <g key={cx}>
                        <circle cx={cx} cy={cy} r="11" fill="none" stroke="var(--success, #267b53)" strokeWidth="2.5" />
                        <circle cx={cx} cy={cy} r="4.5" fill="var(--success, #267b53)" />
                    </g>
                ))}
                <text x="140" y="116" fontSize="14" fontWeight="700" fill="var(--ink)" direction="ltr">y = mx + n</text>
            </svg>
        )
    }
    if (game === 'detective') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="14" y="10" width="132" height="100" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
                <text x="24" y="38" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">A(1, 2), B(3, 8)</text>
                <text x="24" y="64" fontSize="13" fontWeight="700" fill="var(--coral)" direction="ltr">m = 2 / 6</text>
                <line x1="22" y1="68" x2="90" y2="56" stroke="var(--coral)" strokeWidth="2.5" />
                <text x="24" y="92" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">m = 6 / 2 = 3</text>
                <circle cx="168" cy="58" r="24" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="3" />
                <line x1="185" y1="75" x2="206" y2="98" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['y=2x−3', 'y = 5', 'm = 2', '(3, 0)'].map((label, index) => (
                <g key={label} transform={`translate(${10 + index * 52} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="48" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="24" y="36" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--ink)">{label}</text>
                </g>
            ))}
        </svg>
    )
}
