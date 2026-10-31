import { Car } from '../../../features/unit-v2/games/GameKit'
import { Gear } from '../figures'
import type { Proportion3GameId } from './info'

const FONT = '"Atkinson Hyperlegible", system-ui, sans-serif'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function Proportion3GameArt({ game }: { game: Proportion3GameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="%" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="a:b" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">3/4 = 9/x · 1:50 000</text>
            </svg>
        )
    }
    if (game === 'gearbox') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <Gear cx={62} cy={62} radius={30} teeth={12} color="var(--blue)" tint="var(--blue-tint, #dde7f7)" />
                <Gear cx={62 + 30 + 7 + 45} cy={62} radius={45} teeth={18} angle={10} color="var(--coral, #c4432a)" tint="var(--coral-tint, #f6d5cc)" />
            </svg>
        )
    }
    if (game === 'copier') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <rect x="18" y="44" width="40" height="30" rx="4" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="84" y="34" width="54" height="40" rx="4" fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="160" y="26" width="44" height="33" rx="4" fill="var(--coral-tint, #f6d5cc)" stroke="var(--ink)" strokeWidth="2" />
                <text x="70" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">→</text>
                <text x="149" y="52" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">→</text>
                <text x="70" y="102" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--blue)">+35%</text>
                <text x="150" y="102" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--coral, #c4432a)">−20%</text>
            </svg>
        )
    }
    if (game === 'loot') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                {[[40, 2], [110, 4], [180, 6]].map(([x, coins]) => (
                    <g key={x}>
                        {Array.from({ length: coins }, (_, index) => <ellipse key={index} cx={x} cy={96 - index * 9} rx="20" ry="6" fill="var(--mustard, #e0a100)" stroke="var(--ink)" strokeWidth="2" />)}
                    </g>
                ))}
                <text x="40" y="20" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">1</text>
                <text x="110" y="20" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">2</text>
                <text x="180" y="20" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">3</text>
            </svg>
        )
    }
    if (game === 'treasure') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <rect x="10" y="10" width="200" height="86" rx="8" fill="#e8f1df" stroke="var(--ink)" strokeWidth="2" />
                <path d="M30 70 C 70 30, 120 90, 170 46" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeDasharray="3 6" />
                <text x="176" y="50" fontSize="22" fontWeight="700" fill="var(--coral, #c4432a)">✕</text>
                <rect x="30" y="102" width="120" height="8" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
                {[0, 1, 2, 3, 4].map((tick) => <line key={tick} x1={30 + tick * 30} x2={30 + tick * 30} y1="102" y2="110" stroke="var(--ink)" strokeWidth="1.5" />)}
                <text x="190" y="112" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">1:50 000</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
            {[0, 1, 2].map((index) => (
                <rect key={index} x={22 + index * 64} y={index % 2 === 0 ? 24 : 38} width="50" height="64" rx="8" fill={index === 1 ? 'var(--blue-tint, #dde7f7)' : 'var(--card)'} stroke="var(--ink)" strokeWidth="2" />
            ))}
            <text x="47" y="62" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">+20%</text>
            <text x="175" y="62" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">?</text>
        </svg>
    )
}
