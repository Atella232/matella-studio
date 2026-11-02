import { Car } from '../../../features/unit-v2/games/GameKit'
import type { StatisticsGameId } from './info'

/** Small illustration of each statistics game; no decimal commas, the art is the same in every language */
export function StatisticsGameArt({ game }: { game: StatisticsGameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral)" label="x̄" x={104} y={20} width={72} />
                <Car color="var(--blue)" x={40} y={50} width={62} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">Q1 · Me · Q3</text>
            </svg>
        )
    }
    if (game === 'missing') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[['7', 18], ['5', 62], ['?', 106], ['9', 150]].map(([label, x]) => (
                    <g key={label}>
                        <rect x={Number(x)} y="28" width="40" height="56" rx="6" fill={label === '?' ? 'var(--blue-tint, #dde7f7)' : 'var(--card)'} stroke="var(--ink)" strokeWidth="2.5" />
                        <text x={Number(x) + 20} y="64" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)">{label}</text>
                    </g>
                ))}
                <text x="200" y="110" textAnchor="end" fontSize="14" fontWeight="700" fill="var(--coral)" direction="ltr">x̄ = 7</text>
            </svg>
        )
    }
    if (game === 'bag') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <path d="M 60 22 Q 50 112 110 112 Q 170 112 160 22 Z" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2.5" />
                <line x1="54" y1="22" x2="166" y2="22" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
                {[[86, 96, '#d9502e'], [104, 96, '#d9502e'], [122, 96, '#2f6fdb'], [140, 96, '#267b53'], [95, 80, '#2f6fdb']].map(([cx, cy, fill], index) => <circle key={index} cx={Number(cx)} cy={Number(cy)} r="8" fill={String(fill)} stroke="var(--ink)" strokeWidth="1.5" />)}
                <text x="196" y="60" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">2/5</text>
            </svg>
        )
    }
    if (game === 'detective') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="14" y="10" width="132" height="100" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
                <text x="24" y="38" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">3, 9, 4, 7, 5</text>
                <text x="24" y="64" fontSize="13" fontWeight="700" fill="var(--coral)" direction="ltr">Me = 4</text>
                <line x1="22" y1="68" x2="76" y2="56" stroke="var(--coral)" strokeWidth="2.5" />
                <text x="24" y="92" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">3 4 5 7 9 → 5</text>
                <circle cx="168" cy="58" r="24" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="3" />
                <line x1="185" y1="75" x2="206" y2="98" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['25 %', '90°', '1 − 3/8', '5/8'].map((label, index) => (
                <g key={label} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize={label.length > 4 ? 10 : 12} fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
