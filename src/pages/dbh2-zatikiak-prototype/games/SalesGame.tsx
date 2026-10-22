import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from './GameKit'
import { useGameText } from './gameHooks'
import type { GameProps } from './index'
import { createRandom, randomSeed } from './random'
import { games } from './records'
import {
    createSaleRounds,
    offerLabel,
    products,
    saleErrorTips,
    SALES_ROUNDS,
    salesStars,
    type SaleBar,
    type SaleRound
} from './sales'
import './Sales.css'

const game = games.find((item) => item.id === 'sales')!

export function SalesGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<SaleRound[]>([])
    const [index, setIndex] = useState(0)
    const [chosen, setChosen] = useState<number | null>(null)
    const [right, setRight] = useState(0)

    const round = rounds[index]

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createSaleRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setChosen(null)
        setRight(0)
        setPhase('playing')
    }

    const choose = (option: number) => {
        if (chosen !== null) return
        setChosen(option)
        if (round.options[option].correct) setRight((count) => count + 1)
    }

    const next = () => {
        if (index + 1 >= SALES_ROUNDS) {
            onResult(level, { stars: salesStars(right), score: right, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setChosen(null)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${record.score} / ${SALES_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${SALES_ROUNDS} erosketa maila bakoitzean. Begiratu etiketa eta aukeratu erantzuna.`, es: `${SALES_ROUNDS} compras por nivel. Mira la etiqueta y elige la respuesta.`, ar: `${SALES_ROUNDS} مشتريات في كل مستوى. انظر إلى البطاقة واختر الإجابة.` })}</li>
                        <li>{l({ eu: 'Erantzun ondoren, prezioa barra batean ikusiko duzu: zer ordaintzen duzun eta zer aurrezten duzun.', es: 'Después de responder verás el precio en una barra: lo que pagas y lo que ahorras.', ar: 'بعد الإجابة سترى السعر على شريط: ما تدفعه وما توفّره.' })}</li>
                        <li>{l({ eu: '3 izar: dena ondo · 2: 4 asmatze · 1: 3.', es: '3 estrellas: todo bien · 2: 4 aciertos · 1: 3.', ar: '3 نجوم: كل الإجابات صحيحة · 2: أربع إجابات · 1: ثلاث.' })}</li>
                    </ul>
                )}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="sales-game" data-stage={game.levels[level].stage}>
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={salesStars(right)}
                    title={`${right} / ${SALES_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 6 · 2 izar: 4 · izar 1: 3', es: '3 estrellas: 6 · 2: 4 · 1: 3', ar: '3 نجوم: 6 · 2: 4 · 1: 3' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', ar: 'إجابات صحيحة' }), value: `${right} / ${SALES_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    // Only while a level is being set up
    if (!round) return <></>
    const answered = chosen !== null
    const picked = answered ? round.options[chosen] : null
    const comparing = round.kind === 'compare' || round.kind === 'chained-compare'
    const tagOffers = comparing ? [] : round.offers

    return (
        <div className="sales-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {SALES_ROUNDS}</span>
                <span><strong>{right}</strong> {l({ eu: 'asmatze', es: right === 1 ? 'acierto' : 'aciertos', ar: 'إجابات صحيحة' })}</span>
            </GameTopbar>

            <div className="sales-tag" aria-live="polite">
                <span className="sales-tag-hole" aria-hidden="true" />
                <strong className="sales-tag-product">{l(products[round.product])}</strong>
                <span className="sales-tag-price" dir="ltr">
                    {round.kind === 'original' && !answered ? '? €' : `${round.price} €`}
                </span>
                {round.quantity > 1 && <span className="sales-tag-unit">{l({ eu: 'bakoitza', es: 'cada uno', ar: 'للقطعة الواحدة' })}</span>}
                {round.quantity > 1 && <span className="sales-tag-line">{l({ eu: `Zenbat erosten dituzu: ${round.quantity}`, es: `Compras ${round.quantity}`, ar: `تشتري ${round.quantity}` })}</span>}
                {tagOffers.map((offer, offerIndex) => (
                    <span className="sales-tag-offer" key={offerIndex}><MathText text={l(offerLabel(offer))} /></span>
                ))}
                {round.paid !== null && <span className="sales-tag-line">{l({ eu: `Ordaindua: ${round.paid} €`, es: `Has pagado ${round.paid} €`, ar: `دفعتَ ${round.paid} €` })}</span>}
            </div>

            <p className="sales-question">{l(round.question)}</p>

            <div className={`sales-options ${comparing ? 'offers' : 'money'}`}>
                {round.options.map((option, optionIndex) => (
                    <button
                        type="button"
                        key={optionIndex}
                        disabled={answered}
                        className={!answered ? '' : option.correct ? 'right' : optionIndex === chosen ? 'wrong' : ''}
                        onClick={() => choose(optionIndex)}
                    >
                        <MathText text={l(option.label)} />
                    </button>
                ))}
            </div>

            {answered && picked && (
                <div className={`sales-explain ${picked.correct ? 'right' : 'wrong'}`} role="status">
                    <p>
                        <strong>{picked.correct ? l({ eu: 'Zuzena!', es: '¡Correcto!', ar: 'صحيح!' }) : l({ eu: 'Ez da hori.', es: 'No es eso.', ar: 'ليس هذا.' })}</strong>
                        {picked.error && <> {l(saleErrorTips[picked.error])}</>}
                    </p>
                    <SaleBars bars={round.bars} language={language} />
                    <ol className="sales-steps">
                        {round.steps.map((step, stepIndex) => <li key={stepIndex}><MathText text={l(step)} /></li>)}
                    </ol>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= SALES_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}

/** Each price as a bar of equal parts: the paid ones in green, the saved ones in coral */
function SaleBars({ bars, language }: { bars: SaleBar[]; language: GameProps['language'] }) {
    const l = useGameText(language)
    const widest = Math.max(...bars.map((bar) => bar.total))
    return (
        <div className="sales-bars">
            <p className="sales-legend">
                <span><i className="paid" aria-hidden="true" />{l({ eu: 'Ordaintzen duzu', es: 'Pagas', ar: 'تدفع' })}</span>
                <span><i className="saved" aria-hidden="true" />{l({ eu: 'Aurrezten duzu', es: 'Ahorras', ar: 'توفّر' })}</span>
            </p>
            {bars.map((bar, barIndex) => (
                <figure className="sales-bar" key={barIndex} style={{ width: `${(bar.total / widest) * 100}%` }}>
                    {bar.offer && <figcaption><MathText text={l(offerLabel(bar.offer))} /></figcaption>}
                    <div className="sales-bar-total" dir="ltr">{bar.total} €</div>
                    <div
                        className="sales-bar-row"
                        role="img"
                        aria-label={l({ eu: `${bar.total} €: ${bar.paidValue} € ordaindu eta ${bar.savedValue} € aurreztu`, es: `${bar.total} €: pagas ${bar.paidValue} € y ahorras ${bar.savedValue} €`, ar: `${bar.total} €: تدفع ${bar.paidValue} € وتوفّر ${bar.savedValue} €` })}
                        dir="ltr"
                    >
                        {Array.from({ length: bar.parts }, (_, part) => <span className={part < bar.paid ? 'paid' : 'saved'} key={part} />)}
                    </div>
                    <div className="sales-bar-values" dir="ltr">
                        <span className="paid" style={{ flexGrow: bar.paid }}>{bar.paidValue} €</span>
                        {bar.savedValue > 0 && <span className="saved" style={{ flexGrow: bar.parts - bar.paid }}>{bar.savedValue} €</span>}
                    </div>
                </figure>
            ))}
        </div>
    )
}
