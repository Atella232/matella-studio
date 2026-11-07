import { Car } from '../../../features/unit-v2/games/GameKit'
import { CurveArt } from '../../dbh4-games/CurveGames'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import { FunctionArt } from '../../dbh4-games/FunctionGames'
import type { BachFunctionsGameId } from './info'

/** A machine card for the art */
function Card({ x, y, label, fill }: { x: number; y: number; label: string; fill: string }) {
    return (
        <g>
            <rect x={x} y={y} width="46" height="34" rx="8" fill={fill} stroke="var(--ink)" strokeWidth="2" />
            <text x={x + 23} y={y + 23} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
        </g>
    )
}

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function BachFunctionsGameArt({ game }: { game: BachFunctionsGameId }) {
    if (game === 'domain') return <FunctionArt game="domain" />
    if (game === 'laser') return <CurveArt game="laser" />
    if (game === 'detective') return <DetectiveArt lines={['f(x) = 2x + 4', 'f⁻¹ = 1/(2x + 4) ?', '(x − 4)/2']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="f⁻¹" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="E(x)" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">f(x + c) · f ∘ g · arcsin</text>
            </svg>
        )
    }
    if (game === 'where') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[30, 60, 90, 120, 150, 180].map((x) => <line key={x} x1={x} x2={x} y1="10" y2="110" stroke="var(--line)" strokeWidth="1" />)}
                {[20, 45, 70, 95].map((y) => <line key={y} x1="20" x2="200" y1={y} y2={y} stroke="var(--line)" strokeWidth="1" />)}
                <line x1="20" x2="200" y1="70" y2="70" stroke="var(--ink)" strokeWidth="2" />
                <line x1="120" x2="120" y1="10" y2="110" stroke="var(--ink)" strokeWidth="2" />
                <circle cx="150" cy="45" r="7" fill="var(--coral, #c4432a)" />
                <path d="M150 45 L 66 95" fill="none" stroke="var(--success, #267b53)" strokeWidth="2.4" strokeDasharray="6 5" />
                <circle cx="60" cy="95" r="8" fill="var(--success, #267b53)" />
                <text x="160" y="36" fontSize="15" fontWeight="700" fill="var(--ink)">P</text>
                <text x="40" y="112" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">−f(x + 3)</text>
            </svg>
        )
    }
    if (game === 'order') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <text x="14" y="44" fontSize="20" fontWeight="700" fontStyle="italic" fill="var(--ink)">x</text>
                <Card x={34} y={20} label="+ 3" fill="var(--mustard-tint, #fbebc0)" />
                <text x="86" y="44" fontSize="18" fill="var(--muted)">→</text>
                <Card x={104} y={20} label="x²" fill="var(--mustard-tint, #fbebc0)" />
                <text x="156" y="44" fontSize="18" fill="var(--muted)">→</text>
                <text x="176" y="44" fontSize="18" fontWeight="700" fill="var(--success, #267b53)">16</text>
                <Card x={50} y={72} label="· 2" fill="var(--paper-deep)" />
                <Card x={122} y={72} label="− 1" fill="var(--paper-deep)" />
            </svg>
        )
    }
    if (game === 'undo') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <text x="110" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">f(x) = 2x + 4</text>
                <Card x={30} y={36} label="· 2" fill="var(--paper-deep)" />
                <text x="82" y="58" fontSize="18" fill="var(--muted)">→</text>
                <Card x={100} y={36} label="+ 4" fill="var(--paper-deep)" />
                <Card x={30} y={78} label="÷ 2" fill="var(--success-tint, #d9efe2)" />
                <text x="82" y="100" fontSize="18" fill="var(--success, #267b53)">←</text>
                <Card x={100} y={78} label="− 4" fill="var(--success-tint, #d9efe2)" />
                <text x="160" y="100" fontSize="16" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">f⁻¹</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['E(−2.4)', '−3', '2x + 4', '(x − 4)/2'].map((label, index) => (
                <g key={index} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize="7" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
