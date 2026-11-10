import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { Bach2IndefiniteGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it carries no words */
export function Bach2IndefiniteGameArt({ game }: { game: Bach2IndefiniteGameId }) {
    if (game === 'detective') return <DetectiveArt lines={['v = 3e³ˣ ?', '∫ 2/(x−1)² = 2 ln ?', 'A = N(a) ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="∫" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="u" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">uv − ∫ v du</text>
            </svg>
        )
    }
    if (game === 'method') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <text x="110" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)" direction="ltr">∫ x eˣ dx</text>
                {[['u′', 8, 'var(--paper-deep)'], ['uv', 60, 'var(--success-tint, #d9efe2)'], ['A/x', 112, 'var(--paper-deep)'], ['t', 164, 'var(--paper-deep)']].map(([label, x, fill]) => (
                    <g key={label as string}>
                        <path d={`M${x as number} 56 h48 l-6 52 h-36 z`} fill={fill as string} stroke="var(--ink)" strokeWidth="2" />
                        <text x={(x as number) + 24} y="88" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                    </g>
                ))}
            </svg>
        )
    }
    if (game === 'choose-u') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="24" y="30" width="76" height="56" rx="12" fill="var(--violet-tint, #e6dcf6)" stroke="var(--ink)" strokeWidth="2.4" />
                <text x="62" y="66" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--ink)" direction="ltr">x</text>
                <rect x="120" y="30" width="76" height="56" rx="12" fill="var(--paper-deep)" stroke="var(--blue)" strokeWidth="2.4" />
                <text x="158" y="66" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--ink)" direction="ltr">eˣ</text>
                <text x="62" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">u</text>
                <text x="158" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--blue)" direction="ltr">dv</text>
                <text x="110" y="110" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">x² → x → 1</text>
            </svg>
        )
    }
    if (game === 'fractions') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[['A', 'x − 1', 14, 'var(--paper-deep)'], ['B', 'x + 2', 120, 'var(--mustard-tint, #fbebc0)']].map(([top, bottom, x, fill]) => (
                    <g key={top as string}>
                        <rect x={x as number} y="22" width="86" height="76" rx="12" fill={fill as string} stroke="var(--ink)" strokeWidth="2" />
                        <text x={(x as number) + 43} y="52" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)" direction="ltr">{top}</text>
                        <line x1={(x as number) + 14} y1="62" x2={(x as number) + 72} y2="62" stroke="var(--ink)" strokeWidth="2" />
                        <text x={(x as number) + 43} y="86" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">{bottom}</text>
                    </g>
                ))}
                <text x="110" y="66" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--ink)" direction="ltr">+</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[['x·eˣ', 14, 'var(--paper-deep)'], ['ln x', 80, 'var(--coral-tint, #f6d5cc)'], ['e^(x²)', 146, 'var(--paper-deep)']].map(([label, x, fill]) => (
                <g key={label as string}>
                    <rect x={x as number} y="28" width="58" height="62" rx="10" fill={fill as string} stroke="var(--ink)" strokeWidth="2" />
                    <text x={(x as number) + 29} y="66" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
