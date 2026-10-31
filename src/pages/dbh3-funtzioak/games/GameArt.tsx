import { Car } from '../../../features/unit-v2/games/GameKit'
import type { Functions3GameId } from './info'

const FONT = '"Atkinson Hyperlegible", system-ui, sans-serif'

/** Two small axes with their origin at (x, y) */
const axes = (x: number, y: number, width: number, height: number) => (
    <g>
        <line x1={x} x2={x + width} y1={y} y2={y} stroke="var(--muted)" strokeWidth="1.6" />
        <line x1={x} x2={x} y1={y} y2={y - height} stroke="var(--muted)" strokeWidth="1.6" />
    </g>
)

/** Small illustration of each game; the art is the same in every language, so it has no words */
export function Functions3GameArt({ game }: { game: Functions3GameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 82 L 206 42" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="m" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="n" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">y = mx + n</text>
            </svg>
        )
    }
    if (game === 'match') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                {axes(30, 104, 90, 92)}
                <line x1="30" y1="96" x2="116" y2="18" stroke="var(--blue)" strokeWidth="3.4" />
                <rect x="132" y="22" width="78" height="28" rx="7" fill="var(--success-tint, #d9efe2)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="132" y="62" width="78" height="28" rx="7" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
                <text x="171" y="41" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">y = 2x + 1</text>
                <text x="171" y="81" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">y = x + 2</text>
            </svg>
        )
    }
    if (game === 'story') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                {axes(34, 104, 160, 90)}
                <polyline points="34,104 80,50 126,50 190,104" fill="none" stroke="var(--blue)" strokeWidth="3.4" strokeLinejoin="round" />
                <circle cx="126" cy="50" r="7" fill="var(--coral, #c4432a)" stroke="var(--ink)" strokeWidth="1.4" />
                <text x="44" y="28" fontSize="20">🚶</text>
            </svg>
        )
    }
    if (game === 'signs') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <line x1="20" x2="200" y1="60" y2="60" stroke="var(--muted)" strokeWidth="1.6" />
                <line x1="110" x2="110" y1="8" y2="112" stroke="var(--muted)" strokeWidth="1.6" />
                <path d="M 50 14 Q 90 150, 150 40" fill="none" stroke="var(--blue)" strokeWidth="3.4" />
                <text x="168" y="34" fontSize="26" fontWeight="700" fill="var(--success, #267b53)">+</text>
                <text x="40" y="104" fontSize="30" fontWeight="700" fill="var(--coral, #c4432a)">−</text>
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
            <text x="47" y="62" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">x² − 4x</text>
            <text x="175" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">(2, −4)</text>
        </svg>
    )
}
