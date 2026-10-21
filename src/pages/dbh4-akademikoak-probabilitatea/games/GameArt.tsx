import { Car } from '../../../features/unit-v2/games/GameKit'
import type { ProbabilityAkGameId } from './info'

/** Small illustration of each game; the art is the same in every language */
export function ProbabilityAkGameArt({ game }: { game: ProbabilityAkGameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 62 L 206 62" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="P" x={104} y={20} width={64} />
                <Car color="var(--blue)" label="1/6" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">P(A ∪ B) · P(A / B)</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['P(S=7)', '1/6', '½ · ⅓', '1/6'].map((label, index) => (
                <g key={index} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
