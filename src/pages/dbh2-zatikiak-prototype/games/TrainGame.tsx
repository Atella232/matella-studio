import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from './GameKit'
import { useGameText } from './gameHooks'
import type { GameProps } from './index'
import { createRandom, randomSeed } from './random'
import { games } from './records'
import {
    brokenNeighbour,
    cardLatex,
    cardText,
    compareLatex,
    createTrains,
    fittingGaps,
    fits,
    hookAt,
    TRAIN_ARRIVALS,
    TRAIN_MAX_SCORE,
    TRAINS_PER_LEVEL,
    trainStars,
    type Train,
    type TrainCard,
    type TrainLevel
} from './train'
import './Train.css'

const game = games.find((item) => item.id === 'train')!

/** In Arabic, numbers and arithmetic keep their left-to-right order (LRI … PDI) */
const ltr = (text: string) => `⁦${text}⁩`

type Outcome = { kind: 'right' } | { kind: 'wrong'; neighbour: TrainCard; cardIsLarger: boolean; card: TrainCard } | null

/** A wagon's number, written as on the wagon */
function CardFace({ card, separator }: { card: TrainCard; separator: ',' | '.' }) {
    return <MathText inline text={`$${cardLatex(card, separator).replaceAll('\\frac', '\\dfrac')}$`} />
}

export function TrainGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const separator = language === 'ar' ? '.' : ','
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState<TrainLevel>(0)
    const [trains, setTrains] = useState<Train[]>([])
    const [trainIndex, setTrainIndex] = useState(0)
    /** The wagons hooked so far, in order */
    const [hooked, setHooked] = useState<TrainCard[]>([])
    /** Which wagon of the train is arriving */
    const [arrival, setArrival] = useState(1)
    /** The gap the learner points at: 0 is next to the engine */
    const [gap, setGap] = useState<number | null>(null)
    const [outcome, setOutcome] = useState<Outcome>(null)
    const [score, setScore] = useState(0)
    /** The wagon that has just been hooked, to animate it */
    const [lastHooked, setLastHooked] = useState<TrainCard | null>(null)
    const trackRef = useRef<HTMLDivElement>(null)

    const train = trains[trainIndex]
    const arriving = train && arrival <= TRAIN_ARRIVALS ? train.cards[arrival] : null
    const trainDone = train !== undefined && arrival > TRAIN_ARRIVALS

    const startTrain = (target: Train) => {
        setHooked([target.cards[0]])
        setArrival(1)
        setGap(null)
        setOutcome(null)
        setLastHooked(target.cards[0])
    }

    const start = (nextLevel: number) => {
        const created = createTrains(createRandom(randomSeed()), nextLevel as TrainLevel)
        setLevel(nextLevel as TrainLevel)
        setTrains(created)
        setTrainIndex(0)
        setScore(0)
        startTrain(created[0])
        setPhase('playing')
    }

    const point = (next: number) => {
        if (!arriving || outcome) return
        setGap(Math.max(0, Math.min(hooked.length, next)))
    }

    /** A tap on the track points at the gap between the wagons around it */
    const onTrackPointer = (event: PointerEvent<HTMLDivElement>) => {
        if (!arriving || outcome || !trackRef.current) return
        const centres = [...trackRef.current.querySelectorAll<HTMLElement>('.train-wagon.hooked')].map((wagon) => {
            const box = wagon.getBoundingClientRect()
            return box.left + box.width / 2
        })
        point(centres.filter((centre) => centre < event.clientX).length)
    }

    const onTrackKey = (event: KeyboardEvent<HTMLDivElement>) => {
        const moves: Record<string, number> = { ArrowLeft: (gap ?? 1) - 1, ArrowRight: (gap ?? -1) + 1, Home: 0, End: hooked.length }
        if (event.key === 'Enter' && gap !== null) {
            event.preventDefault()
            hook()
            return
        }
        if (!(event.key in moves)) return
        event.preventDefault()
        point(moves[event.key])
    }

    const hook = () => {
        if (!arriving || gap === null || outcome) return
        if (fits(hooked, arriving, gap)) {
            setScore((total) => total + 1)
            setHooked(hookAt(hooked, arriving, gap))
            setLastHooked(arriving)
            setOutcome({ kind: 'right' })
            setGap(null)
            setArrival((index) => index + 1)
            // A right wagon needs no reading: the next one comes straight away
            setTimeout(() => setOutcome((current) => (current?.kind === 'right' ? null : current)), 900)
            return
        }
        const broken = brokenNeighbour(hooked, arriving, gap)!
        const place = fittingGaps(hooked, arriving).first
        setHooked(hookAt(hooked, arriving, place))
        setLastHooked(arriving)
        setOutcome({ kind: 'wrong', card: arriving, ...broken })
        setGap(null)
    }

    const afterWrong = () => {
        setOutcome(null)
        setArrival((index) => index + 1)
        requestAnimationFrame(() => trackRef.current?.focus())
    }

    const nextTrain = () => {
        if (trainIndex + 1 >= TRAINS_PER_LEVEL) {
            onResult(level, { stars: trainStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setTrainIndex(trainIndex + 1)
        startTrain(trains[trainIndex + 1])
    }

    const outOf = (value: number, total: number) => (language === 'ar' ? ltr(`${value} / ${total}`) : `${value} / ${total}`)
    const starsText = l({
        eu: '3 izar: 9 bagoi · 2: 7 · 1: 5.',
        es: '3 estrellas: 9 vagones · 2: 7 · 1: 5.',
        ar: '3 نجوم: 9 عربات · 2: 7 · 1: 5.'
    })

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'أفضل نتيجة' })}: ${outOf(record.score, TRAIN_MAX_SCORE)}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${TRAINS_PER_LEVEL} tren maila bakoitzean. Bagoiak banan-banan iristen dira: lotu bakoitza bere lekuan, trena txikienetik handienera joan dadin.`, es: `${TRAINS_PER_LEVEL} trenes por nivel. Los vagones llegan de uno en uno: engancha cada uno en su sitio para que el tren vaya de menor a mayor.`, ar: `قطاران في كل مستوى. تصل العربات واحدة تلو الأخرى: اربط كل عربة في مكانها ليصبح القطار من الأصغر إلى الأكبر.` })}</li>
                        <li>{l({ eu: 'Sakatu trenean bagoia non doan, eta gero «Lotu». Lehen saiakeran ondo lotutako bagoi bakoitzak puntu bat ematen du.', es: 'Toca en el tren dónde va el vagón y después «Enganchar». Cada vagón bien enganchado a la primera vale un punto.', ar: 'اضغط على القطار حيث تذهب العربة ثم «اربط». كل عربة مربوطة صحيحًا من المحاولة الأولى بنقطة.' })}</li>
                        <li>{starsText}</li>
                    </ul>
                )}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="train-game" data-stage={game.levels[level].stage}>
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={trainStars(score)}
                    title={outOf(score, TRAIN_MAX_SCORE)}
                    subtitle={starsText}
                    stats={[{ label: l({ eu: 'Lehen saiakeran', es: 'A la primera', ar: 'من المحاولة الأولى' }), value: outOf(score, TRAIN_MAX_SCORE) }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    // Only while a level is being set up
    if (!train) return <></>

    // The track: the hooked wagons, with an open space where the learner points
    const slots: Array<{ card: TrainCard; ghost: boolean }> = hooked.map((card) => ({ card, ghost: false }))
    if (arriving && gap !== null) slots.splice(gap, 0, { card: arriving, ghost: true })
    const wrongCard = outcome?.kind === 'wrong' ? outcome.card : null

    return (
        <div className="train-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{l({ eu: 'Trena', es: 'Tren', ar: 'القطار' })} <bdi dir="ltr">{trainIndex + 1} / {TRAINS_PER_LEVEL}</bdi></span>
                <span>{l({ eu: 'Puntuak', es: 'Puntos', ar: 'النقاط' })}: <strong><bdi dir="ltr">{score}</bdi></strong></span>
            </GameTopbar>

            <div className="train-platform" aria-live="polite">
                {arriving && !outcome && (
                    <>
                        <span className="train-platform-label">{l({ eu: 'Bagoi hau iritsi da:', es: 'Llega este vagón:', ar: 'وصلت هذه العربة:' })}</span>
                        <span className="train-wagon arriving" dir="ltr" key={`arriving-${trainIndex}-${arrival}`}>
                            <span className="train-wagon-face"><CardFace card={arriving} separator={separator} /></span>
                        </span>
                        <span className="train-count">{l({ eu: `Bagoiak: ${arrival} / ${TRAIN_ARRIVALS}`, es: `Vagón ${arrival} de ${TRAIN_ARRIVALS}`, ar: `العربة ${arrival} من ${TRAIN_ARRIVALS}` })}</span>
                    </>
                )}
                {outcome?.kind === 'right' && <strong className="train-right">{l({ eu: 'Ondo lotuta!', es: '¡Bien enganchado!', ar: 'رُبطت جيدًا!' })}</strong>}
            </div>

            <p className="train-direction" aria-hidden="true">
                <span>{l({ eu: 'txikiena', es: 'menor', ar: 'الأصغر' })}</span>
                <span className="train-direction-arrow" />
                <span>{l({ eu: 'handiena', es: 'mayor', ar: 'الأكبر' })}</span>
            </p>

            <div
                className={`train-track ${trainDone ? 'departing' : ''}`}
                dir="ltr"
                ref={trackRef}
                tabIndex={arriving && !outcome ? 0 : -1}
                role="group"
                aria-label={l({ eu: 'Trena: sakatu bagoia non doan; geziekin ere bai', es: 'Tren: toca dónde va el vagón; también con las flechas', ar: 'القطار: اضغط حيث تذهب العربة؛ أو استعمل الأسهم' })}
                onPointerDown={onTrackPointer}
                onKeyDown={onTrackKey}
            >
                <span className="train-engine" aria-hidden="true">
                    <svg viewBox="0 0 48 40"><path d="M4 30 V14 H18 V6 H30 V14 H44 V30 Z" fill="var(--coral)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" /><rect x="21" y="9" width="6" height="6" fill="#fffcf6" stroke="var(--ink)" strokeWidth="1.5" /><circle cx="13" cy="33" r="5" fill="var(--ink)" /><circle cx="35" cy="33" r="5" fill="var(--ink)" /></svg>
                </span>
                {slots.map(({ card, ghost }, index) => (
                    <span
                        key={ghost ? 'ghost' : `${cardText(card)}-${index}`}
                        className={`train-wagon ${ghost ? 'ghost' : 'hooked'} ${!ghost && card === lastHooked ? 'new' : ''} ${!ghost && card === wrongCard ? 'moved' : ''}`}
                        aria-label={ghost ? l({ eu: 'Hemen lotuko da', es: 'Aquí se engancharía', ar: 'هنا ستُربط' }) : cardText(card, separator)}
                    >
                        <span className="train-wagon-face"><CardFace card={card} separator={separator} /></span>
                    </span>
                ))}
            </div>

            {arriving && !outcome && (
                <div className="train-controls">
                    <button type="button" className="fraction-v2-secondary" aria-label={l({ eu: 'Ezkerrera', es: 'A la izquierda', ar: 'إلى اليسار' })} disabled={gap === 0} onClick={() => point((gap ?? 1) - 1)}>◀</button>
                    <button type="button" className="fraction-v2-primary" disabled={gap === null} onClick={hook}>{l({ eu: 'Lotu', es: 'Enganchar', ar: 'اربط' })}</button>
                    <button type="button" className="fraction-v2-secondary" aria-label={l({ eu: 'Eskuinera', es: 'A la derecha', ar: 'إلى اليمين' })} disabled={gap === hooked.length} onClick={() => point((gap ?? -1) + 1)}>▶</button>
                </div>
            )}
            {arriving && !outcome && gap === null && <p className="train-tip">{l({ eu: 'Sakatu trenean, bagoia non doan.', es: 'Toca en el tren dónde va el vagón.', ar: 'اضغط على القطار حيث تذهب العربة.' })}</p>}

            {outcome?.kind === 'wrong' && (
                <div className="train-explain" role="status">
                    <p>
                        <strong>{l({ eu: 'Ez zen hor.', es: 'No iba ahí.', ar: 'ليس مكانها هناك.' })}</strong>{' '}
                        {outcome.cardIsLarger
                            ? l({ eu: `Eskuinerago doa: ${cardText(outcome.card, separator)} handiagoa da ${cardText(outcome.neighbour, separator)} baino.`, es: `Va más a la derecha: ${cardText(outcome.card, separator)} es mayor que ${cardText(outcome.neighbour, separator)}.`, ar: `مكانها إلى اليمين: ${ltr(cardText(outcome.card, separator))} أكبر من ${ltr(cardText(outcome.neighbour, separator))}.` })
                            : l({ eu: `Ezkerrerago doa: ${cardText(outcome.card, separator)} txikiagoa da ${cardText(outcome.neighbour, separator)} baino.`, es: `Va más a la izquierda: ${cardText(outcome.card, separator)} es menor que ${cardText(outcome.neighbour, separator)}.`, ar: `مكانها إلى اليسار: ${ltr(cardText(outcome.card, separator))} أصغر من ${ltr(cardText(outcome.neighbour, separator))}.` })}
                    </p>
                    <p className="train-compare" dir="ltr">
                        <MathText inline text={`$${(outcome.cardIsLarger ? compareLatex(outcome.card, outcome.neighbour, separator) : compareLatex(outcome.neighbour, outcome.card, separator)).replaceAll('\\frac', '\\dfrac')}$`} />
                    </p>
                    <button type="button" className="fraction-v2-primary" onClick={afterWrong} ref={(node) => node?.focus({ preventScroll: true })}>
                        {arrival >= TRAIN_ARRIVALS ? l({ eu: 'Ados', es: 'Entendido', ar: 'حسنًا' }) : l({ eu: 'Hurrengo bagoia', es: 'Siguiente vagón', ar: 'العربة التالية' })}
                    </button>
                </div>
            )}

            {trainDone && !outcome && (
                <div className="train-done" role="status">
                    <p><strong>{l({ eu: 'Trena osatuta!', es: '¡Tren completo!', ar: 'اكتمل القطار!' })}</strong> {l({ eu: 'Txikienetik handienera doa.', es: 'Va de menor a mayor.', ar: 'إنه من الأصغر إلى الأكبر.' })}</p>
                    <button type="button" className="fraction-v2-primary" onClick={nextTrain} ref={(node) => node?.focus({ preventScroll: true })}>
                        {trainIndex + 1 >= TRAINS_PER_LEVEL ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengo trena', es: 'Siguiente tren', ar: 'القطار التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
