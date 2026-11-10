import { Car } from '../../../features/unit-v2/games/GameKit'
import { ProbabilityAkGameArt } from '../../dbh4-akademikoak-probabilitatea/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { ProbabilityBatx2GameId } from './info'

const INK = 'var(--ink)'
const BLUE = 'var(--blue, #2f6fdb)'
const CORAL = 'var(--coral, #c4432a)'

/** Small illustration of each game; the art is the same in every language */
export function ProbabilityBatx2GameArt({ game }: { game: ProbabilityBatx2GameId }) {
    if (game === 'tree' || game === 'table') return <ProbabilityAkGameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['P(A−B) = P(A)−P(B) ?', 'P(A/B) = P(A∩B) ?', 'P(A₁/D) = P(D/A₁) ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke={INK} strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color={CORAL} label="P" x={104} y={20} width={72} />
                <Car color={BLUE} label="∩" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">∪ · ∩ · P(A/B) · Bayes</text>
            </svg>
        )
    }
    if (game === 'relation') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="20" y="14" width="80" height="80" fill="var(--card)" stroke={INK} strokeWidth="2" />
                <rect x="20" y="14" width="40" height="80" fill="var(--blue-tint, #dde7f7)" />
                <rect x="20" y="66" width="80" height="28" fill={CORAL} fillOpacity="0.35" />
                <line x1="60" y1="14" x2="60" y2="94" stroke={INK} strokeWidth="2" />
                <line x1="20" y1="66" x2="100" y2="66" stroke={CORAL} strokeWidth="2.4" strokeDasharray="6 4" />
                <rect x="20" y="14" width="80" height="80" fill="none" stroke={INK} strokeWidth="2" />
                <circle cx="150" cy="54" r="26" fill="var(--blue-tint, #dde7f7)" stroke={BLUE} strokeWidth="2.4" />
                <circle cx="196" cy="54" r="18" fill="var(--coral-tint, #f6d5cc)" stroke={CORAL} strokeWidth="2.4" />
                <text x="110" y="114" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">P(A ∩ B) = P(A) · P(B)?</text>
            </svg>
        )
    }
    if (game === 'venn') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="14" y="10" width="192" height="100" rx="10" fill="var(--card)" stroke={INK} strokeWidth="2" />
                <circle cx="88" cy="60" r="38" fill="var(--blue-tint, #dde7f7)" stroke={BLUE} strokeWidth="2.4" />
                <circle cx="132" cy="60" r="38" fill="var(--coral-tint, #f6d5cc)" fillOpacity="0.8" stroke={CORAL} strokeWidth="2.4" />
                <text x="70" y="66" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK}>0,2</text>
                <text x="110" y="66" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK}>?</text>
                <text x="152" y="66" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK}>0,3</text>
                <text x="190" y="102" textAnchor="middle" fontSize="15" fontWeight="700" fill={INK}>0,1</text>
            </svg>
        )
    }
    if (game === 'culprit') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[{ x: 18, w: 100, h: 10, c: BLUE }, { x: 118, w: 60, h: 24, c: CORAL }, { x: 178, w: 26, h: 54, c: 'var(--mustard, #e0a100)' }].map((strip, index) => (
                    <g key={index}>
                        <rect x={strip.x} y="14" width={strip.w} height="80" fill="var(--card)" stroke={INK} strokeWidth="1.6" />
                        <rect x={strip.x} y={94 - strip.h} width={strip.w} height={strip.h} fill={strip.c} fillOpacity="0.55" />
                    </g>
                ))}
                <text x="110" y="114" textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} direction="ltr">P(Aᵢ/D) ?</text>
            </svg>
        )
    }
    // memory
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[0, 1, 2, 3].map((index) => (
                <rect key={index} x={18 + index * 48} y={index % 2 ? 30 : 22} width="40" height="56" rx="8" fill={index < 2 ? 'var(--blue-tint, #dde7f7)' : 'var(--card)'} stroke={INK} strokeWidth="2" />
            ))}
            <text x="38" y="58" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>∪</text>
            <text x="86" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>∩</text>
            <text x="110" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} direction="ltr">P ↔ 1 − P</text>
        </svg>
    )
}
