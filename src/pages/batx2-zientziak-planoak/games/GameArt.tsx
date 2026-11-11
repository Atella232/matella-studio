import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { LinesPlanesGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function LinesPlanesGameArt({ game }: { game: LinesPlanesGameId }) {
    if (game === 'detective') return <DetectiveArt lines={['u · n = 0', '→ r ∥ π', 'A ∈ π ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="t = 2" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="D" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">rg M = rg M*</text>
            </svg>
        )
    }
    if (game === 'twins') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="20" y1="104" x2="200" y2="16" stroke="var(--violet, #6b4fb8)" strokeWidth="6" strokeLinecap="round" />
                <line x1="20" y1="104" x2="200" y2="16" stroke="var(--paper, #fffcf6)" strokeWidth="2" strokeDasharray="6 8" />
                <circle cx="74" cy="78" r="6" fill="var(--ink)" />
                <circle cx="146" cy="42" r="6" fill="var(--coral, #c4432a)" />
                <text x="60" y="102" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">A</text>
                <text x="150" y="66" fontSize="15" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">A + u</text>
                <text x="168" y="104" fontSize="22" fontWeight="700" fill="var(--ink)" direction="ltr">= ?</text>
            </svg>
        )
    }
    if (game === 'classify') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <polygon points="20,86 120,86 160,52 60,52" fill="var(--blue-tint, #dde7f7)" stroke="var(--blue, #2f6fdb)" strokeWidth="2" />
                <line x1="40" y1="30" x2="140" y2="106" stroke="var(--coral, #c4432a)" strokeWidth="4" />
                <line x1="150" y1="20" x2="210" y2="96" stroke="var(--success, #267b53)" strokeWidth="4" strokeDasharray="7 5" />
                <text x="176" y="40" fontSize="20" fontWeight="700" fill="var(--ink)" direction="ltr">?</text>
            </svg>
        )
    }
    if (game === 'missing') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <polygon points="30,92 140,92 190,56 80,56" fill="var(--mustard-tint, #fbebc0)" stroke="var(--mustard, #b98a12)" strokeWidth="2" />
                <line x1="110" y1="76" x2="110" y2="52" stroke="var(--violet, #6b4fb8)" strokeWidth="4" />
                <polygon points="110,42 103,56 117,56" fill="var(--violet, #6b4fb8)" />
                <rect x="30" y="14" width="26" height="26" rx="4" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
                <text x="62" y="34" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">x + y − z = 2</text>
            </svg>
        )
    }
    // Memory
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[0, 1, 2, 3].map((index) => (
                <rect key={index} x={18 + index * 48} y={index % 2 ? 30 : 22} width="40" height="62" rx="8" fill={index === 1 ? 'var(--blue-tint, #dde7f7)' : 'var(--paper-deep)'} stroke="var(--ink)" strokeWidth="2" />
            ))}
            <text x="86" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">n</text>
        </svg>
    )
}
