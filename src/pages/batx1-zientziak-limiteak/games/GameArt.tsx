import { Car } from '../../../features/unit-v2/games/GameKit'
import { BachSequencesGameArt } from '../../batx1-zientziak-segidak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { BachLimitsGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function BachLimitsGameArt({ game }: { game: BachLimitsGameId }) {
    if (game === 'toward') return <BachSequencesGameArt game="where" />
    if (game === 'band') return <BachSequencesGameArt game="band" />
    if (game === 'detective') return <DetectiveArt lines={['0/0 = 0 ?', '1^∞ = 1 ?', '√x² = x ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="lim" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="∞" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">0/0 · eᵃ · y = mx + n</text>
            </svg>
        )
    }
    if (game === 'forms') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[['0/0', 18, 'var(--coral-tint, #f6d5cc)'], ['5/0', 80, 'var(--paper-deep)'], ['1^∞', 142, 'var(--coral-tint, #f6d5cc)']].map(([label, x, fill]) => (
                    <g key={label as string}>
                        <rect x={x as number} y="22" width="58" height="44" rx="10" fill={fill as string} stroke="var(--ink)" strokeWidth="2" />
                        <text x={(x as number) + 29} y="51" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                    </g>
                ))}
                <text x="110" y="102" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--coral, #c4432a)">?</text>
            </svg>
        )
    }
    if (game === 'asymptote') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="20" x2="200" y1="66" y2="66" stroke="var(--ink)" strokeWidth="1.6" />
                <line x1="70" x2="70" y1="8" y2="114" stroke="var(--ink)" strokeWidth="1.6" />
                <line x1="120" x2="120" y1="8" y2="114" stroke="var(--muted)" strokeWidth="2" strokeDasharray="6 5" />
                <line x1="20" x2="200" y1="40" y2="40" stroke="var(--muted)" strokeWidth="2" strokeDasharray="6 5" />
                <path d="M24 46 Q 100 50, 114 112" fill="none" stroke="var(--blue)" strokeWidth="3" />
                <path d="M126 10 Q 140 34, 198 36" fill="none" stroke="var(--blue)" strokeWidth="3" />
                <text x="126" y="108" fontSize="14" fontWeight="700" fill="var(--ink)" direction="ltr">x = 2</text>
                <text x="160" y="56" fontSize="14" fontWeight="700" fill="var(--ink)" direction="ltr">y = 1</text>
            </svg>
        )
    }
    if (game === 'discontinuity') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="20" x2="200" y1="96" y2="96" stroke="var(--ink)" strokeWidth="1.6" />
                <path d="M24 84 L 108 50" fill="none" stroke="var(--blue)" strokeWidth="3" />
                <circle cx="110" cy="49" r="6" fill="var(--paper)" stroke="var(--blue)" strokeWidth="2.4" />
                <path d="M110 24 L 196 10" fill="none" stroke="var(--blue)" strokeWidth="3" />
                <circle cx="110" cy="24" r="6" fill="var(--coral, #c4432a)" />
                <line x1="110" x2="110" y1="30" y2="96" stroke="var(--muted)" strokeWidth="1.4" strokeDasharray="4 4" />
                <text x="110" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)">a</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['lim (x²−9)/(x−3)', '6', '3x/(x−2)', 'y = 3'].map((label, index) => (
                <g key={index} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize={label.length > 8 ? 5.5 : 9} fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
