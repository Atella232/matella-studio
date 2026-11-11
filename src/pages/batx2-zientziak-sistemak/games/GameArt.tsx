import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { SistemakGameId } from './info'

const INK = 'var(--ink)'

/** Small illustration of each game; the art is the same in every language */
export function SistemakGameArt({ game }: { game: SistemakGameId }) {
    if (game === 'detective') return <DetectiveArt lines={['|A| = 0 → ∅ ?', 'x = |A| / |Aₓ| ?', 'a² = 4 → a = 2 ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="rg" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="|Aₓ|" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">rg A = rg A* = n</text>
            </svg>
        )
    }
    if (game === 'rouche-express') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="88" y="10" width="44" height="100" rx="14" fill={INK} />
                <circle cx="110" cy="30" r="11" fill="var(--coral, #c4432a)" opacity="0.4" />
                <circle cx="110" cy="60" r="11" fill="var(--mustard, #e0a100)" opacity="0.4" />
                <circle cx="110" cy="90" r="11" fill="var(--success, #267b53)" />
                <text x="44" y="58" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">rg A</text>
                <text x="176" y="58" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">rg A*</text>
                <text x="110" y="118" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--muted)" direction="ltr">0 · 1 · ∞</text>
            </svg>
        )
    }
    if (game === 'cramer-columns') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="40" x2="40" y1="20" y2="70" stroke={INK} strokeWidth="2.4" />
                <line x1="120" x2="120" y1="20" y2="70" stroke={INK} strokeWidth="2.4" />
                <rect x="46" y="22" width="30" height="46" rx="6" fill="var(--mustard-tint, #fbebc0)" />
                <text x="61" y="40" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">5</text>
                <text x="61" y="62" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">1</text>
                <text x="98" y="40" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">2</text>
                <text x="98" y="62" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">3</text>
                <text x="168" y="54" textAnchor="middle" fontSize="20" fontWeight="700" fill={INK} direction="ltr">|Aₓ|</text>
                <text x="110" y="104" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--muted)" direction="ltr">x = |Aₓ| / |A|</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="16" y="22" width="84" height="78" rx="10" fill="var(--card)" stroke={INK} strokeWidth="2" />
            <text x="58" y="56" textAnchor="middle" fontSize="14" fontWeight="700" fill={INK} direction="ltr">x + y = 3</text>
            <text x="58" y="78" textAnchor="middle" fontSize="14" fontWeight="700" fill={INK} direction="ltr">x − y = 1</text>
            <rect x="120" y="22" width="84" height="78" rx="10" fill="var(--success-tint, #d9efe2)" stroke={INK} strokeWidth="2" />
            <text x="162" y="68" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">(2, 1)</text>
        </svg>
    )
}
