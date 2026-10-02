import { Car } from '../../../features/unit-v2/games/GameKit'
import type { RealsGameId } from './info'

/** Small illustration of each real-numbers game, in the notebook style */
/** `points` changes the two numbers on the line of the placing game (√2 and π by default) and `caption` the numbers under the race */
export function RealsGameArt({ game, points = [{ value: Math.SQRT2, label: '√2' }, { value: Math.PI, label: 'π' }], caption = '√2 · π · 3/4' }: { game: RealsGameId; points?: Array<{ value: number; label: string }>; caption?: string }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" direction="ltr" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral)" label="√" x={104} y={20} width={72} />
                <Car color="var(--blue, #2f6fdb)" x={40} y={50} width={62} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">{caption}</text>
            </svg>
        )
    }
    if (game === 'place') {
        const x = (value: number) => 30 + value * 40
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" direction="ltr" aria-hidden="true">
                <line x1="14" y1="72" x2="206" y2="72" stroke="var(--ink)" strokeWidth="3" />
                <path d="M212 72 l-10 -6 v12 z" fill="var(--ink)" />
                {[0, 1, 2, 3, 4].map((value) => (
                    <g key={value}>
                        <line x1={x(value)} y1="62" x2={x(value)} y2="82" stroke="var(--ink)" strokeWidth="2.4" />
                        <text x={x(value)} y="102" textAnchor="middle" fontSize="14" fill="var(--muted)">{value}</text>
                    </g>
                ))}
                {Array.from({ length: 40 }, (_, index) => index / 10).filter((value) => value % 1 !== 0).map((value) => <line key={value} x1={x(value)} y1="67" x2={x(value)} y2="77" stroke="var(--line)" strokeWidth="1.2" />)}
                {points.map((point, index) => (
                    <g key={point.label}>
                        <circle cx={x(point.value)} cy="72" r="7" fill={index === 0 ? 'var(--coral)' : 'var(--blue, #2f6fdb)'} stroke="var(--card)" strokeWidth="2" />
                        <text x={x(point.value)} y="48" textAnchor="middle" fontSize="16" fontWeight="700" fill={index === 0 ? 'var(--coral)' : 'var(--blue, #2f6fdb)'}>{point.label}</text>
                    </g>
                ))}
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" direction="ltr" aria-hidden="true">
            {['√72', '6√2', '10³', '1000'].map((label, index) => (
                <g key={label} transform={`translate(${10 + index * 52} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="48" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="24" y="36" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">{label}</text>
                </g>
            ))}
        </svg>
    )
}
