import type { ComponentProps } from 'react'
import { Car, LevelPicker as UnitLevelPicker } from '../../../features/unit-v2/games/GameKit'
import type { GameId } from './records'

export { Car, GameTopbar, ResultPanel, StarRow } from '../../../features/unit-v2/games/GameKit'

/** Level picker with the Zatikiak illustration of each game */
export function LevelPicker(props: Omit<ComponentProps<typeof UnitLevelPicker>, 'art' | 'levelsTitle'>) {
    const isRace = props.game.id === 'race'
    const circuitTitle = { eu: 'Aukeratu zirkuitua', es: 'Elige circuito', ar: 'اختر الحلبة' }[props.language]
    return <UnitLevelPicker {...props} art={<GameArt game={props.game.id as GameId} />} levelsTitle={isRace ? circuitTitle : undefined} />
}

/** Small illustration of each game, drawn with the same pieces the game uses */
export function GameArt({ game }: { game: GameId }) {
    if (game === 'race') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="6" y="36" width="208" height="52" rx="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="14" y1="62" x2="206" y2="62" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 7" />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tick) => <line key={tick} x1={14 + tick * 18.6} y1="94" x2={14 + tick * 18.6} y2={tick % 5 === 0 ? 104 : 100} stroke="var(--ink)" strokeWidth="1.6" />)}
                <line x1="14" y1="94" x2="200" y2="94" stroke="var(--ink)" strokeWidth="1.6" />
                <text x="14" y="116" textAnchor="middle" fontSize="11" fill="var(--ink)">0</text>
                <text x="200" y="116" textAnchor="middle" fontSize="11" fill="var(--ink)">1</text>
                <rect x="200" y="36" width="8" height="52" fill="url(#fraction-v2-checker)" stroke="var(--ink)" strokeWidth="1.5" />
                <defs>
                    <pattern id="fraction-v2-checker" width="8" height="8" patternUnits="userSpaceOnUse">
                        <rect width="4" height="4" fill="var(--ink)" /><rect x="4" y="4" width="4" height="4" fill="var(--ink)" />
                    </pattern>
                </defs>
                <Car color="var(--coral)" label="1" x={104} y={20} width={72} />
                <Car color="var(--blue)" x={46} y={50} width={62} />
            </svg>
        )
    }
    if (game === 'target') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="16" y1="78" x2="204" y2="78" stroke="var(--ink)" strokeWidth="2.4" />
                {[16, 110, 204].map((x) => <line key={x} x1={x} y1="68" x2={x} y2="88" stroke="var(--ink)" strokeWidth="2.4" />)}
                <text x="16" y="108" textAnchor="middle" fontSize="13" fill="var(--ink)">0</text>
                <text x="110" y="108" textAnchor="middle" fontSize="13" fill="var(--ink)">1</text>
                <text x="204" y="108" textAnchor="middle" fontSize="13" fill="var(--ink)">2</text>
                <circle cx="180" cy="40" r="24" fill="#fffcf6" stroke="var(--ink)" strokeWidth="2" />
                <circle cx="180" cy="40" r="15" fill="var(--coral-tint)" stroke="var(--ink)" strokeWidth="2" />
                <circle cx="180" cy="40" r="6" fill="var(--coral)" stroke="var(--ink)" strokeWidth="2" />
                <path d="M180 40 L180 72" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M180 78 l-7 -12 h14z" fill="var(--coral)" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round" />
                <rect x="30" y="16" width="62" height="40" rx="10" fill="var(--mustard-tint)" stroke="var(--ink)" strokeWidth="2" transform="rotate(-4 61 36)" />
                <text x="61" y="42" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)" fontFamily="Fraunces, serif">7/4</text>
            </svg>
        )
    }
    if (game === 'wall') {
        const rows = [[['1/2', 0.5, 'var(--blue-tint)'], ['1/3', 1 / 3, 'var(--violet-tint)'], ['1/6', 1 / 6, 'var(--coral-tint)']], [['1/4', 0.25, 'var(--mustard-tint)'], ['3/4', 0.75, 'var(--green-tint)']], [['2/3', 2 / 3, 'var(--violet-tint)']]] as const
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {rows.map((row, rowIndex) => {
                    let x = 14
                    return (
                        <g key={rowIndex}>
                            <rect x="14" y={12 + rowIndex * 34} width="192" height="26" rx="5" fill="#fffcf6" stroke="var(--line-strong, #cfc2aa)" strokeWidth="1.5" strokeDasharray="4 3" />
                            {row.map(([label, share, fill]) => {
                                const width = share * 192
                                const brick = (
                                    <g key={label}>
                                        <rect x={x} y={12 + rowIndex * 34} width={width} height="26" rx="5" fill={fill} stroke="var(--ink)" strokeWidth="2" />
                                        <text x={x + width / 2} y={30 + rowIndex * 34} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">{label}</text>
                                    </g>
                                )
                                x += width
                                return brick
                            })}
                        </g>
                    )
                })}
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {([['3/4', -6, 'var(--mustard-tint)'], ['0,75', 2, '#fffcf6'], ['75%', 8, 'var(--green-tint)']] as const).map(([label, rotation, fill], index) => (
                <g key={label} transform={`rotate(${rotation} ${50 + index * 60} 60)`}>
                    <rect x={22 + index * 60} y="18" width="56" height="80" rx="10" fill={fill} stroke="var(--ink)" strokeWidth="2" />
                    <text x={50 + index * 60} y="64" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--ink)" fontFamily="Fraunces, serif">{label}</text>
                </g>
            ))}
        </svg>
    )
}
