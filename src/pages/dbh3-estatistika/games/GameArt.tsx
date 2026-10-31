import { Car } from '../../../features/unit-v2/games/GameKit'
import type { Stats3GameId } from './info'

const FONT = '"Atkinson Hyperlegible", system-ui, sans-serif'

/** Small illustration of each game; the art is the same in every language, so it has no words */
export function Stats3GameArt({ game }: { game: Stats3GameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="x̄" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="P" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">Me · Mo · σ</text>
            </svg>
        )
    }
    if (game === 'read') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                {[30, 70, 50, 90, 40].map((height, index) => <rect key={index} x={30 + index * 34} y={106 - height} width={24} height={height} rx="3" fill={index === 3 ? 'var(--coral-tint, #f6d5cc)' : 'var(--blue-tint, #dde7f7)'} stroke={index === 3 ? 'var(--coral, #c4432a)' : 'var(--blue)'} strokeWidth="2" />)}
                <line x1="22" x2="200" y1="106" y2="106" stroke="var(--ink)" strokeWidth="2" />
            </svg>
        )
    }
    if (game === 'variable') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <circle cx="52" cy="60" r="34" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M52 60 L52 26 A34 34 0 0 1 84 70 Z" fill="var(--coral-tint, #f6d5cc)" stroke="var(--ink)" strokeWidth="2" />
                {[24, 44, 34].map((height, index) => <rect key={index} x={108 + index * 16} y={94 - height} width={10} height={height} fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth="1.6" />)}
                {[30, 50, 38, 22].map((height, index) => <rect key={`h${index}`} x={160 + index * 12} y={94 - height} width={12} height={height} fill="var(--success-tint, #d9efe2)" stroke="var(--ink)" strokeWidth="1.6" />)}
            </svg>
        )
    }
    if (game === 'bags') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                {[20, 120].map((x, bag) => (
                    <g key={bag}>
                        <path d={`M ${x + 14} 22 Q ${x} 36 ${x + 4} 100 Q ${x + 40} 116 ${x + 76} 100 Q ${x + 80} 36 ${x + 66} 22 Z`} fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
                        {Array.from({ length: bag === 0 ? 5 : 6 }, (_, index) => <circle key={index} cx={x + 22 + (index % 3) * 18} cy={52 + Math.floor(index / 3) * 22} r="7" fill={index < (bag === 0 ? 2 : 3) ? 'var(--coral, #c4432a)' : 'var(--blue)'} stroke="var(--ink)" strokeWidth="1" />)}
                    </g>
                ))}
                <text x="110" y="70" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)">?</text>
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
            <text x="47" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">2, 4, 9</text>
            <text x="175" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">x̄ = 5</text>
        </svg>
    )
}
