import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { SpaceVectorsGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function SpaceVectorsGameArt({ game }: { game: SpaceVectorsGameId }) {
    if (game === 'detective') return <DetectiveArt lines={['(1, 2, 3) × (0, 1, 1)', '= (−1, +1, 1) ?', 'S = ½ |AB × AC|']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="u×v" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="|u|" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">[u, v, w]</text>
            </svg>
        )
    }
    if (game === 'kind') {
        const cards: Array<[string, string, string]> = [['u · v', 'var(--success-tint, #d9efe2)', '7'], ['u × v', 'var(--blue-tint, #dde7f7)', '(1, 5, 2)'], ['(u·v) × w', 'var(--coral-tint, #f6d5cc)', '?']]
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {cards.map(([top, fill, bottom], index) => (
                    <g key={top} transform={`translate(${8 + index * 70} ${index === 1 ? 16 : 26})`}>
                        <rect width="66" height="78" rx="10" fill={fill} stroke="var(--ink)" strokeWidth="2" />
                        <text x="33" y="32" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">{top}</text>
                        <text x="33" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">{bottom}</text>
                    </g>
                ))}
            </svg>
        )
    }
    if (game === 'cross') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <polygon points="80,92 150,92 170,70 100,70" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="80" y1="92" x2="150" y2="92" stroke="var(--coral, #c4432a)" strokeWidth="4" />
                <line x1="80" y1="92" x2="100" y2="70" stroke="var(--blue, #2f6fdb)" strokeWidth="4" />
                <line x1="80" y1="92" x2="80" y2="22" stroke="var(--success, #267b53)" strokeWidth="4" />
                <polygon points="80,12 73,26 87,26" fill="var(--success, #267b53)" />
                <line x1="80" y1="92" x2="44" y2="112" stroke="var(--muted)" strokeWidth="3" strokeDasharray="5 4" />
                <text x="92" y="30" fontSize="15" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">u × v</text>
                <text x="176" y="40" fontSize="22" fontWeight="700" fill="var(--ink)" direction="ltr">?</text>
            </svg>
        )
    }
    if (game === 'flat') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <polygon points="40,90 120,90 150,70 70,70" fill="var(--success-tint, #d9efe2)" stroke="var(--success, #267b53)" strokeWidth="2" />
                <polygon points="40,90 40,40 70,20 70,70" fill="var(--success-tint, #d9efe2)" fillOpacity="0.5" stroke="var(--success, #267b53)" strokeWidth="2" strokeDasharray="5 4" />
                <polygon points="40,40 120,40 150,20 70,20" fill="none" stroke="var(--success, #267b53)" strokeWidth="2" strokeDasharray="5 4" />
                <line x1="120" y1="90" x2="120" y2="40" stroke="var(--success, #267b53)" strokeWidth="2" strokeDasharray="5 4" />
                <path d="M 170 30 L 170 74" stroke="var(--coral, #c4432a)" strokeWidth="4" />
                <polygon points="170,84 163,70 177,70" fill="var(--coral, #c4432a)" />
                <text x="160" y="110" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">V = 0</text>
            </svg>
        )
    }
    // Memory
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[0, 1, 2, 3].map((index) => (
                <rect key={index} x={18 + index * 48} y={index % 2 ? 30 : 22} width="40" height="62" rx="8" fill={index === 1 ? 'var(--blue-tint, #dde7f7)' : 'var(--paper-deep)'} stroke="var(--ink)" strokeWidth="2" />
            ))}
            <text x="86" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">u×v</text>
        </svg>
    )
}
