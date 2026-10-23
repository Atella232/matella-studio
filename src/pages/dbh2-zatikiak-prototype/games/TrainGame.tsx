import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from './GameKit'
import { useGameText } from './gameHooks'
import type { GameProps } from './index'
import { createRandom, randomSeed } from './random'
import { games } from './records'
import {
    brokenNeighbour,
    cardChain,
    cardLatex,
    cardText,
    commonOf,
    createTrains,
    fittingGaps,
    fits,
    hookAt,
    overCommon,
    TRAIN_ARRIVALS,
    TRAIN_MAX_SCORE,
    TRAIN_STARS,
    TRAINS_PER_LEVEL,
    trainStars,
    type Train,
    type TrainCard,
    type TrainLevel
} from './train'
import './Train.css'

const game = games.find((item) => item.id === 'train')!

/** The stretch of the number line under the train, for each level */
const LINE_RANGES: Array<[number, number]> = [[0, 2], [0, 3], [-2, 2]]

/** In Arabic, numbers and arithmetic keep their left-to-right order (LRI … PDI) */
const ltr = (text: string) => `⁦${text}⁩`

type Outcome = { kind: 'right' } | { kind: 'wrong'; neighbour: TrainCard; cardIsLarger: boolean; card: TrainCard; between: [TrainCard | null, TrainCard | null] } | null

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
    /** The explanation's button only works a moment after it appears, so a double tap cannot skip it */
    const [armed, setArmed] = useState(false)
    const [score, setScore] = useState(0)
    /** The wagon that has just been hooked, to animate it and mark it on the line */
    const [lastHooked, setLastHooked] = useState<TrainCard | null>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const ghostRef = useRef<HTMLSpanElement>(null)
    const timer = useRef<number | undefined>(undefined)

    const train = trains[trainIndex]
    const arriving = train && arrival <= TRAIN_ARRIVALS ? train.cards[arrival] : null
    const trainDone = train !== undefined && arrival > TRAIN_ARRIVALS
    const choosing = arriving !== null && outcome?.kind !== 'wrong'
    /** A wagon's place in its train: a key that does not change when wagons move */
    const wagonId = (card: TrainCard) => `${trainIndex}-${train?.cards.indexOf(card)}`

    useEffect(() => () => window.clearTimeout(timer.current), [])

    // Keep the space where the wagon would go in view on narrow screens
    useEffect(() => {
        ghostRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }, [gap])

    useEffect(() => {
        if (outcome?.kind !== 'wrong') return
        const id = window.setTimeout(() => setArmed(true), 450)
        return () => window.clearTimeout(id)
    }, [outcome])

    const focusTrack = () => requestAnimationFrame(() => trackRef.current?.focus({ preventScroll: true }))

    const startTrain = (target: Train) => {
        setHooked([target.cards[0]])
        setArrival(1)
        setGap(null)
        setOutcome(null)
        setLastHooked(target.cards[0])
        focusTrack()
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
        if (!choosing) return
        setGap(Math.max(0, Math.min(hooked.length, next)))
    }

    /** A tap on the track points at the gap between the wagons around it */
    const onTrackClick = (event: MouseEvent<HTMLDivElement>) => {
        if (!choosing || !trackRef.current) return
        const centres = [...trackRef.current.querySelectorAll<HTMLElement>('.train-wagon.hooked')].map((wagon) => {
            const box = wagon.getBoundingClientRect()
            return box.left + box.width / 2
        })
        point(centres.filter((centre) => centre < event.clientX).length)
    }

    const onTrackKey = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!choosing) return
        if (event.key === 'Enter' && gap !== null) {
            event.preventDefault()
            hook()
            return
        }
        const moves: Record<string, number> = {
            ArrowLeft: gap === null ? hooked.length : gap - 1,
            ArrowRight: gap === null ? 0 : gap + 1,
            Home: 0,
            End: hooked.length
        }
        if (!(event.key in moves)) return
        event.preventDefault()
        point(moves[event.key])
    }

    const hook = () => {
        if (!arriving || gap === null || !choosing) return
        if (fits(hooked, arriving, gap)) {
            setScore((total) => total + 1)
            setHooked(hookAt(hooked, arriving, gap))
            setLastHooked(arriving)
            setOutcome({ kind: 'right' })
            setGap(null)
            setArrival((index) => index + 1)
            window.clearTimeout(timer.current)
            // A right wagon needs no reading: the message goes after a moment
            timer.current = window.setTimeout(() => setOutcome((current) => (current?.kind === 'right' ? null : current)), 1200)
            focusTrack()
            return
        }
        const broken = brokenNeighbour(hooked, arriving, gap)!
        const place = fittingGaps(hooked, arriving).first
        setHooked(hookAt(hooked, arriving, place))
        setLastHooked(arriving)
        setArmed(false)
        setOutcome({ kind: 'wrong', card: arriving, ...broken, between: [hooked[place - 1] ?? null, hooked[place] ?? null] })
        setGap(null)
    }

    const afterWrong = () => {
        if (!armed) return
        setOutcome(null)
        setArrival((index) => index + 1)
        if (arrival < TRAIN_ARRIVALS) focusTrack()
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
        eu: `3 izar: ${TRAIN_STARS.three} bagoi · 2: ${TRAIN_STARS.two} · 1: ${TRAIN_STARS.one}.`,
        es: `3 estrellas: ${TRAIN_STARS.three} vagones · 2: ${TRAIN_STARS.two} · 1: ${TRAIN_STARS.one}.`,
        ar: `3 نجوم: ${TRAIN_STARS.three} عربات · 2: ${TRAIN_STARS.two} · 1: ${TRAIN_STARS.one}.`
    })
    const say = (card: TrainCard) => (language === 'ar' ? ltr(cardText(card, separator)) : cardText(card, separator))

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
                        <li>{l({ eu: `${TRAINS_PER_LEVEL} tren maila bakoitzean, ${TRAIN_ARRIVALS} bagoi iristen dira tren bakoitzera.`, es: `${TRAINS_PER_LEVEL} trenes por nivel; a cada tren le llegan ${TRAIN_ARRIVALS} vagones.`, ar: `قطاران في كل مستوى، ويصل إلى كل قطار ${TRAIN_ARRIVALS} عربات.` })}</li>
                        <li>{l({ eu: 'Sakatu trenean bagoia non doan, eta gero «Lotu». Lehen saiakeran ondo lotutako bagoi bakoitzak puntu bat ematen du.', es: 'Toca en el tren dónde va el vagón y después «Enganchar». Cada vagón bien enganchado a la primera vale un punto.', ar: 'اضغط على القطار حيث تذهب العربة ثم «اربط». كل عربة ربطتَها في مكانها الصحيح من المحاولة الأولى بنقطة.' })}</li>
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
                    stats={[
                        { label: l({ eu: 'Lehen saiakeran', es: 'A la primera', ar: 'من المحاولة الأولى' }), value: outOf(score, TRAIN_MAX_SCORE) },
                        { label: l({ eu: 'Lekuz aldatutakoak', es: 'Recolocados', ar: 'أُعيد وضعها' }), value: outOf(TRAIN_MAX_SCORE - score, TRAIN_MAX_SCORE) }
                    ]}
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
    if (arriving && gap !== null && choosing) slots.splice(gap, 0, { card: arriving, ghost: true })
    const wrongCard = outcome?.kind === 'wrong' ? outcome.card : null

    /** Where the open space is, said in words: for screen readers and under the track */
    const gapWords = (() => {
        if (gap === null) return ''
        const before = hooked[gap - 1]
        const after = hooked[gap]
        if (!before) return l({ eu: `Hasieran, ${say(after)} baino lehen`, es: `Al principio, antes de ${say(after)}`, ar: `في البداية، قبل ${say(after)}` })
        if (!after) return l({ eu: `Amaieran, ${say(before)} ondoren`, es: `Al final, después de ${say(before)}`, ar: `في النهاية، بعد ${say(before)}` })
        return l({ eu: `${say(before)} eta ${say(after)} artean`, es: `Entre ${say(before)} y ${say(after)}`, ar: `بين ${say(before)} و${say(after)}` })
    })()

    // The number line under the train: one dot per hooked wagon
    const [lineLow, lineHigh] = LINE_RANGES[level]
    const linePosition = (card: TrainCard) => `${((card.value.numerator / card.value.denominator - lineLow) / (lineHigh - lineLow)) * 100}%`
    const wholes = Array.from({ length: lineHigh - lineLow + 1 }, (_, index) => lineLow + index)

    return (
        <div className="train-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{l({ eu: 'Trena', es: 'Tren', ar: 'القطار' })} <bdi dir="ltr">{trainIndex + 1} / {TRAINS_PER_LEVEL}</bdi></span>
                <span>{l({ eu: 'Puntuak', es: 'Puntos', ar: 'النقاط' })}: <strong><bdi dir="ltr">{score}</bdi></strong></span>
            </GameTopbar>

            <div className="train-platform" aria-live="polite">
                {arriving && choosing && (
                    <>
                        <span className={`train-platform-label ${outcome?.kind === 'right' ? 'right' : ''}`}>
                            {outcome?.kind === 'right'
                                ? l({ eu: 'Ondo lotuta! Beste bat dator:', es: '¡Bien enganchado! Llega otro:', ar: 'رُبطت في مكانها! وتصل أخرى:' })
                                : l({ eu: 'Bagoi hau iritsi da:', es: 'Llega este vagón:', ar: 'وصلت هذه العربة:' })}
                        </span>
                        <span className="train-wagon arriving" dir="ltr" key={`arriving-${trainIndex}-${arrival}`} role="img" aria-label={cardText(arriving, separator)}>
                            <span className="train-wagon-face"><CardFace card={arriving} separator={separator} /></span>
                        </span>
                        <span className="train-count">{l({ eu: `Bagoia: ${arrival} / ${TRAIN_ARRIVALS}`, es: `Vagón ${arrival} de ${TRAIN_ARRIVALS}`, ar: `العربة ${arrival} من ${TRAIN_ARRIVALS}` })}</span>
                    </>
                )}
                {outcome?.kind === 'right' && !arriving && <strong className="train-right">{l({ eu: 'Ondo lotuta!', es: '¡Bien enganchado!', ar: 'رُبطت في مكانها!' })}</strong>}
                {outcome?.kind === 'wrong' && <strong className="train-wrong">{l({ eu: 'Ez doa hor.', es: 'Ahí no va.', ar: 'ليس هذا مكانها.' })}</strong>}
            </div>

            <p className="train-direction" aria-hidden="true">
                <span>{l({ eu: 'txikiena', es: 'menor', ar: 'الأصغر' })}</span>
                <span className="train-direction-arrow" />
                <span>{l({ eu: 'handiena', es: 'mayor', ar: 'الأكبر' })}</span>
            </p>

            <div
                className={`train-track ${trainDone && !outcome ? 'departing' : ''}`}
                dir="ltr"
                ref={trackRef}
                tabIndex={choosing ? 0 : -1}
                role="group"
                aria-label={l({ eu: 'Trena: sakatu bagoia non doan; geziekin ere bai', es: 'Tren: toca dónde va el vagón; también con las flechas', ar: 'القطار: اضغط حيث تذهب العربة؛ أو استعمل الأسهم' })}
                onClick={onTrackClick}
                onKeyDown={onTrackKey}
            >
                <span className="train-engine" aria-hidden="true">
                    <svg viewBox="0 0 48 40"><path d="M4 30 V14 H18 V6 H30 V14 H44 V30 Z" fill="var(--coral)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" /><rect x="21" y="9" width="6" height="6" fill="#fffcf6" stroke="var(--ink)" strokeWidth="1.5" /><circle cx="13" cy="33" r="5" fill="var(--ink)" /><circle cx="35" cy="33" r="5" fill="var(--ink)" /></svg>
                </span>
                {slots.map(({ card, ghost }) => (
                    <span
                        key={ghost ? 'ghost' : wagonId(card)}
                        ref={ghost ? ghostRef : undefined}
                        className={`train-wagon ${ghost ? 'ghost' : 'hooked'} ${!ghost && card === lastHooked ? 'new' : ''} ${!ghost && card === wrongCard ? 'moved' : ''} ${card.form === 'decimal' && cardText(card, separator).length > 4 ? 'long' : ''}`}
                        role="img"
                        aria-label={ghost ? gapWords : cardText(card, separator)}
                    >
                        <span className="train-wagon-face"><CardFace card={card} separator={separator} /></span>
                    </span>
                ))}
            </div>

            <div className="train-line" dir="ltr" aria-hidden="true">
                <span className="train-line-axis" />
                {wholes.map((whole) => (
                    <span className="train-line-tick" style={{ left: `${((whole - lineLow) / (lineHigh - lineLow)) * 100}%` }} key={whole}>
                        <span>{whole < 0 ? `−${-whole}` : whole}</span>
                    </span>
                ))}
                {hooked.map((card) => (
                    <span key={wagonId(card)} className={`train-line-dot ${card === lastHooked ? 'last' : ''}`} style={{ left: linePosition(card) }}>
                        {card === lastHooked && <span className="train-line-label"><CardFace card={card} separator={separator} /></span>}
                    </span>
                ))}
            </div>

            {choosing && (
                <>
                    <p className="train-gap" aria-live="polite">{gap === null ? l({ eu: 'Sakatu trenean, bagoia non doan.', es: 'Toca en el tren dónde va el vagón.', ar: 'اضغط على القطار حيث تذهب العربة.' }) : gapWords}</p>
                    <div className="train-controls" dir="ltr">
                        <button type="button" className="fraction-v2-secondary" aria-label={l({ eu: 'Ezkerrera', es: 'A la izquierda', ar: 'إلى اليسار' })} disabled={gap === 0} onClick={() => point(gap === null ? hooked.length : gap - 1)}>◀</button>
                        <button type="button" className="fraction-v2-primary" disabled={gap === null} onClick={hook}>{l({ eu: 'Lotu', es: 'Enganchar', ar: 'اربط' })}</button>
                        <button type="button" className="fraction-v2-secondary" aria-label={l({ eu: 'Eskuinera', es: 'A la derecha', ar: 'إلى اليمين' })} disabled={gap === hooked.length} onClick={() => point(gap === null ? 0 : gap + 1)}>▶</button>
                    </div>
                </>
            )}

            {outcome?.kind === 'wrong' && (() => {
                const larger = outcome.cardIsLarger ? outcome.card : outcome.neighbour
                const smaller = outcome.cardIsLarger ? outcome.neighbour : outcome.card
                const common = commonOf(larger, smaller)
                const [before, after] = outcome.between
                return (
                    <div className="train-explain" id="train-explain">
                        <p>
                            {outcome.cardIsLarger
                                ? l({ eu: `Eskuinerago doa: ${say(outcome.card)} handiagoa da ${say(outcome.neighbour)} baino.`, es: `Va más a la derecha: ${say(outcome.card)} es mayor que ${say(outcome.neighbour)}.`, ar: `مكانها إلى اليمين: ${say(outcome.card)} أكبر من ${say(outcome.neighbour)}.` })
                                : l({ eu: `Ezkerrerago doa: ${say(outcome.card)} txikiagoa da ${say(outcome.neighbour)} baino.`, es: `Va más a la izquierda: ${say(outcome.card)} es menor que ${say(outcome.neighbour)}.`, ar: `مكانها إلى اليسار: ${say(outcome.card)} أصغر من ${say(outcome.neighbour)}.` })}
                            {larger.value.numerator < 0 && smaller.value.numerator < 0 && <> {l({ eu: 'Negatiboetan, zerotik hurbilen dagoena da handiena.', es: 'Entre negativos, el más cercano a 0 es el mayor.', ar: 'بين الأعداد السالبة، الأقرب إلى 0 هو الأكبر.' })}</>}
                        </p>
                        <div className="train-compare" dir="ltr">
                            <MathText inline text={`$${cardChain(larger, common, separator).replaceAll('\\frac', '\\dfrac')}$`} />
                            <MathText inline text={`$${cardChain(smaller, common, separator).replaceAll('\\frac', '\\dfrac')}$`} />
                            <MathText inline text={`$${overCommon(larger, common).replaceAll('\\frac', '\\dfrac')}${larger.value.numerator * smaller.value.denominator === smaller.value.numerator * larger.value.denominator ? '=' : '>'}${overCommon(smaller, common).replaceAll('\\frac', '\\dfrac')}$`} />
                        </div>
                        <p className="train-place">
                            {before && after
                                ? l({ eu: `Bere lekua: ${say(before)} eta ${say(after)} artean.`, es: `Su sitio: entre ${say(before)} y ${say(after)}.`, ar: `مكانها: بين ${say(before)} و${say(after)}.` })
                                : before
                                    ? l({ eu: `Bere lekua: amaieran, ${say(before)} ondoren.`, es: `Su sitio: al final, después de ${say(before)}.`, ar: `مكانها: في النهاية، بعد ${say(before)}.` })
                                    : after
                                        ? l({ eu: `Bere lekua: hasieran, ${say(after)} baino lehen.`, es: `Su sitio: al principio, antes de ${say(after)}.`, ar: `مكانها: في البداية، قبل ${say(after)}.` })
                                        : null}
                        </p>
                        <button type="button" className="fraction-v2-primary" aria-describedby="train-explain" aria-disabled={!armed} onClick={afterWrong} ref={(node) => node?.focus({ preventScroll: true })}>
                            {arrival >= TRAIN_ARRIVALS ? l({ eu: 'Ados', es: 'Entendido', ar: 'حسنًا' }) : l({ eu: 'Hurrengo bagoia', es: 'Siguiente vagón', ar: 'العربة التالية' })}
                        </button>
                    </div>
                )
            })()}

            {trainDone && !outcome && (
                <div className="train-done" role="status">
                    <p><strong>{l({ eu: 'Trena osatu duzu!', es: '¡Tren completo!', ar: 'اكتمل القطار!' })}</strong> {l({ eu: 'Txikienetik handienera doa.', es: 'Va de menor a mayor.', ar: 'إنه من الأصغر إلى الأكبر.' })}</p>
                    <button type="button" className="fraction-v2-primary" onClick={nextTrain} ref={(node) => node?.focus({ preventScroll: true })}>
                        {trainIndex + 1 >= TRAINS_PER_LEVEL ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengo trena', es: 'Siguiente tren', ar: 'القطار التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
