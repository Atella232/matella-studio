import { Car } from '../../../features/unit-v2/games/GameKit'
import { RealsGameArt } from '../../dbh4-aplikatuak-errealak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import { PowerArt } from '../../dbh4-games/PowerGames'
import type { BachRealsGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function BachRealsGameArt({ game }: { game: BachRealsGameId }) {
    if (game === 'radical') return <PowerArt game="radical" />
    if (game === 'log') return <PowerArt game="log" />
    if (game === 'place') return <RealsGameArt game="place" />
    if (game === 'intervals') return <RealsGameArt game="intervals" />
    if (game === 'detective') return <DetectiveArt lines={['|−7 + 3| = 10 ?', 'log₂(4 + 4) = 4 ?', '(a + b)² = a² + b² ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="ℝ" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="|x|" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">√2 · |x − 3| · log₂ 8</text>
            </svg>
        )
    }
    if (game === 'target') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="12" x2="208" y1="78" y2="78" stroke="var(--ink)" strokeWidth="2" />
                {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((tick) => <line key={tick} x1={110 + tick * 22} x2={110 + tick * 22} y1="72" y2="84" stroke="var(--ink)" strokeWidth="1.4" />)}
                <rect x="66" y="70" width="88" height="16" fill="var(--blue-tint, #dde7f7)" stroke="var(--blue, #2f6fdb)" strokeWidth="2" />
                <circle cx="66" cy="78" r="6" fill="var(--card, #fffcf6)" stroke="var(--blue, #2f6fdb)" strokeWidth="2.4" />
                <circle cx="154" cy="78" r="6" fill="var(--card, #fffcf6)" stroke="var(--blue, #2f6fdb)" strokeWidth="2.4" />
                <circle cx="110" cy="40" r="22" fill="none" stroke="var(--coral, #c4432a)" strokeWidth="3" />
                <circle cx="110" cy="40" r="12" fill="none" stroke="var(--coral, #c4432a)" strokeWidth="3" />
                <circle cx="110" cy="40" r="4" fill="var(--coral, #c4432a)" />
                <text x="110" y="110" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">E(a, r)</text>
            </svg>
        )
    }
    if (game === 'coefficient') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[['1'], ['1', '1'], ['1', '2', '1'], ['1', '3', '3', '1']].map((row, n) => row.map((value, k) => (
                    <g key={`${n}-${k}`}>
                        <rect x={95 + (k - n / 2) * 30} y={8 + n * 24} width="26" height="20" rx="5" fill={n === 3 && k === 2 ? 'var(--coral-tint, #f6d5cc)' : 'var(--paper-deep)'} stroke="var(--ink)" strokeWidth="1.6" />
                        <text x={108 + (k - n / 2) * 30} y={23 + n * 24} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">{n === 3 && k === 2 ? '?' : value}</text>
                    </g>
                )))}
                <text x="110" y="114" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">(a + b)³</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['|x − 1| < 3', '(−2, 4)', 'log₃ 9', '2'].map((label, index) => (
                <g key={index} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
