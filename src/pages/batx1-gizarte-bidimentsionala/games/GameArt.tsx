import { Car } from '../../../features/unit-v2/games/GameKit'
import { BivarGameArt } from '../../batx1-zientziak-bidimentsionala/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { SocialBivarGameId } from './info'

const INK = 'var(--ink)'

/** Small illustration of each game; the art is the same in every language (no decimal commas) */
export function SocialBivarGameArt({ game }: { game: SocialBivarGameId }) {
    if (game === 'sign') return <BivarGameArt game="sign" />
    if (game === 'cloud') return <BivarGameArt game="cloud" />
    if (game === 'detective') return <DetectiveArt lines={['σxy = Σxy/N − x̄ȳ', 'r = σxy / σx²σy²', 'r² = m · m′']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke={INK} strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="r" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="ŷ" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">x̄ · σxy · r · ŷ</text>
            </svg>
        )
    }
    if (game === 'which-r') {
        const points = [[30, 88], [48, 80], [62, 70], [80, 66], [95, 54], [112, 50], [128, 40], [146, 34], [160, 26]]
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="14" y="10" width="160" height="96" rx="10" fill="var(--paper)" stroke={INK} strokeWidth="2" />
                {points.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="5" fill="var(--blue-tint, #dde7f7)" stroke="var(--blue, #2f6fdb)" strokeWidth="1.6" />)}
                <text x="198" y="46" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">r</text>
                <text x="198" y="74" textAnchor="middle" fontSize="18" fontWeight="700" fill={INK} direction="ltr">?</text>
            </svg>
        )
    }
    if (game === 'predict') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="40" y="10" width="80" height="90" fill="var(--success-tint, #d9efe2)" />
                <line x1="20" x2="206" y1="100" y2="100" stroke={INK} strokeWidth="2" />
                <line x1="20" x2="20" y1="100" y2="8" stroke={INK} strokeWidth="2" />
                <line x1="20" y1="92" x2="206" y2="20" stroke="var(--coral, #c4432a)" strokeWidth="3" />
                <line x1="180" x2="180" y1="100" y2="30" stroke={INK} strokeWidth="2" strokeDasharray="5 4" />
                <circle cx="180" cy="30" r="7" fill="var(--coral, #c4432a)" />
                <text x="164" y="24" textAnchor="end" fontSize="16" fontWeight="700" fill={INK} direction="ltr">ŷ ?</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="20" y="22" width="86" height="74" rx="12" fill="var(--paper)" stroke={INK} strokeWidth="2" />
            <text x="63" y="66" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">6 / (2 · 5)</text>
            <rect x="120" y="22" width="80" height="74" rx="12" fill="var(--success-tint, #d9efe2)" stroke="var(--success, #267b53)" strokeWidth="2" />
            <text x="160" y="66" textAnchor="middle" fontSize="18" fontWeight="700" fill={INK} direction="ltr">r</text>
        </svg>
    )
}
