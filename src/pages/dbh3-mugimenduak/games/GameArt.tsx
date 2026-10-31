import { Car } from '../../../features/unit-v2/games/GameKit'
import type { Motions3GameId } from './info'

const FONT = '"Atkinson Hyperlegible", system-ui, sans-serif'

/** A small flag with its foot at (x, y), facing right or, when flipped, left */
const flag = (x: number, y: number, flip = false, colour = 'var(--blue)', tint = 'var(--blue-tint, #dde7f7)') => {
    const s = flip ? -1 : 1
    return (
        <g>
            <line x1={x} y1={y} x2={x} y2={y - 42} stroke={colour} strokeWidth="3" strokeLinecap="round" />
            <polygon points={`${x},${y - 42} ${x + s * 28},${y - 28} ${x},${y - 14}`} fill={tint} stroke={colour} strokeWidth="2" strokeLinejoin="round" />
        </g>
    )
}

/** Small illustration of each game; the art is the same in every language, so it has no words */
export function Motions3GameArt({ game }: { game: Motions3GameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="v" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="90°" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">(x, y) → (−y, x)</text>
            </svg>
        )
    }
    if (game === 'where') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                {[0, 1, 2, 3, 4, 5, 6].map((i) => <line key={`v${i}`} x1={38 + i * 24} x2={38 + i * 24} y1="6" y2="114" stroke="var(--line)" strokeWidth="1" />)}
                {[0, 1, 2, 3, 4].map((i) => <line key={`h${i}`} x1="30" x2="190" y1={12 + i * 24} y2={12 + i * 24} stroke="var(--line)" strokeWidth="1" />)}
                <circle cx="62" cy="84" r="8" fill="var(--blue)" stroke="var(--ink)" strokeWidth="1.4" />
                <line x1="62" y1="84" x2="158" y2="36" stroke="var(--success, #267b53)" strokeWidth="2.4" strokeDasharray="6 4" />
                <circle cx="158" cy="36" r="8" fill="var(--success, #267b53)" stroke="var(--ink)" strokeWidth="1.4" />
            </svg>
        )
    }
    if (game === 'which') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <line x1="110" x2="110" y1="8" y2="112" stroke="var(--success, #267b53)" strokeWidth="3" strokeDasharray="6 4" />
                {flag(76, 96)}
                {flag(144, 96, true, 'var(--coral, #c4432a)', 'var(--coral-tint, #f6d5cc)')}
                <text x="110" y="116" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">?</text>
            </svg>
        )
    }
    if (game === 'tiles') {
        const hexagon = (cx: number, cy: number) => Array.from({ length: 6 }, (_, i) => `${cx + 26 * Math.cos((Math.PI / 3) * i)},${cy + 26 * Math.sin((Math.PI / 3) * i)}`).join(' ')
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <polygon points={hexagon(84, 60)} fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
                <polygon points={hexagon(123, 37.5)} fill="var(--coral-tint, #f6d5cc)" stroke="var(--ink)" strokeWidth="2" />
                <polygon points={hexagon(123, 82.5)} fill="var(--success-tint, #d9efe2)" stroke="var(--ink)" strokeWidth="2" />
                <circle cx="110" cy="60" r="4" fill="var(--ink)" />
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
            <text x="47" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">(2, 1)</text>
            <text x="175" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">(−1, 2)</text>
        </svg>
    )
}
