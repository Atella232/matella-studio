import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { KonplexuakBatx1zGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function KonplexuakBatx1zGameArt({ game }: { game: KonplexuakBatx1zGameId }) {
    if (game === 'detective') return <DetectiveArt lines={['i² = 1 ?', '|3 + 4i| = 7 ?', '(2₄₀°)³ = 6₁₂₀° ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="i²" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="z" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">|3 + 4i| = 5</text>
            </svg>
        )
    }
    if (game === 'affix') {
        const dots = Array.from({ length: 7 }, (_, row) => Array.from({ length: 9 }, (_, column) => [38 + column * 18, 14 + row * 15]))
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {dots.flat().map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={2} fill="var(--muted)" />)}
                <line x1="30" y1="59" x2="190" y2="59" stroke="var(--muted)" strokeWidth="1.5" />
                <line x1="110" y1="6" x2="110" y2="112" stroke="var(--muted)" strokeWidth="1.5" />
                <circle cx="164" cy="29" r="7" fill="var(--blue)" stroke="var(--ink)" strokeWidth="1.5" />
                <text x="160" y="110" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">3 + 2i</text>
            </svg>
        )
    }
    if (game === 'twist') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="40" y1="76" x2="180" y2="76" stroke="var(--muted)" strokeWidth="1.5" />
                <line x1="110" y1="8" x2="110" y2="114" stroke="var(--muted)" strokeWidth="1.5" />
                <line x1="110" y1="76" x2="160" y2="52" stroke="var(--blue)" strokeWidth="3" />
                <line x1="110" y1="76" x2="86" y2="26" stroke="var(--coral, #c4432a)" strokeWidth="3" />
                <path d="M134 65 A 26 26 0 0 0 99 53" fill="none" stroke="var(--coral, #c4432a)" strokeWidth="2.4" />
                <circle cx="160" cy="52" r="5" fill="var(--blue)" />
                <circle cx="86" cy="26" r="5" fill="var(--coral, #c4432a)" />
                <text x="172" y="50" fontSize="15" fontWeight="700" fill="var(--blue)" direction="ltr">z</text>
                <text x="40" y="24" fontSize="15" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">z · i</text>
            </svg>
        )
    }
    if (game === 'hunt') {
        const points = Array.from({ length: 24 }, (_, index) => index * 15)
        const roots = [30, 150, 270]
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="62" y1="62" x2="158" y2="62" stroke="var(--muted)" strokeWidth="1.5" />
                <line x1="110" y1="12" x2="110" y2="112" stroke="var(--muted)" strokeWidth="1.5" />
                <circle cx="110" cy="62" r="44" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
                <polygon points={roots.map((angle) => `${(110 + 44 * Math.cos((angle * Math.PI) / 180)).toFixed(1)},${(62 - 44 * Math.sin((angle * Math.PI) / 180)).toFixed(1)}`).join(' ')} fill="none" stroke="var(--coral, #c4432a)" strokeWidth="2" />
                {points.map((angle) => {
                    const x = 110 + 44 * Math.cos((angle * Math.PI) / 180)
                    const y = 62 - 44 * Math.sin((angle * Math.PI) / 180)
                    const hit = roots.includes(angle)
                    return <circle key={angle} cx={x.toFixed(1)} cy={y.toFixed(1)} r={hit ? 5.5 : 3} fill={hit ? 'var(--blue)' : 'var(--paper)'} stroke="var(--ink)" strokeWidth="1.2" />
                })}
                <text x="200" y="30" textAnchor="end" fontSize="15" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">z³ = 8i</text>
            </svg>
        )
    }
    // memory
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="24" y="18" width="78" height="84" rx="10" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
            <rect x="118" y="18" width="78" height="84" rx="10" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
            <text x="63" y="66" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)" direction="ltr">3i⁷</text>
            <text x="157" y="66" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)" direction="ltr">−3i</text>
        </svg>
    )
}
