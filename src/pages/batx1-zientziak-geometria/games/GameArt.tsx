import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import { VectorArt } from '../../dbh4-games/VectorGames'
import type { BachGeometryGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function BachGeometryGameArt({ game }: { game: BachGeometryGameId }) {
    if (game === 'lines') return <VectorArt game="lines" />
    if (game === 'detective') return <DetectiveArt lines={['3x − y + 2 = 0', 'd = (3, −1) ?', 'd = (1, 3)']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="m" x={104} y={20} width={60} />
                <Car color="var(--blue)" label="d" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">Ax + By + C = 0</text>
            </svg>
        )
    }
    if (game === 'twins') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="20" y1="104" x2="200" y2="14" stroke="var(--blue, #2f6fdb)" strokeWidth="6" />
                <line x1="20" y1="104" x2="200" y2="14" stroke="var(--paper, #fffcf6)" strokeWidth="2" strokeDasharray="8 8" />
                <text x="18" y="34" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">y = x/2 + 1</text>
                <text x="104" y="104" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">x − 2y + 2 = 0</text>
            </svg>
        )
    }
    if (game === 'radar') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <circle cx="80" cy="64" r="44" fill="var(--success-tint, #d9efe2)" stroke="var(--success, #267b53)" strokeWidth="2" strokeDasharray="6 4" />
                <circle cx="80" cy="64" r="22" fill="none" stroke="var(--success, #267b53)" strokeWidth="1.4" />
                <circle cx="80" cy="64" r="5" fill="var(--success, #267b53)" />
                <line x1="150" y1="6" x2="196" y2="116" stroke="var(--ink)" strokeWidth="3" />
                <line x1="80" y1="64" x2="168" y2="49" stroke="var(--coral, #c4432a)" strokeWidth="3" />
                <polygon points="-9,-6 11,0 -9,6" transform="translate(184 86) rotate(67)" fill="var(--blue, #2f6fdb)" stroke="var(--ink)" strokeWidth="1.2" />
                <text x="120" y="48" fontSize="16" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">d</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['2x − 3y = 0', 'm = 2/3', 'P(1, 1)', 'd = 1'].map((label, index) => (
                <g key={index} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize="7" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
