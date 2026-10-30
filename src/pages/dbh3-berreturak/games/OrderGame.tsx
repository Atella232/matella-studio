import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { PowersGameArt } from './GameArt'
import { powersGames } from './info'
import { createOrderRounds, nextCard, ORDER_CARDS, ORDER_MAX, ORDER_ROUNDS, orderHint, orderPoints, orderSolution, orderStars, type OrderRound } from './order'
import './Games.css'

const game = powersGames.find((item) => item.id === 'order')!

export function OrderGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<OrderRound[]>([])
    const [index, setIndex] = useState(0)
    const [placed, setPlaced] = useState<string[]>([])
    const [mistakes, setMistakes] = useState(0)
    const [shaking, setShaking] = useState<string | null>(null)
    const [points, setPoints] = useState<number[]>([])

    const round = rounds[index]
    const done = round !== undefined && placed.length === ORDER_CARDS
    const total = points.reduce((sum, value) => sum + value, 0)

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createOrderRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setPlaced([])
        setMistakes(0)
        setShaking(null)
        setPoints([])
        setPhase('playing')
    }

    const tap = (id: string) => {
        if (done || placed.includes(id)) return
        if (nextCard(round, placed)?.id === id) {
            const next = [...placed, id]
            setPlaced(next)
            setShaking(null)
            if (next.length === ORDER_CARDS) setPoints([...points, orderPoints(mistakes)])
        } else {
            setMistakes(mistakes + 1)
            setShaking(id)
        }
    }

    const next = () => {
        if (index + 1 >= ORDER_ROUNDS) {
            onResult(level, { stars: orderStars(total), score: total, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setPlaced([])
        setMistakes(0)
        setShaking(null)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<PowersGameArt game="order" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${ORDER_MAX}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `Txanda bakoitzean ${ORDER_CARDS} tamaina agertzen dira. Sakatu txikiena, gero hurrengoa… handienera arte.`, es: `En cada ronda aparecen ${ORDER_CARDS} tamaños. Toca el más pequeño, luego el siguiente… hasta el mayor.`, en: `Each round shows ${ORDER_CARDS} sizes. Tap the smallest, then the next… up to the largest.`, ar: `في كل جولة تظهر ${ORDER_CARDS} أحجام. المس الأصغر ثم التالي… حتى الأكبر.` })}</li>
                        <li><MathText inline text={l({ eu: 'Lehenik berretzaileak, gero zenbakiak. Kontuz: $25\\cdot 10^{3}$ ez dago idazkera zientifikoan.', es: 'Primero los exponentes, luego los números. Ojo: $25\\cdot 10^{3}$ no está en notación científica.', en: 'First the exponents, then the numbers. Watch out: $25\\cdot 10^{3}$ is not in scientific notation.', ar: 'أولًا الأسس ثم الأعداد. انتبه: $25\\cdot 10^{3}$ ليست بالترميز العلمي.' })} /></li>
                        <li>{l({ eu: `${ORDER_ROUNDS} txanda: txanda bakoitzean ${ORDER_CARDS} puntu, akats bakoitzeko bat gutxiago.`, es: `${ORDER_ROUNDS} rondas: ${ORDER_CARDS} puntos por ronda, uno menos por cada fallo.`, en: `${ORDER_ROUNDS} rounds: ${ORDER_CARDS} points per round, one fewer for each mistake.`, ar: `${ORDER_ROUNDS} جولات: ${ORDER_CARDS} نقاط لكل جولة ونقطة أقل عن كل خطأ.` })}</li>
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
                    stars={orderStars(total)}
                    title={`${total} / ${ORDER_MAX}`}
                    subtitle={l({ eu: '3 izar: 21 puntu · 2 izar: 15 · izar 1: 9', es: '3 estrellas: 21 puntos · 2: 15 · 1: 9', en: '3 stars: 21 points · 2: 15 · 1: 9', ar: '3 نجوم: 21 نقطة · 2: 15 · 1: 9' })}
                    stats={[{ label: l({ eu: 'Txanda garbiak', es: 'Rondas sin fallo', en: 'Rounds with no mistakes', ar: 'جولات بلا خطأ' }), value: `${points.filter((value) => value === ORDER_CARDS).length} / ${ORDER_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    // Only while a level is being set up
    if (!round) return <></>
    const solution = orderSolution(round)

    return (
        <div className="berreturak-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {ORDER_ROUNDS}</span>
                <span><strong>{total}</strong> {l({ eu: 'puntu', es: 'puntos', en: 'points', ar: 'نقطة' })}</span>
            </GameTopbar>

            <p className="berreturak-prompt">
                {done ? l({ eu: 'Ordena zuzena!', es: '¡Orden correcto!', en: 'Correct order!', ar: 'ترتيب صحيح!' }) : (
                    <>
                        <span>{l({ eu: 'Sakatu txikiena aurrena. Falta dira:', es: 'Toca primero el más pequeño. Faltan:', en: 'Tap the smallest one first. Still to go:', ar: 'المس الأصغر أولًا. المتبقي:' })}</span>
                        <strong>{ORDER_CARDS - placed.length}</strong>
                    </>
                )}
            </p>

            <div className="berreturak-board" role="group" aria-label={l({ eu: 'Tamainak', es: 'Los tamaños', en: 'The sizes', ar: 'الأحجام' })}>
                {round.map((card) => {
                    const position = placed.indexOf(card.id)
                    return (
                        <button
                            type="button"
                            key={card.id}
                            className={`berreturak-card ${position >= 0 ? 'placed' : ''} ${shaking === card.id ? 'shake' : ''}`}
                            disabled={position >= 0 || done}
                            onClick={() => tap(card.id)}
                        >
                            {position >= 0 && <span className="berreturak-order">{position + 1}</span>}
                            {card.label && <small>{l(card.label)}</small>}
                            <MathText text={`$${localLatex(card.latex, language)}${card.label ? '\\,\\text{m}' : ''}$`} inline />
                        </button>
                    )
                })}
            </div>

            <div className="berreturak-panel" aria-live="polite">
                {shaking !== null && !done && (
                    <p className="berreturak-verdict wrong">
                        <strong>{l({ eu: 'Ez da txikiena.', es: 'Ese no es el más pequeño.', en: 'That is not the smallest one.', ar: 'ليس هذا هو الأصغر.' })}</strong>{' '}
                        <MathText text={l(orderHint())} inline />
                    </p>
                )}
                {done && (
                    <>
                        <p className="berreturak-verdict right">
                            <strong>{l({ eu: `${orderPoints(mistakes)} puntu`, es: `${orderPoints(mistakes)} puntos`, en: `${orderPoints(mistakes)} points`, ar: `${orderPoints(mistakes)} نقاط` })}</strong>{' '}
                            <MathText text={`$${solution.map((card) => `${localLatex(card.latex, language)}`).join('<')}$`} inline />
                        </p>
                        <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                            {index + 1 >= ORDER_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
