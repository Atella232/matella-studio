import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import { TrigArt } from '../../dbh4-games/TrigGames'
import type { TrianglesGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function TrianglesGameArt({ game }: { game: TrianglesGameId }) {
    if (game === 'circle' || game === 'ratios') return <TrigArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['a / sin B = b / sin A', 'b ≈ 9.8 ?', 'a / sin A']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="2R" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="cos" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">a² = b² + c² − 2bc · cos A</text>
            </svg>
        )
    }
    if (game === 'count') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="14" y1="96" x2="206" y2="96" stroke="var(--ink)" strokeWidth="2" />
                <line x1="20" y1="96" x2="110" y2="30" stroke="var(--ink)" strokeWidth="3" />
                <path d="M 60 96 A 66 66 0 0 0 166 72" fill="none" stroke="var(--muted)" strokeWidth="2" strokeDasharray="5 4" />
                <line x1="110" y1="30" x2="74" y2="96" stroke="var(--coral, #c4432a)" strokeWidth="3" />
                <line x1="110" y1="30" x2="150" y2="96" stroke="var(--blue)" strokeWidth="3" />
                <circle cx="74" cy="96" r="5" fill="var(--coral, #c4432a)" />
                <circle cx="150" cy="96" r="5" fill="var(--blue)" />
                <text x="196" y="40" textAnchor="end" fontSize="22" fontWeight="700" fill="var(--ink)" direction="ltr">0 · 1 · 2</text>
            </svg>
        )
    }
    if (game === 'pieces') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <polygon points="30,100 190,100 120,20" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
                <text x="110" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">c = 8</text>
                <text x="62" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">b = 5</text>
                <text x="168" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--muted)" direction="ltr">a = ?</text>
                <text x="46" y="94" fontSize="12" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">60°</text>
                <text x="120" y="14" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--muted)" direction="ltr">?</text>
            </svg>
        )
    }
    if (game === 'station') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="8" y="8" width="204" height="88" rx="8" fill="#d6eddf" />
                <line x1="30" y1="96" x2="190" y2="96" stroke="var(--ink)" strokeWidth="3" />
                <line x1="30" y1="96" x2="122" y2="30" stroke="var(--blue)" strokeWidth="2" strokeDasharray="6 4" />
                <line x1="190" y1="96" x2="122" y2="30" stroke="var(--blue)" strokeWidth="2" strokeDasharray="6 4" />
                <line x1="122" y1="30" x2="122" y2="10" stroke="var(--ink)" strokeWidth="2" />
                <polygon points="122,10 138,15 122,20" fill="var(--coral, #c4432a)" />
                <rect x="24" y="90" width="12" height="12" fill="var(--ink)" />
                <rect x="184" y="90" width="12" height="12" fill="var(--ink)" />
                <text x="30" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">A</text>
                <text x="190" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">B</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['1230°', '150°', '5, 12, 13', 'S = 30'].map((label, index) => (
                <g key={index} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
