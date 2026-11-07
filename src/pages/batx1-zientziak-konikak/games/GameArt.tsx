import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { BachConicsGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function BachConicsGameArt({ game }: { game: BachConicsGameId }) {
    if (game === 'detective') return <DetectiveArt lines={['x²/25 + y²/9 = 1', 'c² = 25 + 9 ?', 'c² = 25 − 9']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <ellipse cx="110" cy="62" rx="102" ry="30" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <ellipse cx="110" cy="62" rx="70" ry="12" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="e" x={104} y={18} width={60} />
                <Car color="var(--blue)" label="c" x={46} y={52} width={44} />
                <text x="110" y="114" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">x²/a² + y²/b² = 1</text>
            </svg>
        )
    }
    if (game === 'conic') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <circle cx="38" cy="60" r="24" fill="none" stroke="var(--blue, #2f6fdb)" strokeWidth="4" />
                <ellipse cx="102" cy="60" rx="30" ry="18" fill="none" stroke="var(--mustard, #e0a100)" strokeWidth="4" />
                <path d="M150 22 Q 172 60 150 98" fill="none" stroke="var(--coral, #c4432a)" strokeWidth="4" />
                <path d="M210 22 Q 188 60 210 98" fill="none" stroke="var(--coral, #c4432a)" strokeWidth="4" />
                <text x="110" y="116" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)">?</text>
            </svg>
        )
    }
    if (game === 'antenna') {
        /* The dish x = 70 + (y − 60)² / 50: its focus is 12.5 to the right of the vertex */
        const hit = (y: number) => 70 + ((y - 60) ** 2) / 50
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <path d="M120 10 Q 20 60 120 110" fill="none" stroke="var(--ink)" strokeWidth="5" />
                {[24, 42, 78, 96].map((y) => <line key={y} x1="210" y1={y} x2={hit(y)} y2={y} stroke="var(--mustard, #e0a100)" strokeWidth="2" />)}
                {[24, 42, 78, 96].map((y) => <line key={`r${y}`} x1={hit(y)} y1={y} x2="82.5" y2="60" stroke="var(--coral, #c4432a)" strokeWidth="2" />)}
                <circle cx="82.5" cy="60" r="6" fill="var(--coral, #c4432a)" stroke="var(--ink)" strokeWidth="1.2" />
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => <rect key={i} x={14 + i * 50} y="22" width="42" height="56" rx="7" fill={i % 2 ? 'var(--blue-tint, #dde7f7)' : 'var(--paper-deep)'} stroke="var(--ink)" strokeWidth="2" />)}
            <text x="35" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">y²=8x</text>
            <text x="85" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">F(2,0)</text>
            <text x="110" y="108" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">C · F · V</text>
        </svg>
    )
}
