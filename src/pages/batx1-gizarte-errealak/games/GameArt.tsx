import { Car } from '../../../features/unit-v2/games/GameKit'
import { BachRealsGameArt } from '../../batx1-zientziak-errealak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { GizRealsGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function GizRealsGameArt({ game }: { game: GizRealsGameId }) {
    if (game === 'place' || game === 'intervals' || game === 'radical' || game === 'log') return <BachRealsGameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['√(9 + 16) = 7 ?', 'log₂(4 + 4) = 4 ?', '10³ · 10⁴ = 10¹² ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="ℝ" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="10ⁿ" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">ℚ · |x − 3| · log 1000</text>
            </svg>
        )
    }
    if (game === 'order') {
        const cards = ['4,5 · 10⁹', '38 · 10⁸', '0,6 · 10¹⁰']
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {cards.map((label, index) => (
                    <g key={label} transform={`translate(${8 + index * 70} ${18 + (index % 2) * 14})`}>
                        <rect width="64" height="56" rx="8" fill={index === 1 ? 'var(--blue-tint, #dde7f7)' : 'var(--paper-deep)'} stroke="var(--ink)" strokeWidth="2" />
                        <text x="32" y="34" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                        <circle cx="58" cy="4" r="9" fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth="1.6" />
                        <text x="58" y="8" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">{[2, 1, 3][index]}</text>
                    </g>
                ))}
                <text x="110" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">€ &lt; € &lt; €</text>
            </svg>
        )
    }
    if (game === 'headline') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="20" y="10" width="180" height="96" rx="8" fill="var(--card, #fffcf6)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="34" y="22" width="152" height="16" rx="3" fill="var(--ink)" />
                <text x="110" y="35" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--card, #fffcf6)" direction="ltr">2 850 000</text>
                <line x1="34" x2="186" y1="52" y2="52" stroke="var(--line)" strokeWidth="3" />
                <line x1="34" x2="160" y1="64" y2="64" stroke="var(--line)" strokeWidth="3" />
                <line x1="34" x2="176" y1="76" y2="76" stroke="var(--line)" strokeWidth="3" />
                <text x="110" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">Eᵣ &lt; 1 %</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['∛a²', 'a^(2/3)', 'log₃ 9', '2'].map((label, index) => (
                <g key={index} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
