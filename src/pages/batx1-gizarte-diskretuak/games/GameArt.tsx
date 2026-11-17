import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { DiscreteBatx1gGameId } from './info'

const INK = 'var(--ink)'
const BLUE = 'var(--blue, #2f6fdb)'
const CORAL = 'var(--coral, #c4432a)'
const MUSTARD = 'var(--mustard, #e0a100)'
const GREEN = 'var(--green, #267b53)'

/** Small illustration of each game; the art is the same in every language */
export function DiscreteBatx1gGameArt({ game }: { game: DiscreteBatx1gGameId }) {
    if (game === 'detective') return <DetectiveArt lines={['μ = (0 + 1 + 2) / 3 ?', 'σ = npq ?', 'p = x̄ / N ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke={INK} strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color={CORAL} label="μ" x={104} y={20} width={72} />
                <Car color={BLUE} label="p" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">B(n; p) · μ = np</text>
            </svg>
        )
    }
    if (game === 'galton') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[0, 1, 2, 3].map((row) => Array.from({ length: row + 1 }, (_, index) => <circle key={`${row}-${index}`} cx={110 + (index - row / 2) * 26} cy={14 + row * 14} r={3} fill={INK} />))}
                {[1, 4, 6, 4, 1].map((value, index) => <rect key={index} x={47 + index * 26} y={110 - value * 7} width={22} height={value * 7} fill="var(--mustard-tint, #fbebc0)" stroke={MUSTARD} strokeWidth="2" />)}
                <line x1="40" x2="180" y1="110" y2="110" stroke={INK} strokeWidth="2" />
                <circle cx={123} cy={36} r={5} fill={CORAL} />
            </svg>
        )
    }
    if (game === 'events') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="20" y="24" width="180" height="40" rx="10" fill="var(--card, #fffcf6)" stroke={INK} strokeWidth="2" />
                <text x="110" y="51" textAnchor="middle" fontSize="18" fontWeight="700" fill={INK}>« ? »</text>
                <text x="110" y="100" textAnchor="middle" fontSize="22" fontWeight="700" fill={CORAL} direction="ltr">≥  &gt;  ≤  &lt;</text>
            </svg>
        )
    }
    if (game === 'worth') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((index) => <rect key={index} x={24 + index * 36} y={26} width={30} height={22} rx={4} fill={index === 2 ? MUSTARD : 'var(--card, #fffcf6)'} stroke={INK} strokeWidth="2" />)}
                <text x="110" y="92" textAnchor="middle" fontSize="20" fontWeight="700" fill={GREEN} direction="ltr">μ − €</text>
            </svg>
        )
    }
    if (game === 'binomial') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[1, 4, 6, 4, 1].map((value, index) => <rect key={index} x={30 + index * 32} y={86 - value * 11} width={26} height={value * 11} fill="var(--mustard-tint, #fbebc0)" stroke={MUSTARD} strokeWidth="2" />)}
                <line x1="20" x2="200" y1="86" y2="86" stroke={INK} strokeWidth="2" />
                <text x="110" y="110" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">B(n; p) ?</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[0, 1, 2].map((index) => <rect key={index} x={30 + index * 60} y={24} width={44} height={60} rx={8} fill={index === 1 ? 'var(--blue-tint, #dde7f7)' : 'var(--card, #fffcf6)'} stroke={INK} strokeWidth="2" />)}
            <text x="52" y="60" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">np</text>
            <text x="112" y="60" textAnchor="middle" fontSize="16" fontWeight="700" fill={BLUE}>?</text>
            <text x="172" y="60" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} direction="ltr">μ</text>
        </svg>
    )
}
