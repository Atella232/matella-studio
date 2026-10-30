import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { createExtractRounds, extractDone, extractPoints, extractSoFar, extractStars, extractTip, EXTRACT_MAX, EXTRACT_ROUNDS, startExtract, tapPair, type ExtractRound, type ExtractState } from './extract'
import { PowersGameArt } from './GameArt'
import { powersGames } from './info'
import './Games.css'

const game = powersGames.find((item) => item.id === 'extract')!

const radicalLatex = (outside: number, inside: number) => (inside === 1 ? String(outside) : `${outside === 1 ? '' : outside}\\sqrt{${inside}}`)

export function ExtractGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<ExtractRound[]>([])
    const [index, setIndex] = useState(0)
    const [state, setState] = useState<ExtractState>({ tiles: [], taken: [], mistakes: 0 })
    const [selected, setSelected] = useState<number | null>(null)
    const [shaking, setShaking] = useState<number | null>(null)
    const [points, setPoints] = useState<number[]>([])

    const round = rounds[index]
    const done = round !== undefined && extractDone(state)
    const total = points.reduce((sum, value) => sum + value, 0)

    const start = (nextLevel: number) => {
        const nextRounds = createExtractRounds(createRandom(randomSeed()), nextLevel)
        setLevel(nextLevel)
        setRounds(nextRounds)
        setIndex(0)
        setState(startExtract(nextRounds[0]))
        setSelected(null)
        setShaking(null)
        setPoints([])
        setPhase('playing')
    }

    const tap = (id: number) => {
        if (done) return
        if (selected === null) {
            setSelected(id)
            return
        }
        if (selected === id) {
            setSelected(null)
            return
        }
        const result = tapPair(state, selected, id)
        setState(result.state)
        setSelected(null)
        setShaking(result.ok ? null : id)
        if (result.ok && extractDone(result.state)) setPoints([...points, extractPoints(result.state.mistakes)])
    }

    const next = () => {
        if (index + 1 >= EXTRACT_ROUNDS) {
            onResult(level, { stars: extractStars(total), score: total, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setState(startExtract(rounds[index + 1]))
        setSelected(null)
        setShaking(null)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<PowersGameArt game="extract" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${EXTRACT_MAX}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li><MathText inline text={l({ eu: 'Errokizuna faktore lehenetan banatuta dago. Sakatu berdinak diren bi fitxa: bikoteak errotik ateratzen dira. $\\sqrt{2\\cdot 2\\cdot 3}=2\\sqrt{3}$.', es: 'El radicando está cortado en factores primos. Toca dos fichas iguales: la pareja sale de la raíz. $\\sqrt{2\\cdot 2\\cdot 3}=2\\sqrt{3}$.', en: 'The radicand is split into prime factors. Tap two matching counters: the pair comes out of the root. $\\sqrt{2\\cdot 2\\cdot 3}=2\\sqrt{3}$.', ar: 'ما تحت الجذر مقسوم إلى عوامل أولية. المس رقاقتين متساويتين: يخرج الزوج من الجذر. $\\sqrt{2\\cdot 2\\cdot 3}=2\\sqrt{3}$.' })} /></li>
                        <li>{l({ eu: 'Bi fitxa desberdin sakatzea akatsa da. Txanda bikote gehiago ez daudenean amaitzen da.', es: 'Tocar dos fichas distintas es un fallo. La ronda termina cuando no quedan parejas.', en: 'Tapping two different counters is a mistake. The round ends when there are no pairs left.', ar: 'لمس رقاقتين مختلفتين خطأ. تنتهي الجولة عندما لا تبقى أزواج.' })}</li>
                        <li>{l({ eu: `${EXTRACT_ROUNDS} txanda: 3 puntu txanda garbiko, akats bakoitzeko bat gutxiago.`, es: `${EXTRACT_ROUNDS} rondas: 3 puntos por ronda limpia, uno menos por cada fallo.`, en: `${EXTRACT_ROUNDS} rounds: 3 points for each round with no mistakes, one fewer for each mistake.`, ar: `${EXTRACT_ROUNDS} جولات: 3 نقاط للجولة النظيفة ونقطة أقل عن كل خطأ.` })}</li>
                    </ul>
                )}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="berreturak-game" data-stage={game.levels[level].stage}>
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={extractStars(total)}
                    title={`${total} / ${EXTRACT_MAX}`}
                    subtitle={l({ eu: '3 izar: 13 puntu · 2 izar: 10 · izar 1: 6', es: '3 estrellas: 13 puntos · 2: 10 · 1: 6', en: '3 stars: 13 points · 2: 10 · 1: 6', ar: '3 نجوم: 13 نقطة · 2: 10 · 1: 6' })}
                    stats={[{ label: l({ eu: 'Txanda garbiak', es: 'Rondas sin fallo', en: 'Rounds with no mistakes', ar: 'جولات بلا خطأ' }), value: `${points.filter((value) => value === 3).length} / ${EXTRACT_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    // Only while a level is being set up
    if (!round) return <></>
    const so = extractSoFar(state)

    return (
        <div className="berreturak-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {EXTRACT_ROUNDS}</span>
                <span><strong>{total}</strong> {l({ eu: 'puntu', es: 'puntos', en: 'points', ar: 'نقطة' })}</span>
            </GameTopbar>

            <p className="berreturak-prompt">
                <span>{l({ eu: 'Sinplifikatu erradikala', es: 'Simplifica el radical', en: 'Simplify the radical', ar: 'بسّط الجذر' })}</span>
                <strong><MathText text={`$\\sqrt{${round.radicand}}$`} inline /></strong>
            </p>

            <div className="berreturak-board" style={{ flexDirection: 'column', alignItems: 'center' }}>
                <div className="berreturak-out" aria-label={l({ eu: 'Errotik kanpo', es: 'Fuera de la raíz', en: 'Outside the root', ar: 'خارج الجذر' })}>
                    {state.taken.map((prime, position) => <span className="berreturak-chip" key={position}>{prime}</span>)}
                    {state.taken.length === 0 && <span style={{ color: 'var(--muted)' }}>{l({ eu: 'Hemen geratuko dira ateratako faktoreak', es: 'Aquí irán los factores que salgan', en: 'The factors that come out will go here', ar: 'هنا تظهر العوامل الخارجة' })}</span>}
                </div>
                <div className="berreturak-root" role="group" aria-label={l({ eu: 'Errokizuna', es: 'El radicando', en: 'The radicand', ar: 'ما تحت الجذر' })}>
                    {state.tiles.map((tile) => (
                        <button
                            type="button"
                            key={tile.id}
                            className={`berreturak-tile ${shaking === tile.id ? 'shake' : ''}`}
                            aria-pressed={selected === tile.id}
                            disabled={done}
                            onClick={() => tap(tile.id)}
                        >
                            {tile.prime}
                        </button>
                    ))}
                </div>
            </div>

            <div className="berreturak-panel" aria-live="polite">
                <MathText text={`$\\sqrt{${round.radicand}}=${radicalLatex(so.outside, so.inside)}$`} inline />
                {!done && state.mistakes > 0 && shaking !== null && (
                    <p className="berreturak-verdict wrong">
                        <strong>{l({ eu: 'Ez dira berdinak.', es: 'No son iguales.', en: 'They are not equal.', ar: 'ليستا متساويتين.' })}</strong>{' '}
                        <MathText text={l(extractTip())} inline />
                    </p>
                )}
                {done && (
                    <>
                        <p className="berreturak-verdict right">
                            <strong>{l({ eu: `Eginda: ${extractPoints(state.mistakes)} puntu`, es: `Hecho: ${extractPoints(state.mistakes)} puntos`, en: `Done: ${extractPoints(state.mistakes)} points`, ar: `تم: ${extractPoints(state.mistakes)} نقاط` })}</strong>{' '}
                            {l({ eu: 'Ez dago bikote gehiagorik.', es: 'Ya no quedan parejas.', en: 'No pairs are left.', ar: 'لم تعد هناك أزواج.' })}
                        </p>
                        <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                            {index + 1 >= EXTRACT_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
