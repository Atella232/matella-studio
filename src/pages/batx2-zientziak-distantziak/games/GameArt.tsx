import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { AnglesDistancesGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function AnglesDistancesGameArt({ game }: { game: AnglesDistancesGameId }) {
    if (game === 'detective') return <DetectiveArt lines={['cos α = u · v', '→ |u · v| ?', 'd = V / |u × v|']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="60°" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="d" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">P′ = 2M − P</text>
            </svg>
        )
    }
    if (game === 'sine') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <polygon points="20,92 140,92 196,62 76,62" fill="var(--violet-tint, #e7e0f6)" stroke="var(--violet, #6b4fb8)" strokeWidth="2" />
                <line x1="64" y1="80" x2="150" y2="18" stroke="var(--coral, #c4432a)" strokeWidth="4" strokeLinecap="round" />
                <path d="M 96 80 A 32 32 0 0 0 90 62" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
                <text x="100" y="74" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">α</text>
                <text x="150" y="44" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">sin?</text>
                <text x="18" y="30" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">cos?</text>
            </svg>
        )
    }
    if (game === 'mirror') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <polygon points="20,78 150,78 200,48 70,48" fill="var(--blue-tint, #dde7f7)" stroke="var(--blue, #2f6fdb)" strokeWidth="2" />
                <line x1="110" y1="16" x2="110" y2="108" stroke="var(--ink)" strokeWidth="2" strokeDasharray="5 5" />
                <circle cx="110" cy="20" r="6" fill="var(--coral, #c4432a)" />
                <circle cx="110" cy="63" r="5" fill="var(--mustard, #b98a12)" />
                <circle cx="110" cy="104" r="6" fill="none" stroke="var(--success, #267b53)" strokeWidth="3" />
                <text x="122" y="26" fontSize="15" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">P</text>
                <text x="122" y="108" fontSize="15" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">P′ ?</text>
            </svg>
        )
    }
    if (game === 'nearer') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <polygon points="10,100 100,100 130,76 40,76" fill="var(--mustard-tint, #fbebc0)" stroke="var(--mustard, #b98a12)" strokeWidth="2" />
                <line x1="130" y1="104" x2="210" y2="14" stroke="var(--coral, #c4432a)" strokeWidth="4" strokeLinecap="round" />
                <circle cx="96" cy="30" r="6" fill="var(--ink)" />
                <line x1="96" y1="30" x2="84" y2="88" stroke="var(--mustard, #b98a12)" strokeWidth="2.5" strokeDasharray="5 4" />
                <line x1="96" y1="30" x2="164" y2="66" stroke="var(--coral, #c4432a)" strokeWidth="2.5" strokeDasharray="5 4" />
                <text x="80" y="24" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">P</text>
                <text x="150" y="30" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">?</text>
            </svg>
        )
    }
    // Memory
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[0, 1, 2, 3].map((index) => (
                <rect key={index} x={18 + index * 48} y={index % 2 ? 30 : 22} width="40" height="62" rx="8" fill={index === 1 ? 'var(--blue-tint, #dde7f7)' : 'var(--paper-deep)'} stroke="var(--ink)" strokeWidth="2" />
            ))}
            <text x="86" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">d</text>
        </svg>
    )
}
