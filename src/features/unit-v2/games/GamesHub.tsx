import type { JSX, ReactNode } from 'react'
import type { LocalizedText, UnitLanguage } from '../types'
import { StarRow } from './GameKit'
import { useGameRecords, useGameText } from './gameHooks'
import { gameStars, type GameInfo, type GameRecords, type LevelRecord } from './records'

export interface GameProps {
    language: UnitLanguage
    records: GameRecords
    onResult: (level: number, record: LevelRecord) => void
    onExit: () => void
}

export interface HubGame<Id extends string = string> {
    info: GameInfo<Id>
    art: ReactNode
    component: (props: GameProps) => JSX.Element
}

/** List of the unit's games; opening one shows its level picker */
export function GamesHub<Id extends string>({
    language,
    games,
    recordsKey,
    title,
    completedIds,
    onComplete,
    mode,
    onModeChange
}: {
    language: UnitLanguage
    games: HubGame<Id>[]
    /** localStorage key of the unit's game records */
    recordsKey: string
    title: LocalizedText
    completedIds: number[]
    onComplete: (id: number) => void
    /** The open game comes from the address, so reload, Back and shared links keep it */
    mode: Id | 'hub'
    onModeChange: (next: Id | 'hub') => void
}) {
    const l = useGameText(language)
    const { records, save } = useGameRecords(recordsKey)
    const open = onModeChange

    const current = games.find((game) => game.info.id === mode)
    if (current) {
        const { info, component: Game } = current
        return (
            <section className="fraction-v2-games" data-game={info.id}>
                <Game
                    language={language}
                    records={records}
                    onExit={() => open('hub')}
                    onResult={(level, record) => {
                        save(info.id, level, record)
                        const { progressId } = info.levels[level]
                        if (record.stars > 0 && !completedIds.includes(progressId)) onComplete(progressId)
                    }}
                />
            </section>
        )
    }

    const count = games.length
    return (
        <section className="fraction-v2-games" aria-labelledby="fraction-v2-games-title">
            <div className="fraction-v2-page-intro">
                <span>{l({ eu: `${count} JOKO`, es: `${count} JUEGOS`, ar: `${count} ألعاب` })}</span>
                <h1 id="fraction-v2-games-title">{l(title)}</h1>
                <p>{l({ eu: 'Joko bakoitzak maila edo zirkuitu batzuk ditu. Lortu izarrak: lehenengoak unitateko aurrerapenean zenbatzen du.', es: 'Cada juego tiene varios niveles o circuitos. Consigue estrellas: la primera cuenta en el progreso de la unidad.', ar: 'لكل لعبة عدة مستويات أو حلبات. اجمع النجوم: الأولى تُحتسب في تقدم الوحدة.' })}</p>
            </div>
            <div className="fraction-v2-games-grid">
                {games.map(({ info, art }) => {
                    const earned = gameStars(records, info)
                    const possible = info.levels.length * 3
                    return (
                        <article className="fraction-v2-games-card" data-game={info.id} key={info.id}>
                            {art}
                            <div className="fraction-v2-games-card-body">
                                <small>{l(info.skills)}</small>
                                <h2>{l(info.title)}</h2>
                                <p>{l(info.tagline)}</p>
                            </div>
                            <div className="fraction-v2-games-card-foot">
                                <span className="fraction-v2-games-card-stars">
                                    <StarRow stars={earned > 0 ? 1 : 0} count={1} language={language} size={18} />
                                    <span aria-label={l({ eu: `${earned} izar ${possible}tik`, es: `${earned} de ${possible} estrellas`, ar: `${earned} من ${possible} نجمة` })}>{earned} / {possible}</span>
                                </span>
                                <button type="button" className="fraction-v2-primary" onClick={() => open(info.id)} aria-label={`${l({ eu: 'Jolastu', es: 'Jugar', ar: 'العب' })}: ${l(info.title)}`}>
                                    {l({ eu: 'Jolastu', es: 'Jugar', ar: 'العب' })}
                                </button>
                            </div>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
