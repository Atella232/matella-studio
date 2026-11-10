import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { Bach2DefiniteGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it carries no words */
export function Bach2DefiniteGameArt({ game }: { game: Bach2DefiniteGameId }) {
    if (game === 'detective') return <DetectiveArt lines={['∫₋₁¹ dx/x² = −2 ?', 'm = f(2) ?', 'V = ∫ x dx ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--green, #2f8a57)" label="∫" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="F" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">F(b) − F(a)</text>
            </svg>
        )
    }
    if (game === 'barrow') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="14" y1="96" x2="206" y2="96" stroke="var(--ink)" strokeWidth="2" />
                <line x1="110" y1="10" x2="110" y2="104" stroke="var(--ink)" strokeWidth="2" strokeDasharray="6 5" />
                <path d="M20 90 Q 80 86, 100 16" fill="none" stroke="var(--blue)" strokeWidth="3" />
                <path d="M120 16 Q 140 86, 200 90" fill="none" stroke="var(--blue)" strokeWidth="3" />
                <rect x="132" y="22" width="70" height="34" rx="10" fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth="2" />
                <text x="167" y="45" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">x = 0</text>
            </svg>
        )
    }
    if (game === 'limits') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="20" y1="34" x2="200" y2="34" stroke="var(--ink)" strokeWidth="2" />
                <line x1="20" y1="90" x2="200" y2="90" stroke="var(--coral, #c4432a)" strokeWidth="2" />
                <text x="12" y="39" textAnchor="end" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">x</text>
                <text x="12" y="95" textAnchor="end" fontSize="15" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">t</text>
                {[[40, 40, '0', '0'], [100, 70, '1', '1'], [160, 190, '2', '4']].map(([from, to, a, b]) => (
                    <g key={a as string}>
                        <line x1={from as number} y1="40" x2={Math.min(to as number, 196)} y2="84" stroke="var(--coral, #c4432a)" strokeWidth="2.4" />
                        <text x={from as number} y="26" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)" direction="ltr">{a}</text>
                        <text x={Math.min(to as number, 196)} y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">{b}</text>
                    </g>
                ))}
            </svg>
        )
    }
    if (game === 'derive') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="16" y="20" width="188" height="44" rx="12" fill="var(--violet-tint, #e6dcf6)" stroke="var(--ink)" strokeWidth="2" />
                <text x="110" y="49" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">∫₀ˣ² f(t) dt</text>
                <text x="110" y="100" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--violet, #7b52c7)" direction="ltr">f(x²) · 2x</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[['∫₀² x dx', 14, 'var(--paper-deep)'], ['2', 80, 'var(--success-tint, #d9efe2)'], ['πx²', 146, 'var(--paper-deep)']].map(([label, x, fill]) => (
                <g key={label as string}>
                    <rect x={x as number} y="28" width="58" height="62" rx="10" fill={fill as string} stroke="var(--ink)" strokeWidth="2" />
                    <text x={(x as number) + 29} y="66" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
