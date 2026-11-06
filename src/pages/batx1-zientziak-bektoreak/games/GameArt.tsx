import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import { VectorArt } from '../../dbh4-games/VectorGames'
import type { BachVectorsGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function BachVectorsGameArt({ game }: { game: BachVectorsGameId }) {
    if (game === 'jump') return <VectorArt game="jump" />
    if (game === 'lines') return <VectorArt game="lines" />
    if (game === 'detective') return <DetectiveArt lines={['(2, 3) · (4, 1)', '= (8, 3) ?', '|v| = √(x² + y²)']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="u·v" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="|u|" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">u₁v₁ + u₂v₂ · cos α</text>
            </svg>
        )
    }
    if (game === 'kind') {
        const cards: Array<[string, string, string]> = [['u · v', 'var(--success-tint, #d9efe2)', '7'], ['2u − v', 'var(--blue-tint, #dde7f7)', '(1, 5)'], ['u + 3', 'var(--coral-tint, #f6d5cc)', '?']]
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {cards.map(([top, fill, bottom], index) => (
                    <g key={top} transform={`translate(${12 + index * 70} ${index === 1 ? 16 : 26})`}>
                        <rect width="62" height="78" rx="10" fill={fill} stroke="var(--ink)" strokeWidth="2" />
                        <text x="31" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">{top}</text>
                        <text x="31" y="60" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">{bottom}</text>
                    </g>
                ))}
            </svg>
        )
    }
    if (game === 'polygon') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <polygon points="70,100 150,100 110,31" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="70" y1="100" x2="140" y2="100" stroke="var(--blue, #2f6fdb)" strokeWidth="4" />
                <polygon points="150,100 138,94 138,106" fill="var(--blue, #2f6fdb)" />
                <line x1="150" y1="100" x2="116" y2="41" stroke="var(--coral, #c4432a)" strokeWidth="4" />
                <polygon points="110,31 111,45 123,38" fill="var(--coral, #c4432a)" />
                <line x1="150" y1="100" x2="205" y2="100" stroke="var(--blue, #2f6fdb)" strokeWidth="2" strokeDasharray="5 4" />
                <path d="M172 100 A 22 22 0 0 0 139 81" fill="none" stroke="var(--coral, #c4432a)" strokeWidth="2" />
                <text x="182" y="80" fontSize="14" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">120°</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['(2,3)·(4,1)', '11', '|(3,4)|', '5'].map((label, index) => (
                <g key={index} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
