import { useState } from 'react'
import type { PrototypeLanguage } from '../content'
import type { GameMode } from '../routing'
import { GameArt, StarRow } from './GameKit'
import { useGameRecords, useGameText } from './gameHooks'
import { MemoryGame } from './MemoryGame'
import { RaceGame } from './RaceGame'
import { TargetGame } from './TargetGame'
import { WallGame } from './WallGame'
import { gameStars, games, type GameId, type GameRecords, type LevelRecord } from './records'
import './Games.css'

export interface GameProps {
    language: PrototypeLanguage
    records: GameRecords
    onResult: (level: number, record: LevelRecord) => void
    onExit: () => void
}

export function GamesArea({
    language,
    completedIds,
    onComplete,
    initialGame
}: {
    language: PrototypeLanguage
    completedIds: number[]
    onComplete: (id: number) => void
    initialGame: GameMode
}) {
    const l = useGameText(language)
    const [mode, setMode] = useState<GameMode>(initialGame)
    const { records, save } = useGameRecords()

    const open = (next: GameMode) => {
        setMode(next)
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
    }

    if (mode !== 'hub') {
        const game = games.find((item) => item.id === mode)!
        const props: GameProps = {
            language,
            records,
            onExit: () => open('hub'),
            onResult: (level, record) => {
                save(game.id, level, record)
                const { progressId } = game.levels[level]
                if (record.stars > 0 && !completedIds.includes(progressId)) onComplete(progressId)
            }
        }
        const components: Record<GameId, (props: GameProps) => React.JSX.Element> = {
            race: RaceGame,
            target: TargetGame,
            wall: WallGame,
            memory: MemoryGame
        }
        const Game = components[game.id]
        return <section className="fraction-v2-games" data-game={game.id}><Game {...props} /></section>
    }

    return (
        <section className="fraction-v2-games" aria-labelledby="fraction-v2-games-title">
            <div className="fraction-v2-page-intro">
                <span>{l({ eu: '4 JOKO', es: '4 JUEGOS', ar: '4 ألعاب' })}</span>
                <h1 id="fraction-v2-games-title">{l({ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' })}</h1>
                <p>{l({ eu: 'Joko bakoitzak maila edo zirkuitu batzuk ditu. Lortu izarrak: lehenengoak unitateko aurrerapenean zenbatzen du.', es: 'Cada juego tiene varios niveles o circuitos. Consigue estrellas: la primera cuenta en el progreso de la unidad.', ar: 'لكل لعبة عدة مستويات أو حلبات. اجمع النجوم: الأولى تُحتسب في تقدم الوحدة.' })}</p>
            </div>
            <div className="fraction-v2-games-grid">
                {games.map((game) => {
                    const earned = gameStars(records, game)
                    const possible = game.levels.length * 3
                    return (
                        <article className="fraction-v2-games-card" data-game={game.id} key={game.id}>
                            <GameArt game={game.id} />
                            <div className="fraction-v2-games-card-body">
                                <small>{l(game.skills)}</small>
                                <h2>{l(game.title)}</h2>
                                <p>{l(game.tagline)}</p>
                            </div>
                            <div className="fraction-v2-games-card-foot">
                                <span className="fraction-v2-games-card-stars">
                                    <StarRow stars={earned > 0 ? 1 : 0} count={1} language={language} size={18} />
                                    <span aria-label={l({ eu: `${earned} izar ${possible}tik`, es: `${earned} de ${possible} estrellas`, ar: `${earned} من ${possible} نجمة` })}>{earned} / {possible}</span>
                                </span>
                                <button type="button" className="fraction-v2-primary" onClick={() => open(game.id)} aria-label={`${l({ eu: 'Jolastu', es: 'Jugar', ar: 'العب' })}: ${l(game.title)}`}>
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
