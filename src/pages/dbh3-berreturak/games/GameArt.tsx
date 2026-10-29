import { Car } from '../../../features/unit-v2/games/GameKit'
import type { PowersGameId } from './info'

const FONT = '"Atkinson Hyperlegible", system-ui, sans-serif'

/** Small illustration of each game; the art is the same in every language */
export function PowersGameArt({ game }: { game: PowersGameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="√" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="10ⁿ" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">2⁻³ · 6·10⁴ · √72</text>
            </svg>
        )
    }
    if (game === 'order') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <line x1="14" y1="70" x2="206" y2="70" stroke="var(--ink)" strokeWidth="3" />
                {[-10, -5, 0, 5, 10, 15, 20].map((exponent, index) => (
                    <g key={exponent}>
                        <line x1={20 + index * 30} y1="62" x2={20 + index * 30} y2="78" stroke="var(--ink)" strokeWidth="2" />
                        <text x={20 + index * 30} y="96" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--muted, #58616e)">{`10${exponent < 0 ? '⁻' : ''}${String(Math.abs(exponent)).split('').map((digit) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(digit)]).join('')}`}</text>
                    </g>
                ))}
                {[[20, 'var(--blue)'], [80, 'var(--mustard, #e0a100)'], [140, 'var(--coral, #c4432a)'], [200, 'var(--green, #267b53)']].map(([x, color], index) => (
                    <circle key={index} cx={x as number} cy={44 - index * 4} r={7 + index * 3} fill={color as string} fillOpacity="0.35" stroke="var(--ink)" strokeWidth="2" />
                ))}
            </svg>
        )
    }
    if (game === 'extract') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <text x="34" y="84" textAnchor="middle" fontSize="40" fontWeight="700" fill="var(--coral, #c4432a)">6</text>
                <path d="M62 84 l8 -10 l10 28 l12 -70 h74" fill="none" stroke="var(--ink)" strokeWidth="3" />
                <text x="148" y="68" textAnchor="middle" fontSize="38" fontWeight="700" fill="var(--ink)">2</text>
                {[0, 1, 2].map((index) => (
                    <rect key={index} x={102 + index * 28} y="92" width="22" height="22" rx="6" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
                ))}
            </svg>
        )
    }
    if (game === 'guard') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <path d="M10 84 Q 110 30 210 84" fill="none" stroke="var(--ink)" strokeWidth="4" />
                <line x1="110" y1="40" x2="110" y2="96" stroke="var(--ink)" strokeWidth="3" />
                <text x="58" y="68" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--blue)">ℚ</text>
                <text x="164" y="68" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--coral, #c4432a)">π</text>
                <text x="110" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)">√2 ?</text>
            </svg>
        )
    }
    if (game === 'detective') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                {['−3² = 9', '2⁻³ = −8', '√9+√16 = 7'].map((line, index) => (
                    <g key={line}>
                        <rect x="14" y={16 + index * 32} width="192" height="26" rx="8" fill={index === 1 ? 'var(--coral-tint, #f6d5cc)' : 'var(--paper-deep)'} stroke="var(--ink)" strokeWidth="2" />
                        <text x="110" y={34 + index * 32} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">{line}</text>
                    </g>
                ))}
                <circle cx="190" cy="62" r="14" fill="none" stroke="var(--coral, #c4432a)" strokeWidth="3" />
                <line x1="200" y1="72" x2="212" y2="86" stroke="var(--coral, #c4432a)" strokeWidth="4" />
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['2⁻³', '1/8', '√72', '6√2'].map((label, index) => (
                <g key={index} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
