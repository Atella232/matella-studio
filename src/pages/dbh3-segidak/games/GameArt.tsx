import { Car } from '../../../features/unit-v2/games/GameKit'
import type { SequencesGameId } from './info'

const FONT = '"Atkinson Hyperlegible", system-ui, sans-serif'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function SequencesGameArt({ game }: { game: SequencesGameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="aₙ" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="d" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">3, 7, 11, 15, …</text>
            </svg>
        )
    }
    if (game === 'hidden') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                {['2', '6', '18', '?', '162'].map((text, index) => (
                    <g key={index}>
                        <rect x={8 + index * 42} y="40" width="36" height="36" rx="8" fill={text === '?' ? 'var(--mustard-tint, #fbebc0)' : 'var(--card)'} stroke="var(--ink)" strokeWidth="2" strokeDasharray={text === '?' ? '5 4' : undefined} />
                        <text x={26 + index * 42} y="64" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">{text}</text>
                    </g>
                ))}
            </svg>
        )
    }
    if (game === 'sorter') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <rect x="40" y="10" width="140" height="34" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
                <text x="110" y="33" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">5, 10, 20, 40</text>
                <rect x="10" y="70" width="60" height="40" rx="8" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="80" y="70" width="60" height="40" rx="8" fill="var(--coral-tint, #f6d5cc)" stroke="var(--ink)" strokeWidth="3" />
                <rect x="150" y="70" width="60" height="40" rx="8" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <text x="40" y="96" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">+d</text>
                <text x="110" y="96" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">·r</text>
                <text x="180" y="96" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">?</text>
            </svg>
        )
    }
    if (game === 'staircase') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                {[1, 2, 3, 4, 5].map((blocks, row) => (
                    <rect key={row} x={110 - blocks * 14} y={14 + row * 20} width={blocks * 28} height="18" fill="var(--blue-tint, #dde7f7)" stroke="var(--blue)" strokeWidth="2" />
                ))}
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
            <text x="47" y="62" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">a₅</text>
            <text x="175" y="62" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">?</text>
        </svg>
    )
}
