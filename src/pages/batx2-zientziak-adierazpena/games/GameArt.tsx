import { Car } from '../../../features/unit-v2/games/GameKit'
import { BachApplicationsGameArt } from '../../batx1-zientziak-aplikazioak/games/GameArt'
import { BachLimitsGameArt } from '../../batx1-zientziak-limiteak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { Bach2SketchGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas and no sin */
export function Bach2SketchGameArt({ game }: { game: Bach2SketchGameId }) {
    if (game === 'updown') return <BachApplicationsGameArt game="updown" />
    if (game === 'asymptote') return <BachLimitsGameArt game="asymptote" />
    if (game === 'detective') return <DetectiveArt lines={['√x² = x ?', 'f(|x|) = |f(x)| ?', 'f′ = 0 ⇒ max ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 82 Q 60 40, 110 62 T 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="y" x={104} y={20} width={60} />
                <Car color="var(--blue)" label="x" x={52} y={54} width={50} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">x = 2 · y = 1 · y = x</text>
            </svg>
        )
    }
    if (game === 'graph') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="6" width="208" height="108" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                {[0, 1, 2].map((k) => (
                    <g key={k} transform={`translate(${16 + k * 66} 40)`}>
                        <rect width="56" height="56" rx="6" fill="var(--card, #fffcf6)" stroke="var(--ink)" strokeWidth="1.5" />
                        <line x1="4" x2="52" y1="28" y2="28" stroke="var(--ink)" strokeWidth="1" />
                        <line x1="28" x2="28" y1="4" y2="52" stroke="var(--ink)" strokeWidth="1" />
                        <path d={['M6 50 C 20 10, 36 10, 50 50', 'M6 6 C 20 46, 36 46, 50 6', 'M6 40 L 50 16'][k]} fill="none" stroke={k === 0 ? 'var(--coral, #c4432a)' : 'var(--blue)'} strokeWidth="3" />
                    </g>
                ))}
                <text x="110" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">f(x) = ?</text>
            </svg>
        )
    }
    if (game === 'read') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="6" width="208" height="108" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="20" x2="200" y1="70" y2="70" stroke="var(--ink)" strokeWidth="2" />
                <path d="M30 22 Q 110 140, 190 22" fill="none" stroke="var(--coral, #c4432a)" strokeWidth="4" strokeLinecap="round" />
                <text x="58" y="56" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">+</text>
                <text x="110" y="96" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">−</text>
                <text x="162" y="56" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">+</text>
                <text x="110" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">y = f′(x)</text>
            </svg>
        )
    }
    if (game === 'sight') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="6" width="208" height="108" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="100" x2="100" y1="14" y2="106" stroke="var(--ink)" strokeWidth="2" strokeDasharray="6 4" />
                <line x1="16" x2="204" y1="50" y2="50" stroke="var(--ink)" strokeWidth="2" strokeDasharray="6 4" />
                <path d="M20 56 Q 80 58, 94 104" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" />
                <path d="M106 16 Q 120 44, 200 46" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" />
                <text x="160" y="92" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">x = a · y = b</text>
            </svg>
        )
    }
    // memory
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="6" y="6" width="208" height="108" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
            <rect x="24" y="24" width="76" height="72" rx="8" fill="var(--card, #fffcf6)" stroke="var(--ink)" strokeWidth="2" />
            <rect x="120" y="24" width="76" height="72" rx="8" fill="var(--card, #fffcf6)" stroke="var(--ink)" strokeWidth="2" />
            <text x="62" y="66" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">1/(x−3)</text>
            <text x="158" y="66" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--blue)" direction="ltr">x = 3</text>
        </svg>
    )
}
