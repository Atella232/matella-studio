import { Car } from '../../../features/unit-v2/games/GameKit'
import type { GeometryGameId } from './info'

/** Small illustration of each geometry game, in the notebook style */
export function GeometryGameArt({ game }: { game: GeometryGameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral)" label="°" x={104} y={20} width={72} />
                <Car color="var(--blue)" x={40} y={50} width={62} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">a² = b² + c²</text>
            </svg>
        )
    }
    if (game === 'angles') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="60" y1="96" x2="190" y2="96" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
                <line x1="60" y1="96" x2="150" y2="20" stroke="var(--blue)" strokeWidth="3" strokeLinecap="round" />
                <path d="M100 96 A40 40 0 0 0 91 70" fill="none" stroke="var(--coral)" strokeWidth="2.4" />
                <text x="118" y="84" fontSize="16" fontWeight="700" fill="var(--coral)">?°</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['6·4', '24', '90°−35°', '55°'].map((label, index) => (
                <g key={label} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--ink)">{label}</text>
                </g>
            ))}
        </svg>
    )
}
