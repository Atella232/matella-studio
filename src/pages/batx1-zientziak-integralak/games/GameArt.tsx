import { Car } from '../../../features/unit-v2/games/GameKit'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { BachIntegralsGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it carries no words */
export function BachIntegralsGameArt({ game }: { game: BachIntegralsGameId }) {
    if (game === 'detective') return <DetectiveArt lines={['∫ eˣ = eˣ⁺¹/(x+1) ?', 'F(a) − F(b) ?', 'A = −4/3 ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="∫" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="k" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">F′ = f · F(b) − F(a)</text>
            </svg>
        )
    }
    if (game === 'primitive') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="6" width="208" height="108" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="16" y1="70" x2="204" y2="70" stroke="var(--ink)" strokeWidth="1.5" />
                <path d="M24 100 L 196 30" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" />
                <path d="M24 40 Q 110 140, 196 40" fill="none" stroke="var(--coral, #c4432a)" strokeWidth="4" strokeLinecap="round" />
                <text x="196" y="106" textAnchor="end" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">F ?</text>
            </svg>
        )
    }
    if (game === 'adjust') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[['½', 14, 'var(--success-tint, #d9efe2)'], ['1', 80, 'var(--paper-deep)'], ['2', 146, 'var(--coral-tint, #f6d5cc)']].map(([label, x, fill]) => (
                    <g key={label as string}>
                        <rect x={x as number} y="28" width="58" height="62" rx="10" fill={fill as string} stroke="var(--ink)" strokeWidth="2" />
                        <text x={(x as number) + 29} y="68" textAnchor="middle" fontSize="26" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                    </g>
                ))}
            </svg>
        )
    }
    if (game === 'estimate') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="6" width="208" height="108" rx="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                {[40, 70, 100, 130, 160, 190].map((x) => <line key={x} x1={x} y1="14" x2={x} y2="100" stroke="var(--line)" strokeWidth="1" />)}
                {[30, 60, 90].map((y) => <line key={y} x1="16" y1={y} x2="204" y2={y} stroke="var(--line)" strokeWidth="1" />)}
                <path d="M40 100 L 40 60 Q 100 10, 160 60 L 160 100 Z" fill="#2f6fdb" fillOpacity="0.3" />
                <path d="M30 80 Q 100 0, 170 80" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" />
                <line x1="16" y1="100" x2="204" y2="100" stroke="var(--ink)" strokeWidth="1.5" />
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[['6x²', 14, 'var(--paper-deep)'], ['2x³', 80, 'var(--coral-tint, #f6d5cc)'], ['ln |x|', 146, 'var(--paper-deep)']].map(([label, x, fill]) => (
                <g key={label as string}>
                    <rect x={x as number} y="28" width="58" height="62" rx="10" fill={fill as string} stroke="var(--ink)" strokeWidth="2" />
                    <text x={(x as number) + 29} y="66" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
