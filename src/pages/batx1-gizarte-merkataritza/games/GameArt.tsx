import { Car } from '../../../features/unit-v2/games/GameKit'
import { ProportionDbh4ApGameArt } from '../../dbh4-aplikatuak-proportzionaltasuna/games/GameArt'
import { DetectiveArt } from '../../dbh4-games/DetectiveArt'
import type { GizMoneyGameId } from './info'

/** Small illustration of each game; the art is the same in every language, so it has no decimal commas */
export function GizMoneyGameArt({ game }: { game: GizMoneyGameId }) {
    if (game === 'bank' || game === 'till') return <ProportionDbh4ApGameArt game={game} />
    if (game === 'detective') return <DetectiveArt lines={['+20 % − 20 % = 0 ?', 'TAE = 6 % ?', 'S = a · rⁿ/(r − 1) ?']} />
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M14 46 Q 110 120, 206 46" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                <Car color="var(--coral, #c4432a)" label="€" x={104} y={20} width={72} />
                <Car color="var(--blue)" label="%" x={52} y={54} width={44} />
                <text x="110" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">C · (1 + i)ⁿ</text>
            </svg>
        )
    }
    if (game === 'offer') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[0, 1].map((index) => (
                    <g key={index} transform={`translate(${16 + index * 100} ${20 + index * 8})`}>
                        <rect width="88" height="70" rx="10" fill={index === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                        <text x="44" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">{index === 0 ? '6 %' : '5.9 %'}</text>
                        <text x="44" y="54" textAnchor="middle" fontSize="11" fill="var(--ink)" direction="ltr">{index === 0 ? '× 1' : '× 12'}</text>
                    </g>
                ))}
                <text x="110" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--coral, #c4432a)" direction="ltr">TAE ?</text>
            </svg>
        )
    }
    if (game === 'gaps') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[0, 1, 2].map((row) => [0, 1, 2].map((column) => (
                    <g key={`${row}-${column}`}>
                        <rect x={30 + column * 54} y={14 + row * 30} width="50" height="26" rx="4" fill={row === 1 && column === 1 ? 'var(--coral-tint, #f6d5cc)' : 'var(--paper-deep)'} stroke="var(--ink)" strokeWidth="1.6" />
                        <text x={55 + column * 54} y={32 + row * 30} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)" direction="ltr">{row === 1 && column === 1 ? '?' : ['500', '2300', '7700', '385', '?', '5285', '264', '2536', '2749'][row * 3 + column]}</text>
                    </g>
                )))}
                <text x="110" y="114" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">I · A · D</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {['+15 %', '1.15', '1.02²', '1.0404'].map((label, index) => (
                <g key={index} transform={`translate(${14 + index * 50} ${index % 2 === 0 ? 24 : 40}) rotate(${index % 2 === 0 ? -4 : 4})`}>
                    <rect width="44" height="60" rx="8" fill={index % 2 === 0 ? 'var(--paper-deep)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="22" y="36" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
