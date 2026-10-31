import { Car } from '../../../features/unit-v2/games/GameKit'
import type { Geometry3GameId } from './info'

const FONT = '"Atkinson Hyperlegible", system-ui, sans-serif'

/** Small illustration of each game; the art is the same in every language, so it has no words */
export function Geometry3GameArt({ game }: { game: Geometry3GameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="a²" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="°" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">3² + 4² = 5²</text>
            </svg>
        )
    }
    if (game === 'angles') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <polygon points="30,105 190,105 90,15" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2.4" strokeLinejoin="round" />
                <text x="58" y="96" fontSize="15" fontWeight="700" fill="var(--ink)">60°</text>
                <text x="150" y="96" fontSize="15" fontWeight="700" fill="var(--ink)">45°</text>
                <text x="92" y="48" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--coral, #c4432a)">?</text>
            </svg>
        )
    }
    if (game === 'triangle') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <polygon points="40,100 160,100 40,20" fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth="2.4" />
                <path d="M40 88 h12 v12" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
                <text x="100" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)">4</text>
                <text x="28" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)">3</text>
                <text x="112" y="54" fontSize="14" fontWeight="700" fill="var(--ink)">5</text>
                <text x="190" y="66" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--success, #267b53)">✓</text>
            </svg>
        )
    }
    if (game === 'point') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <polygon points="40,105 180,105 120,15" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2.4" />
                <line x1="40" y1="105" x2="150" y2="60" stroke="var(--coral, #c4432a)" strokeWidth="2" />
                <line x1="180" y1="105" x2="80" y2="60" stroke="var(--coral, #c4432a)" strokeWidth="2" />
                <line x1="120" y1="15" x2="110" y2="105" stroke="var(--coral, #c4432a)" strokeWidth="2" />
                <circle cx="113" cy="75" r="6" fill="var(--success, #267b53)" stroke="var(--ink)" strokeWidth="1.4" />
            </svg>
        )
    }
    if (game === 'detective') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <rect x="30" y="14" width="120" height="92" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
                {[0, 1, 2].map((index) => <line key={index} x1="44" x2="136" y1={38 + index * 24} y2={38 + index * 24} stroke={index === 1 ? 'var(--coral, #c4432a)' : 'var(--line)'} strokeWidth="4" strokeLinecap="round" />)}
                <circle cx="160" cy="72" r="24" fill="none" stroke="var(--ink)" strokeWidth="4" />
                <line x1="177" y1="89" x2="200" y2="112" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
            {[0, 1, 2].map((index) => (
                <rect key={index} x={22 + index * 64} y={index % 2 === 0 ? 24 : 38} width="50" height="64" rx="8" fill={index === 1 ? 'var(--blue-tint, #dde7f7)' : 'var(--card)'} stroke="var(--ink)" strokeWidth="2" />
            ))}
            <text x="47" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)">6, 8</text>
            <text x="175" y="62" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">10</text>
        </svg>
    )
}
