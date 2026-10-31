import { Car } from '../../../features/unit-v2/games/GameKit'
import type { Equations3GameId } from './info'

const FONT = '"Atkinson Hyperlegible", system-ui, sans-serif'

/** Small illustration of each game; the art is the same in every language, so it has no words */
export function Equations3GameArt({ game }: { game: Equations3GameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="x" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="y" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">3x + 5 = 20</text>
            </svg>
        )
    }
    if (game === 'step') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <text x="110" y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">5x + 2 = 3x + 8</text>
                {['2x = 6', '8x = 6', '2x = 10'].map((text, index) => (
                    <g key={index}>
                        <rect x="40" y={36 + index * 27} width="140" height="23" rx="7" fill={index === 0 ? 'var(--success-tint, #d9efe2)' : 'var(--card)'} stroke="var(--ink)" strokeWidth={index === 0 ? 2.5 : 1.5} />
                        <text x="110" y={53 + index * 27} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)">{text}</text>
                    </g>
                ))}
            </svg>
        )
    }
    if (game === 'roots') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <path d="M30 10 Q 110 170, 190 10" fill="none" stroke="var(--blue)" strokeWidth="3" />
                <line x1="10" x2="210" y1="70" y2="70" stroke="var(--ink)" strokeWidth="2" />
                {[-4, -2, 0, 2, 4].map((value, index) => <text key={value} x={30 + index * 40} y="96" textAnchor="middle" fontSize="13" fill="var(--muted)">{value}</text>)}
                <circle cx="57" cy="70" r="7" fill="var(--coral, #c4432a)" stroke="var(--ink)" strokeWidth="1.4" />
                <circle cx="163" cy="70" r="7" fill="var(--coral, #c4432a)" stroke="var(--ink)" strokeWidth="1.4" />
            </svg>
        )
    }
    if (game === 'crossing') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                {[0, 1, 2, 3, 4, 5].map((i) => <line key={`v${i}`} x1={50 + i * 24} x2={50 + i * 24} y1="0" y2="120" stroke="var(--line)" strokeWidth="1" />)}
                {[0, 1, 2, 3, 4].map((i) => <line key={`h${i}`} x1="40" x2="180" y1={12 + i * 24} y2={12 + i * 24} stroke="var(--line)" strokeWidth="1" />)}
                <line x1="40" y1="108" x2="180" y2="12" stroke="var(--blue)" strokeWidth="3" />
                <line x1="40" y1="20" x2="180" y2="110" stroke="var(--coral, #c4432a)" strokeWidth="3" />
                <circle cx="111" cy="60" r="7" fill="var(--success, #267b53)" stroke="var(--ink)" strokeWidth="1.4" />
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
            <text x="47" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)">x² = 9</text>
            <text x="175" y="62" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">?</text>
        </svg>
    )
}
