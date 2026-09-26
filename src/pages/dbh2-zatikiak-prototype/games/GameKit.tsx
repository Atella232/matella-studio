import type { ReactNode } from 'react'
import type { PrototypeLanguage } from '../content'
import { Icon } from '../icons'
import { useGameText } from './gameHooks'
import { recordKey, type GameId, type GameInfo, type GameRecords, type LevelRecord, type Stars } from './records'

export function StarRow({ stars, language, size = 20, count = 3 }: { stars: number; language: PrototypeLanguage; size?: number; count?: number }) {
    const l = useGameText(language)
    return (
        <span className="fraction-v2-stars" role="img" aria-label={count === 3 ? l({ eu: `${stars} izar 3tik`, es: `${stars} de 3 estrellas`, ar: `${stars} من 3 نجوم` }) : undefined} aria-hidden={count === 3 ? undefined : true}>
            {Array.from({ length: count }, (_, index) => index).map((index) => (
                <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={index < stars ? 'on' : ''} key={index}>
                    <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z" />
                </svg>
            ))}
        </span>
    )
}

export function GameTopbar({ game, language, onExit, children }: { game: GameInfo; language: PrototypeLanguage; onExit: () => void; children?: ReactNode }) {
    const l = useGameText(language)
    return (
        <div className="fraction-v2-game-topbar">
            <button type="button" className="fraction-v2-game-back" onClick={onExit}>
                <Icon name="back" size={18} className="fraction-v2-icon-flip" />
                {l({ eu: 'Jokoak', es: 'Juegos', ar: 'الألعاب' })}
            </button>
            <h1>{l(game.title)}</h1>
            {children && <div className="fraction-v2-game-stats">{children}</div>}
        </div>
    )
}

/** First screen of every game: how to play and the level (circuit) to start */
export function LevelPicker({
    game,
    language,
    records,
    howTo,
    bestLabel,
    onStart,
    onExit
}: {
    game: GameInfo
    language: PrototypeLanguage
    records: GameRecords
    howTo: ReactNode
    bestLabel: (record: LevelRecord) => string
    onStart: (level: number) => void
    onExit: () => void
}) {
    const l = useGameText(language)
    const nextLevel = game.levels.findIndex((_level, index) => !(records[recordKey(game.id, index)]?.stars))
    return (
        <div className="fraction-v2-game-intro">
            <GameTopbar game={game} language={language} onExit={onExit} />
            <div className="fraction-v2-game-howto">
                <GameArt game={game.id} />
                <div>
                    <p className="fraction-v2-game-tagline">{l(game.tagline)}</p>
                    {howTo}
                </div>
            </div>
            <h2 className="fraction-v2-game-levels-title">
                {game.id === 'race' ? l({ eu: 'Aukeratu zirkuitua', es: 'Elige circuito', ar: 'اختر الحلبة' }) : l({ eu: 'Aukeratu maila', es: 'Elige nivel', ar: 'اختر المستوى' })}
            </h2>
            <ol className="fraction-v2-game-levels">
                {game.levels.map((level, index) => {
                    const record = records[recordKey(game.id, index)]
                    return (
                        <li key={level.progressId}>
                            <button type="button" data-stage={level.stage} className={index === nextLevel ? 'suggested' : ''} onClick={() => onStart(index)}>
                                <span className="fraction-v2-game-level-number">{index + 1}</span>
                                <strong>{l(level.title)}</strong>
                                <span className="fraction-v2-game-level-text">{l(level.description)}</span>
                                <span className="fraction-v2-game-level-foot">
                                    <StarRow stars={record?.stars ?? 0} language={language} size={18} />
                                    {record && <small>{bestLabel(record)}</small>}
                                    {!record && index === nextLevel && <small>{l({ eu: 'Gomendatua', es: 'Recomendado', ar: 'مُوصى به' })}</small>}
                                </span>
                            </button>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

export function ResultPanel({
    language,
    stars,
    title,
    subtitle,
    stats,
    children,
    onReplay,
    onLevels,
    onNext
}: {
    language: PrototypeLanguage
    stars: Stars
    title: string
    subtitle?: string
    stats: Array<{ label: string; value: string }>
    children?: ReactNode
    onReplay: () => void
    onLevels: () => void
    onNext?: () => void
}) {
    const l = useGameText(language)
    return (
        <section className="fraction-v2-game-result" aria-live="polite">
            <StarRow stars={stars} language={language} size={40} />
            <h2 tabIndex={-1} ref={(node) => node?.focus()}>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
            <dl className="fraction-v2-game-result-stats">
                {stats.map((stat) => (
                    <div key={stat.label}>
                        <dt>{stat.label}</dt>
                        <dd>{stat.value}</dd>
                    </div>
                ))}
            </dl>
            {children}
            <div className="fraction-v2-game-result-actions">
                <button type="button" className="fraction-v2-primary" onClick={onReplay}>{l({ eu: 'Berriro jokatu', es: 'Jugar otra vez', ar: 'العب مجددًا' })}</button>
                {onNext && <button type="button" className="fraction-v2-secondary" onClick={onNext}>{l({ eu: 'Hurrengo maila', es: 'Siguiente nivel', ar: 'المستوى التالي' })}</button>}
                <button type="button" className="fraction-v2-secondary" onClick={onLevels}>{l({ eu: 'Beste maila bat', es: 'Otro nivel', ar: 'مستوى آخر' })}</button>
            </div>
        </section>
    )
}

/** A side-view car drawn in the notebook style */
export function Car({ color, ghost = false, label, x, y, width }: { color: string; ghost?: boolean; label?: string; x?: number; y?: number; width?: number }) {
    return (
        <svg className={`fraction-v2-car ${ghost ? 'ghost' : ''}`} viewBox="0 0 64 30" x={x} y={y} width={width} height={width === undefined ? undefined : (width * 30) / 64} aria-hidden="true">
            <path d="M6 20.5c0-3 1.6-5 4.4-5.6l7.8-1.6 6.3-6c1-.9 2.2-1.3 3.5-1.3h13.1c1.7 0 3.2.8 4.1 2.2l3.6 5.1 7 1.5c2.2.5 3.7 2.4 3.7 4.7v2.6c0 1-.8 1.8-1.8 1.8H7.8c-1 0-1.8-.8-1.8-1.8z" fill={ghost ? 'none' : color} stroke="var(--ink)" strokeWidth="2" strokeDasharray={ghost ? '3 3' : undefined} />
            <path d="M25.5 13.2l4.3-4.2h11.3l3 4.2z" fill={ghost ? 'none' : '#fffcf6'} stroke="var(--ink)" strokeWidth="1.6" strokeDasharray={ghost ? '3 3' : undefined} />
            <circle cx="18" cy="24" r="4.6" fill={ghost ? 'none' : 'var(--ink)'} stroke="var(--ink)" strokeWidth="2" />
            <circle cx="47" cy="24" r="4.6" fill={ghost ? 'none' : 'var(--ink)'} stroke="var(--ink)" strokeWidth="2" />
            {!ghost && <circle cx="18" cy="24" r="1.6" fill="#fffcf6" />}
            {!ghost && <circle cx="47" cy="24" r="1.6" fill="#fffcf6" />}
            {label && !ghost && <text x="35" y="20.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#fffcf6" fontFamily="Atkinson Hyperlegible, sans-serif">{label}</text>}
        </svg>
    )
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
