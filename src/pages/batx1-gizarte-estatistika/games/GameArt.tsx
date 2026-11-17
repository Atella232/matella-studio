import { Car } from '../../../features/unit-v2/games/GameKit'
import { BachStatsGameArt } from '../../batx1-zientziak-estatistika/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import { StatisticsAkGameArt } from '../../dbh4-akademikoak-estatistika/games/GameArt'
import type { SocialStatsGameId } from './info'

const INK = 'var(--ink)'

/** Small illustration of each game; the art is the same in every language (no decimal commas) */
export function SocialStatsGameArt({ game }: { game: SocialStatsGameId }) {
    if (game === 'box') return <StatisticsAkGameArt game="box" />
    if (game === 'histogram') return <BachStatsGameArt game="histogram" />
    if (game === 'detective') return <DetectiveArt lines={['h = f / a', 'Pₖ ≠ xᵢ', 'x̄ ± σ']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke={INK} strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="P" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="x̄" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">% · x̄ · Pₖ · σ · CV</text>
            </svg>
        )
    }
    if (game === 'quality') {
        const bars = [1, 4, 7, 3, 1]
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="66" y="10" width="88" height="86" fill="var(--success-tint, #d9efe2)" />
                {bars.map((height, index) => <rect key={index} x={30 + index * 32} y={96 - height * 11} width="32" height={height * 11} fill="var(--coral-tint, #f6d5cc)" stroke="var(--coral, #c4432a)" strokeWidth="1.6" fillOpacity="0.8" />)}
                <line x1="66" x2="66" y1="8" y2="100" stroke="var(--success, #267b53)" strokeWidth="3" strokeDasharray="6 4" />
                <line x1="154" x2="154" y1="8" y2="100" stroke="var(--success, #267b53)" strokeWidth="3" strokeDasharray="6 4" />
                <line x1="20" x2="200" y1="96" y2="96" stroke={INK} strokeWidth="2" />
                <text x="110" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} direction="ltr">✓  ✗</text>
            </svg>
        )
    }
    if (game === 'hunt') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="30" x2="30" y1="10" y2="100" stroke={INK} strokeWidth="2" />
                <line x1="30" x2="206" y1="100" y2="100" stroke={INK} strokeWidth="2" />
                <polyline points="30,100 74,88 118,52 162,22 200,12" fill="none" stroke="var(--blue)" strokeWidth="3" />
                <line x1="30" x2="132" y1="44" y2="44" stroke="var(--coral, #c4432a)" strokeWidth="2.4" strokeDasharray="6 4" />
                <line x1="132" x2="132" y1="44" y2="100" stroke="var(--coral, #c4432a)" strokeWidth="2.4" strokeDasharray="6 4" />
                <circle cx="132" cy="44" r="6" fill="var(--coral, #c4432a)" />
                <text x="150" y="80" fontSize="16" fontWeight="700" fill={INK} direction="ltr">Pₖ</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="24" y="22" width="78" height="74" rx="12" fill="var(--paper)" stroke={INK} strokeWidth="2" />
            <text x="63" y="54" textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} direction="ltr">f = 30</text>
            <text x="63" y="76" textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} direction="ltr">a = 5</text>
            <rect x="118" y="22" width="78" height="74" rx="12" fill="var(--success-tint, #d9efe2)" stroke="var(--success, #267b53)" strokeWidth="2" />
            <text x="157" y="66" textAnchor="middle" fontSize="20" fontWeight="700" fill={INK} direction="ltr">6</text>
        </svg>
    )
}
