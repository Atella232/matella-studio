import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import { EquationArt } from '../../dbh4-games/EquationGames'
import { PolynomialArt } from '../../dbh4-games/PolynomialGames'
import type { BachEquationsGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function BachEquationsGameArt({ game }: { game: BachEquationsGameId }) {
    if (game === 'check' || game === 'paint') return <EquationArt game={game} />
    if (game === 'hunt' || game === 'simplify') return <PolynomialArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['x³ = 4x', 'x² = 4 ?', 'x = ±2']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="|x|" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="log" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">P(a) · √ · 2ˣ · ≤</text>
            </svg>
        )
    }
    if (game === 'valid') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <text x="110" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">√(x + 7) = x + 1</text>
                <rect x="24" y="48" width="78" height="40" rx="10" fill="var(--success-tint, #d9efe2)" stroke="var(--success, #267b53)" strokeWidth="2" />
                <text x="63" y="74" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">x = 2 ✓</text>
                <rect x="118" y="48" width="78" height="40" rx="10" fill="var(--coral-tint, #f6d5cc)" stroke="var(--error, #c4432a)" strokeWidth="2" />
                <text x="157" y="74" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">x = −3 ✗</text>
                <text x="110" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--muted, #6b6257)" direction="ltr">√4 = −2 ?</text>
            </svg>
        )
    }
    if (game === 'signs') {
        const cells = ['+', '−', '+']
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="14" x2="206" y1="70" y2="70" stroke="var(--ink)" strokeWidth="2" />
                {[80, 140].map((x, index) => (
                    <g key={x}>
                        <line x1={x} x2={x} y1="22" y2="78" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="4 3" />
                        <circle cx={x} cy="70" r="5" fill={index === 1 ? 'var(--card, #fffcf6)' : 'var(--ink)'} stroke="var(--ink)" strokeWidth="2" />
                        <text x={x} y="98" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)" direction="ltr">{index === 0 ? '−1' : '3'}</text>
                    </g>
                ))}
                {cells.map((sign, index) => (
                    <g key={index}>
                        <rect x={[22, 90, 152][index]} y="28" width={[50, 40, 50][index]} height="30" rx="8" fill={sign === '+' ? 'var(--success-tint, #d9efe2)' : 'var(--coral-tint, #f6d5cc)'} stroke="var(--ink)" strokeWidth="2" />
                        <text x={[47, 110, 177][index]} y="50" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)">{sign}</text>
                    </g>
                ))}
                <text x="110" y="116" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)" direction="ltr">(x + 1)/(x − 3) ≥ 0</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['x²−5x+6', '2, 3', '|x−2|<3', '(−1, 5)'].map((label, index) => (
                <g key={index} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize="7" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
