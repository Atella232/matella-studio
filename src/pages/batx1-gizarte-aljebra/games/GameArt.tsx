import { Car } from '../../../features/unit-v2/games/GameKit'
import { BachEquationsGameArt } from '../../batx1-zientziak-ekuazioak/games/GameArt'
import { BachSystemsGameArt } from '../../batx1-zientziak-sistemak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { GizAlgebraGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function GizAlgebraGameArt({ game }: { game: GizAlgebraGameId }) {
    if (game === 'zero') return <BachSystemsGameArt game="zero" />
    if (game === 'valid' || game === 'signs') return <BachEquationsGameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['√(x+1) = x − 1 → x = 0 ?', 'x² = 4x → x = 4 ?', 'F / p ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="x" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="y" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">I(x) = C(x)</text>
            </svg>
        )
    }
    if (game === 'box') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[8, 12, 15].map((price, index) => (
                    <g key={price} transform={`translate(${14 + index * 66} ${18 + (index % 2) * 10}) rotate(${index === 1 ? 4 : -4})`}>
                        <rect width="58" height="40" rx="6" fill={index === 1 ? 'var(--mustard-tint, #fbebc0)' : 'var(--paper-deep)'} stroke="var(--ink)" strokeWidth="2" strokeDasharray="5 3" />
                        <text x="29" y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">{`${price} €`}</text>
                    </g>
                ))}
                <text x="110" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">x + y + z = 200</text>
                <text x="110" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">y = ?</text>
            </svg>
        )
    }
    if (game === 'gain') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="24" y1="104" x2="206" y2="104" stroke="var(--ink)" strokeWidth="2" />
                <line x1="24" y1="104" x2="24" y2="12" stroke="var(--ink)" strokeWidth="2" />
                <line x1="24" y1="104" x2="200" y2="20" stroke="#2f6fdb" strokeWidth="3" />
                <line x1="24" y1="70" x2="200" y2="44" stroke="#c4432a" strokeWidth="3" />
                <circle cx="117" cy="60" r="6" fill="none" stroke="var(--ink)" strokeWidth="2.4" />
                <text x="196" y="16" textAnchor="end" fontSize="13" fontWeight="700" fill="#2f6fdb" direction="ltr">I(x)</text>
                <text x="196" y="62" textAnchor="end" fontSize="13" fontWeight="700" fill="#c4432a" direction="ltr">C(x)</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['x² − 5x + 6', '2, 3', '2ˣ = 32', 'x = 5'].map((label, index) => (
                <g key={index} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize="7" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
