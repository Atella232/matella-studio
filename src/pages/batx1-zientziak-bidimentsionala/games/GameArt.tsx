import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import { StatisticsArt } from '../../dbh4-games/StatisticsGames'
import type { BivarGameId } from './info'

const INK = 'var(--ink)'

/** Small illustration of each game; the art is the same in every language */
export function BivarGameArt({ game }: { game: BivarGameId }) {
    if (game === 'cloud') return <StatisticsArt game="cloud" />
    if (game === 'detective') return <DetectiveArt lines={['σxy = Σxy / N  ?', 'r = σxy / σxσy', 'r² = m · m′']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke={INK} strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="r" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="σxy" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">(x̄, ȳ) · σxy · r · m</text>
            </svg>
        )
    }
    if (game === 'sign') {
        const points: Array<[number, number]> = [[40, 86], [62, 78], [96, 58], [150, 40], [176, 26], [128, 70]]
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="110" y="16" width="80" height="44" fill="var(--success-tint, #d9efe2)" stroke="var(--success, #267b53)" strokeWidth="1.6" />
                <rect x="30" y="60" width="80" height="38" fill="var(--success-tint, #d9efe2)" stroke="var(--success, #267b53)" strokeWidth="1.6" />
                <rect x="110" y="60" width="30" height="22" fill="var(--coral-tint, #f6d5cc)" stroke="var(--coral, #c4432a)" strokeWidth="1.6" />
                <line x1="110" x2="110" y1="8" y2="108" stroke="var(--coral, #c4432a)" strokeWidth="2" strokeDasharray="5 4" />
                <line x1="14" x2="206" y1="60" y2="60" stroke="var(--coral, #c4432a)" strokeWidth="2" strokeDasharray="5 4" />
                {points.map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r="6" fill="var(--paper)" stroke="var(--blue, #2f6fdb)" strokeWidth="2" />)}
                <text x="196" y="112" textAnchor="end" fontSize="16" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">σxy &gt; 0</text>
            </svg>
        )
    }
    if (game === 'lines') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="20" x2="20" y1="10" y2="104" stroke={INK} strokeWidth="2" />
                <line x1="20" x2="206" y1="104" y2="104" stroke={INK} strokeWidth="2" />
                <line x1="30" y1="92" x2="200" y2="30" stroke="var(--blue, #2f6fdb)" strokeWidth="3" />
                <line x1="64" y1="104" x2="160" y2="12" stroke="var(--coral, #c4432a)" strokeWidth="3" />
                <circle cx="112" cy="62" r="6" fill={INK} />
                <text x="122" y="88" fontSize="15" fontWeight="700" fill={INK} direction="ltr">(x̄, ȳ)</text>
                <text x="200" y="116" textAnchor="end" fontSize="14" fontWeight="700" fill={INK} direction="ltr">r² = m · m′</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="24" y="22" width="78" height="74" rx="12" fill="var(--paper)" stroke={INK} strokeWidth="2" />
            <text x="63" y="54" textAnchor="middle" fontSize="14" fontWeight="700" fill={INK} direction="ltr">(7 − 4)</text>
            <text x="63" y="76" textAnchor="middle" fontSize="14" fontWeight="700" fill={INK} direction="ltr">(2 − 6)</text>
            <rect x="118" y="22" width="78" height="74" rx="12" fill="var(--success-tint, #d9efe2)" stroke="var(--success, #267b53)" strokeWidth="2" />
            <text x="157" y="66" textAnchor="middle" fontSize="20" fontWeight="700" fill={INK} direction="ltr">−12</text>
        </svg>
    )
}
