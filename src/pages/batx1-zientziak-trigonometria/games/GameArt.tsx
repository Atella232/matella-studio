import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import { TrigArt } from '../../dbh4-games/TrigGames'
import type { TrigonometryBatx1zGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function TrigonometryBatx1zGameArt({ game }: { game: TrigonometryBatx1zGameId }) {
    if (game === 'circle') return <TrigArt game="circle" />
    if (game === 'detective') return <DetectiveArt lines={['sin 2α = 2 sin α', 'cos(α + β)', 'T = 2π · B ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="2α" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="π" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">T = 2π / B</text>
            </svg>
        )
    }
    if (game === 'build') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <text x="110" y="44" textAnchor="middle" fontSize="19" fontWeight="700" fill="var(--ink)" direction="ltr">cos(α + β) =</text>
                <rect x="14" y="62" width="76" height="40" rx="8" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="98" y="62" width="24" height="40" rx="8" fill="var(--coral-tint, #f6d9d2)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="130" y="62" width="76" height="40" rx="8" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" strokeDasharray="5 4" />
                <text x="52" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">cos α cos β</text>
                <text x="110" y="89" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">−</text>
                <text x="168" y="89" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--muted)" direction="ltr">?</text>
            </svg>
        )
    }
    if (game === 'hunt') {
        const points = Array.from({ length: 24 }, (_, index) => index * 15)
        const solutions = [30, 150]
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="70" y1="62" x2="150" y2="62" stroke="var(--muted)" strokeWidth="1.5" />
                <line x1="110" y1="12" x2="110" y2="112" stroke="var(--muted)" strokeWidth="1.5" />
                <circle cx="110" cy="62" r="44" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
                <line x1="56" y1="40" x2="164" y2="40" stroke="var(--coral, #c4432a)" strokeWidth="2" strokeDasharray="5 4" />
                {points.map((angle) => {
                    const x = 110 + 44 * Math.cos((angle * Math.PI) / 180)
                    const y = 62 - 44 * Math.sin((angle * Math.PI) / 180)
                    const hit = solutions.includes(angle)
                    return <circle key={angle} cx={x.toFixed(1)} cy={y.toFixed(1)} r={hit ? 5.5 : 3} fill={hit ? 'var(--blue)' : 'var(--paper)'} stroke="var(--ink)" strokeWidth="1.2" />
                })}
                <text x="196" y="44" textAnchor="end" fontSize="13" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">1/2</text>
            </svg>
        )
    }
    if (game === 'exact') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <text x="110" y="40" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)" direction="ltr">75° = 45° + 30°</text>
                <rect x="22" y="56" width="176" height="50" rx="10" fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth="2" />
                <text x="110" y="88" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">(√6 + √2) / 4</text>
            </svg>
        )
    }
    // memory
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="24" y="18" width="78" height="84" rx="10" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
            <rect x="118" y="18" width="78" height="84" rx="10" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
            <text x="63" y="66" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)" direction="ltr">135°</text>
            <text x="157" y="66" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)" direction="ltr">3π/4</text>
        </svg>
    )
}
