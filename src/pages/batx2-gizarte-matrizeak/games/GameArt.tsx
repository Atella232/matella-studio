import { MatrizeakGameArt } from '../../batx2-zientziak-matrizeak/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { GizarteMatrizeakGameId } from './info'

const INK = 'var(--ink)'

/** Small illustration of each game; the art is the same in every language */
export function GizarteMatrizeakGameArt({ game }: { game: GizarteMatrizeakGameId }) {
    if (game === 'race' || game === 'solve-x') return <MatrizeakGameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['QV − C = …', 'BA = …', 'Q(V − C) ?']} />
    if (game === 'which-product') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {['QV', 'VQ', 'Q + V', 'QᵗV'].map((label, index) => (
                    <g key={label}>
                        <rect x={14 + (index % 2) * 100} y={14 + Math.floor(index / 2) * 50} width={92} height={40} rx={10} fill={index === 0 ? 'var(--success-tint, #d9efe2)' : 'var(--card)'} stroke={index === 0 ? 'var(--success, #267b53)' : INK} strokeWidth={2} />
                        <text x={60 + (index % 2) * 100} y={41 + Math.floor(index / 2) * 50} textAnchor="middle" fontSize={19} fontWeight={700} fill={index === 0 ? 'var(--success, #267b53)' : INK} direction="ltr">{label}</text>
                    </g>
                ))}
            </svg>
        )
    }
    if (game === 'hidden-ticket') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="40" y="8" width="140" height="104" rx="8" fill="var(--card)" stroke={INK} strokeWidth="2" />
                {['4 × 3 €', '6 × ? €', '= 42 €'].map((text, index) => (
                    <text key={text} x="110" y={40 + index * 28} textAnchor="middle" fontSize="19" fontWeight="700" fill={index === 1 ? 'var(--coral, #c4432a)' : INK} direction="ltr">{text}</text>
                ))}
                <line x1="58" x2="162" y1="76" y2="76" stroke={INK} strokeWidth="1.5" strokeDasharray="5 4" />
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="16" y="22" width="84" height="78" rx="10" fill="var(--card)" stroke={INK} strokeWidth="2" />
            <text x="58" y="56" textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} direction="ltr">x + 2y = 5</text>
            <text x="58" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} direction="ltr">3x − y = 1</text>
            <rect x="120" y="22" width="84" height="78" rx="10" fill="var(--success-tint, #d9efe2)" stroke={INK} strokeWidth="2" />
            <text x="162" y="56" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">1   2</text>
            <text x="162" y="80" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">3  −1</text>
        </svg>
    )
}
