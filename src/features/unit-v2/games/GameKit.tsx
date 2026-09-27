import type { ReactNode } from 'react'
import { Icon } from '../icons'
import type { UnitLanguage } from '../types'
import { useGameText } from './gameHooks'
import { recordKey, type GameInfo, type GameRecords, type LevelRecord, type Stars } from './records'
import './Games.css'

type PrototypeLanguage = UnitLanguage

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
    art,
    levelsTitle,
    language,
    records,
    howTo,
    bestLabel,
    onStart,
    onExit
}: {
    game: GameInfo
    /** Illustration of the game, next to how to play */
    art: ReactNode
    /** Heading above the levels; "choose level" by default */
    levelsTitle?: string
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
                {art}
                <div>
                    <p className="fraction-v2-game-tagline">{l(game.tagline)}</p>
                    {howTo}
                </div>
            </div>
            <h2 className="fraction-v2-game-levels-title">
                {levelsTitle ?? l({ eu: 'Aukeratu maila', es: 'Elige nivel', ar: 'اختر المستوى' })}
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
