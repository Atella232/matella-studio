import { Car } from '../../../features/unit-v2/games/GameKit'
import type { Polynomials3GameId } from './info'

const FONT = '"Atkinson Hyperlegible", system-ui, sans-serif'

/** Small illustration of each game; the art is the same in every language, so it has no words */
export function Polynomials3GameArt({ game }: { game: Polynomials3GameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="x²" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="x" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">(x + 3)² = x² + 6x + 9</text>
            </svg>
        )
    }
    if (game === 'alike') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                {['3x²', '−x²', '5x', 'x²y', '7x²', '2'].map((text, index) => {
                    const like = index === 0 || index === 1 || index === 4
                    return (
                        <g key={index}>
                            <rect x={10 + (index % 3) * 70} y={14 + Math.floor(index / 3) * 52} width="60" height="40" rx="8" fill={like ? 'var(--blue-tint, #dde7f7)' : 'var(--card)'} stroke="var(--ink)" strokeWidth={like ? 3 : 2} />
                            <text x={40 + (index % 3) * 70} y={40 + Math.floor(index / 3) * 52} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">{text}</text>
                        </g>
                    )
                })}
            </svg>
        )
    }
    if (game === 'identity') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <rect x="20" y="14" width="56" height="56" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="76" y="14" width="24" height="56" fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="20" y="70" width="56" height="24" fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="76" y="70" width="24" height="24" fill="var(--coral-tint, #f6d5cc)" stroke="var(--ink)" strokeWidth="2" />
                <text x="160" y="50" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">a² + ? + b²</text>
                <rect x="132" y="66" width="56" height="34" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" strokeDasharray="5 4" />
                <text x="160" y="89" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">2ab</text>
            </svg>
        )
    }
    if (game === 'ruffini') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                {['1', '−6', '11', '−6'].map((value, index) => <text key={`t${index}`} x={70 + index * 40} y={30} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">{value}</text>)}
                {['1', '−5', '6'].map((value, index) => <text key={`m${index}`} x={110 + index * 40} y={62} textAnchor="middle" fontSize="14" fill="var(--blue)">{value}</text>)}
                {['1', '−5', '6', '0'].map((value, index) => <text key={`b${index}`} x={70 + index * 40} y={100} textAnchor="middle" fontSize="15" fontWeight="700" fill={index === 3 ? 'var(--coral, #c4432a)' : 'var(--ink)'}>{value}</text>)}
                <text x="32" y="62" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--blue)">1</text>
                <line x1="48" x2="48" y1="12" y2="108" stroke="var(--ink)" strokeWidth="2" />
                <line x1="20" x2="210" y1="76" y2="76" stroke="var(--ink)" strokeWidth="2" />
                <rect x="178" y="82" width="28" height="28" rx="6" fill="none" stroke="var(--coral, #c4432a)" strokeWidth="2" />
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
            <text x="47" y="62" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">(a+b)²</text>
            <text x="175" y="62" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)">?</text>
        </svg>
    )
}
