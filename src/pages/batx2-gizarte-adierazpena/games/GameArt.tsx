import { Car } from '../../../features/unit-v2/games/GameKit'
import { BachDerivativesGameArt } from '../../batx1-zientziak-deribatuak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { Bach2gSketchGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function Bach2gSketchGameArt({ game }: { game: Bach2gSketchGameId }) {
    if (game === 'memory') return <BachDerivativesGameArt game="memory" />
    if (game === 'detective') return <DetectiveArt lines={['0/0 → x = a ?', "f'' = 0 → ∩∪ ?", '|f| < 0 ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="150" y1="30" x2="150" y2="96" stroke="var(--coral, #c4432a)" strokeWidth="2" strokeDasharray="6 5" />
                <Car color="var(--coral, #c4432a)" label="x = a" x={70} y={20} width={70} />
                <Car color="var(--blue)" label="y" x={40} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">D · x = a · y = b</text>
            </svg>
        )
    }
    if (game === 'which') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[0, 1, 2].map((i) => <rect key={i} x={12 + i * 70} y={30} width={60} height={70} rx={8} fill="var(--card, #fffcf6)" stroke="var(--ink)" strokeWidth="1.6" />)}
                <path d="M16 90 C 30 40, 50 40, 68 36" fill="none" stroke="var(--blue, #2f6fdb)" strokeWidth="3" />
                <path d="M86 40 C 100 90, 120 90, 138 94" fill="none" stroke="var(--blue, #2f6fdb)" strokeWidth="3" />
                <path d="M156 60 Q 186 120, 206 34" fill="none" stroke="var(--success, #267b53)" strokeWidth="3.4" />
                <text x="110" y="22" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">f(x) = ?</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="40" y="10" width="140" height="100" rx="10" fill="var(--card, #fffcf6)" stroke="var(--ink)" strokeWidth="2" />
            <text x="56" y="38" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">D = ℝ − {2}</text>
            <text x="56" y="64" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">x = 2 · y = 1</text>
            <text x="56" y="90" fontSize="15" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">max ( ?, ? )</text>
        </svg>
    )
}
