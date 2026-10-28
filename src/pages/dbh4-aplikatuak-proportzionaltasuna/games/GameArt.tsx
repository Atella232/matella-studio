import { Car } from '../../../features/unit-v2/games/GameKit'
import type { ProportionDbh4ApGameId } from './info'

/** Small illustration of each game; no decimal commas, the art is the same in every language */
export function ProportionDbh4ApGameArt({ game }: { game: ProportionDbh4ApGameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--green, #267b53)" label="€" x={104} y={20} width={72} />
                <Car color="var(--blue)" x={40} y={50} width={62} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">1/5 + 1/7 = 12/35</text>
            </svg>
        )
    }
    if (game === 'detective') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="28" y="8" width="118" height="104" rx="8" fill="#fffcf6" stroke="var(--ink)" strokeWidth="2" />
                <line x1="52" y1="10" x2="52" y2="110" stroke="var(--coral-tint, #f6d9cf)" strokeWidth="2" />
                {[0, 1, 2].map((line) => (
                    <g key={line} transform={`translate(0 ${30 + line * 30})`}>
                        {line === 1 && <rect x="34" y="-12" width="106" height="24" rx="6" fill="var(--error-tint, #fbe1dc)" stroke="var(--error, #c4452c)" strokeWidth="2" />}
                        <circle cx="42" cy="0" r="6" fill={line === 1 ? 'var(--error, #c4452c)' : 'var(--ink)'} />
                        <rect x="58" y="-4" width={line === 1 ? 62 : 74} height="8" rx="4" fill={line === 1 ? 'var(--error, #c4452c)' : 'var(--line)'} />
                    </g>
                ))}
                <circle cx="156" cy="66" r="24" fill="var(--blue-tint, #dde7f7)" fillOpacity="0.55" stroke="var(--ink)" strokeWidth="5" />
                <line x1="173" y1="84" x2="198" y2="108" stroke="var(--ink)" strokeWidth="9" strokeLinecap="round" />
            </svg>
        )
    }
    if (game === 'bank') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <path d="M14 42 L60 14 L106 42 Z" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
                <text x="60" y="37" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">%</text>
                {[24, 46, 68, 90].map((x) => <rect key={x} x={x - 4} y="46" width="8" height="48" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />)}
                <rect x="12" y="96" width="96" height="10" rx="2" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                {[{ x: 126, height: 44, color: 'var(--blue)' }, { x: 156, height: 74, color: 'var(--green, #267b53)' }, { x: 186, height: 58, color: 'var(--coral)' }].map((bar) => (
                    <rect key={bar.x} x={bar.x} y={106 - bar.height} width="22" height={bar.height} rx="3" fill={bar.color} stroke="var(--ink)" strokeWidth="2" />
                ))}
                <path d="M167 8l3.4 7 7.6 1-5.6 5.2 1.4 7.6-6.8-3.8-6.8 3.8 1.4-7.6-5.6-5.2 7.6-1z" fill="var(--mustard, #e0a526)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
                <line x1="118" y1="106" x2="214" y2="106" stroke="var(--ink)" strokeWidth="2" />
            </svg>
        )
    }
    if (game === 'road') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="54" width="208" height="46" rx="8" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="12" y1="77" x2="208" y2="77" stroke="var(--card, #fffcf6)" strokeWidth="2" strokeDasharray="9 7" />
                {[{ x: 40, y: 88, color: 'var(--blue)', right: true }, { x: 180, y: 66, color: 'var(--coral)', right: false }].map((car) => (
                    <g key={car.x} transform={`translate(${car.x} ${car.y})`}>
                        <rect x="-17" y="-8" width="34" height="16" rx="5" fill={car.color} stroke="var(--ink)" strokeWidth="2" />
                        <rect x={car.right ? 4 : -12} y="-5" width="8" height="10" rx="2" fill="#fff" fillOpacity="0.75" />
                    </g>
                ))}
                <line x1="124" y1="14" x2="124" y2="104" stroke="var(--ink)" strokeWidth="3" />
                <path d="M124 14 L150 22 L124 30 Z" fill="var(--mustard, #e0a526)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M66 88 H96 M88 82 L96 88 L88 94" fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M154 66 H136 M144 60 L136 66 L144 72" fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    }
    if (game === 'mix') {
        // The sacks sit at distances 2 and 3 from the support: 6 · 2 = 4 · 3
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="8" y1="104" x2="212" y2="104" stroke="var(--line)" strokeWidth="2" />
                <path d="M110 74 L96 104 H124 Z" fill="var(--green, #267b53)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
                <line x1="14" y1="72" x2="210" y2="72" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
                <rect x="40" y="22" width="40" height="47" rx="9" fill="#c4a27a" stroke="var(--ink)" strokeWidth="2" />
                <path d="M52 23 l8 -7 l8 7" fill="#c4a27a" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
                <rect x="165" y="38" width="40" height="31" rx="9" fill="#8a5a33" stroke="var(--ink)" strokeWidth="2" />
                <path d="M177 39 l8 -7 l8 7" fill="#8a5a33" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
                <text x="60" y="51" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">6</text>
                <text x="185" y="59" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">4</text>
                <text x="122" y="54" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">6·2 = 4·3</text>
            </svg>
        )
    }
    if (game === 'till') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="14" y="58" width="112" height="54" rx="8" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="24" y="20" width="92" height="30" rx="5" fill="#1d2733" stroke="var(--ink)" strokeWidth="2" />
                <text x="108" y="41" textAnchor="end" fontSize="16" fontWeight="700" fill="#9fe3b4" direction="ltr">68 €</text>
                <line x1="70" y1="50" x2="70" y2="58" stroke="var(--ink)" strokeWidth="3" />
                {[0, 1, 2].map((row) => [0, 1, 2].map((column) => <rect key={`${row}-${column}`} x={26 + column * 24} y={66 + row * 14} width="18" height="10" rx="2" fill="var(--card, #fffcf6)" stroke="var(--ink)" strokeWidth="1.5" />))}
                <rect x="100" y="66" width="18" height="38" rx="3" fill="var(--green, #267b53)" stroke="var(--ink)" strokeWidth="1.5" />
                <g transform="rotate(10 172 58)">
                    <path d="M140 36 H196 a6 6 0 0 1 6 6 V86 a6 6 0 0 1 -6 6 H140 L128 64 Z" fill="#fffcf6" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
                    <circle cx="142" cy="64" r="4" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="1.5" />
                    <text x="174" y="62" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">80 €</text>
                    <rect x="152" y="70" width="44" height="16" rx="8" fill="var(--coral)" />
                    <text x="174" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" direction="ltr">−15 %</text>
                </g>
            </svg>
        )
    }
    if (game === 'tank') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="56" y="66" width="108" height="46" fill="var(--blue)" fillOpacity="0.35" />
                <rect x="56" y="40" width="108" height="72" fill="none" stroke="var(--ink)" strokeWidth="2.4" />
                {[84, 136].map((x) => (
                    <g key={x}>
                        <rect x={x - 5} y="8" width="10" height="16" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                        <rect x={x - 10} y="22" width="20" height="8" rx="2" fill="var(--blue)" stroke="var(--ink)" strokeWidth="2" />
                        <rect x={x - 2.5} y="30" width="5" height="36" fill="var(--blue)" fillOpacity="0.7" />
                    </g>
                ))}
                <path d="M164 104 H186 V116" fill="none" stroke="var(--ink)" strokeWidth="7" strokeLinejoin="round" />
                <path d="M164 104 H186 V116" fill="none" stroke="var(--coral)" strokeWidth="4" strokeLinejoin="round" />
                <circle cx="196" cy="34" r="17" fill="var(--card, #fffcf6)" stroke="var(--ink)" strokeWidth="2.4" />
                <path d="M196 23 V34 L204 39" fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />
                <text x="28" y="96" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">+1/6</text>
                <text x="28" y="76" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">1/3</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['1000', '×110/100', '×110/100', '1210'].map((label, index) => (
                <g key={index} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize={label.length > 5 ? 8 : 11} fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
