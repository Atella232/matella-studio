import { Car } from '../../../features/unit-v2/games/GameKit'
import { SequencesGameArt } from '../../dbh3-segidak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { BachSequencesGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function BachSequencesGameArt({ game }: { game: BachSequencesGameId }) {
    if (game === 'hidden' || game === 'sorter' || game === 'staircase') return <SequencesGameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['aₙ = a₁ + n·d ?', '2 + 4 + 8 + … = −2 ?', '(1 + 1/n)ⁿ → 1 ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="aₙ" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="e" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">aₙ · S∞ · lim · e</text>
            </svg>
        )
    }
    if (game === 'where') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <circle key={n} cx={18 + n * 20} cy={86 - 44 * (1 - 1 / n)} r="4.5" fill="var(--blue, #2f6fdb)" stroke="var(--ink)" strokeWidth="1" />)}
                <line x1="20" x2="204" y1="42" y2="42" stroke="var(--coral, #c4432a)" strokeWidth="2" strokeDasharray="6 4" />
                <text x="208" y="36" textAnchor="end" fontSize="14" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">L ?</text>
                <text x="110" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">L · +∞ · −∞ · ∄</text>
            </svg>
        )
    }
    if (game === 'band') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="14" y="48" width="196" height="22" fill="var(--mustard-tint, #fbebc0)" />
                <line x1="14" x2="210" y1="59" y2="59" stroke="var(--coral, #c4432a)" strokeWidth="1.6" strokeDasharray="5 4" />
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <circle key={n} cx={10 + n * 21} cy={59 - 46 / n} r="4" fill={46 / n < 11 ? 'var(--success, #267b53)' : 'var(--card, #fffcf6)'} stroke="var(--ink)" strokeWidth="1" />)}
                <line x1="115" x2="115" y1="8" y2="92" stroke="var(--blue, #2f6fdb)" strokeWidth="2" />
                <text x="115" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">N = ?</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['aₙ = 3n + 1', '13', '6 + 3 + …', '12'].map((label, index) => (
                <g key={index} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
