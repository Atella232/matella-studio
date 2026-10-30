import { useRef, useState, type CSSProperties } from 'react'
import { MathText } from '../../../components/MathText'
import { add, fraction, type FractionValue } from '../math/fraction'
import { GameTopbar, LevelPicker, ResultPanel } from './GameKit'
import { useGameText } from './gameHooks'
import type { GameProps } from './index'
import { createRandom, randomSeed } from './random'
import { games } from './records'
import {
    BALANCE_MAX_SCORE,
    BALANCE_ROUNDS,
    BALANCE_STARS,
    BALANCE_WEIGHINGS,
    balancePoints,
    balanceStars,
    createBalanceRounds,
    roundDenominator,
    sumParts,
    weigh,
    type BalanceLevel,
    type BalanceRound,
    type Weighing
} from './balance'
import './Balance.css'

const game = games.find((item) => item.id === 'balance')!

const latex = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `\\frac{${value.numerator}}{${value.denominator}}`)
const plain = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `${value.numerator}/${value.denominator}`)
/** In Arabic, numbers and arithmetic keep their left-to-right order (LRI … PDI) */
const ltr = (text: string) => `\u2066${text}\u2069`

/** A fraction written stacked, as on the weights */
function Stacked({ value }: { value: FractionValue }) {
    if (value.denominator === 1) return <span className="balance-frac whole" aria-hidden="true">{value.numerator}</span>
    return <span className="balance-frac" aria-hidden="true"><span>{value.numerator}</span><span>{value.denominator}</span></span>
}

/** A weight on a pan: a block with a handle; all weights look the same size, so only the numbers tell what they weigh */
function Weight({ value, tone }: { value: FractionValue; tone: 'loaded' | 'fixed' | 'mine' | 'solution' }) {
    return <span className={`balance-weight ${tone}`} role="img" aria-label={plain(value)}><Stacked value={value} /></span>
}

/** A pan's sum written as pieces that can wrap, its fractions full size (\\displaystyle would clash with MathText's «le» shorthand) */
function Sum({ parts }: { parts: string[] }) {
    return (
        <span className="balance-sum" dir="ltr">
            {parts.map((part, index) => (
                <span key={index} className="balance-sum-piece">
                    {index > 0 && <MathText inline text="$=$" />}
                    <MathText inline text={`$${part.replaceAll('\\frac', '\\dfrac')}$`} />
                </span>
            ))}
        </span>
    )
}

interface LoggedWeighing {
    chosen: number[]
    result: Weighing
}

export function BalanceGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState<BalanceLevel>(0)
    const [rounds, setRounds] = useState<BalanceRound[]>([])
    const [index, setIndex] = useState(0)
    const [chosen, setChosen] = useState<number[]>([])
    /** Every weighing of the round: what was on the pan and what the scale said */
    const [log, setLog] = useState<LoggedWeighing[]>([])
    /** The last weighing, while the pan has not changed since */
    const [result, setResult] = useState<Weighing | null>(null)
    const [score, setScore] = useState(0)
    const [balancedRounds, setBalancedRounds] = useState(0)
    /** After a round without balance: the solution put on the scale */
    const [showSolution, setShowSolution] = useState(false)
    const scaleRef = useRef<HTMLDivElement>(null)
    const questionRef = useRef<HTMLParagraphElement>(null)
    const explainRef = useRef<HTMLDivElement>(null)

    const round = rounds[index]
    const weighings = log.length
    const done = result === 'balanced' || weighings >= BALANCE_WEIGHINGS

    const start = (nextLevel: number) => {
        setLevel(nextLevel as BalanceLevel)
        setRounds(createBalanceRounds(createRandom(randomSeed()), nextLevel as BalanceLevel))
        setIndex(0)
        setChosen([])
        setLog([])
        setResult(null)
        setScore(0)
        setBalancedRounds(0)
        setShowSolution(false)
        setPhase('playing')
    }

    const toggle = (trayIndex: number) => {
        if (done) return
        setChosen((current) => (current.includes(trayIndex) ? current.filter((item) => item !== trayIndex) : [...current, trayIndex]))
        setResult(null)
    }

    const weighNow = () => {
        if (done || result !== null || chosen.length === 0) return
        const outcome = weigh(round, chosen)
        const count = weighings + 1
        setLog((current) => [...current, { chosen, result: outcome }])
        setResult(outcome)
        if (outcome === 'balanced') {
            setScore((total) => total + balancePoints(count))
            setBalancedRounds((total) => total + 1)
        }
        if (outcome === 'balanced' || count >= BALANCE_WEIGHINGS) {
            // Bring the explanation into view once it is drawn
            requestAnimationFrame(() => explainRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }))
        }
    }

    const next = () => {
        if (index + 1 >= BALANCE_ROUNDS) {
            onResult(level, { stars: balanceStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setChosen([])
        setLog([])
        setResult(null)
        setShowSolution(false)
        requestAnimationFrame(() => questionRef.current?.focus())
    }

    const starsText = l({
        eu: `3 izar: ${BALANCE_STARS.three} puntu · 2: ${BALANCE_STARS.two} · 1: ${BALANCE_STARS.one}.`,
        es: `3 estrellas: ${BALANCE_STARS.three} puntos · 2: ${BALANCE_STARS.two} · 1: ${BALANCE_STARS.one}.`,
        en: `3 stars: ${BALANCE_STARS.three} points · 2: ${BALANCE_STARS.two} · 1: ${BALANCE_STARS.one}.`,
        ar: `3 نجوم: ${BALANCE_STARS.three} نقطة · 2: ${BALANCE_STARS.two} · 1: ${BALANCE_STARS.one}.`
    })
    const outOf = (value: number, total: number) => (language === 'ar' ? ltr(`${value} / ${total}`) : `${value} / ${total}`)
    /** «+3 puntos», with the Arabic forms for one and two */
    const pointsText = (points: number) => l({
        eu: `+${points} puntu`,
        es: `+${points} ${points === 1 ? 'punto' : 'puntos'}`,
        en: `+${points} ${points === 1 ? 'point' : 'points'}`,
        ar: points === 1 ? '+نقطة واحدة' : points === 2 ? '+نقطتان' : `+${ltr(String(points))} نقاط`
    })

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'أفضل نتيجة' })}: ${outOf(record.score, BALANCE_MAX_SCORE)}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${BALANCE_ROUNDS} txanda maila bakoitzean. Jarri pisuak zure platerean, bi platerek pisu bera izan arte.`, es: `${BALANCE_ROUNDS} rondas por nivel. Pon pesas en tu platillo hasta que pese lo mismo que el otro.`, en: `${BALANCE_ROUNDS} rounds per level. Put weights on your pan until it weighs the same as the other one.`, ar: `${BALANCE_ROUNDS} جولات في كل مستوى. ضع أثقالًا في كفّتك حتى تزن مثل الكفة الأخرى.` })}</li>
                        <li>{l({ eu: 'Balantza «Pisatu» sakatzean bakarrik mugitzen da, eta hiru pisaketa dituzu txanda bakoitzean: lehenengoan orekatuz gero, 3 puntu; bigarrenean, 2; hirugarrenean, 1.', es: 'La balanza solo se mueve al pulsar «Pesar», y tienes tres pesadas por ronda: equilibrio a la primera, 3 puntos; a la segunda, 2; a la tercera, 1.', en: 'The scale only moves when you press ‘Weigh’, and you have three weighings per round: balanced at the first, 3 points; at the second, 2; at the third, 1.', ar: 'لا يتحرك الميزان إلا عند الضغط على «زِن»، ولديك ثلاث وزنات في كل جولة: إن توازن من المرة الأولى فلك 3 نقاط، ومن الثانية نقطتان، ومن الثالثة نقطة واحدة.' })}</li>
                        <li>{l({ eu: 'Pisu guztiak berdinak dira itxuraz: zenbakiek bakarrik esaten dute zenbat pisatzen duten.', es: 'Todas las pesas parecen iguales: solo los números dicen cuánto pesan.', en: 'All the weights look the same: only the numbers tell you how much they weigh.', ar: 'كل الأثقال متشابهة في الشكل: الأرقام وحدها تقول كم تزن.' })}</li>
                        <li>{starsText}</li>
                    </ul>
                )}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="balance-game" data-stage={game.levels[level].stage}>
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={balanceStars(score)}
                    title={outOf(score, BALANCE_MAX_SCORE)}
                    subtitle={starsText}
                    stats={[
                        { label: l({ eu: 'Puntuak', es: 'Puntos', en: 'Points', ar: 'النقاط' }), value: outOf(score, BALANCE_MAX_SCORE) },
                        { label: l({ eu: 'Orekatutako txandak', es: 'Rondas equilibradas', en: 'Balanced rounds', ar: 'جولات متوازنة' }), value: outOf(balancedRounds, BALANCE_ROUNDS) }
                    ]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    // Only while a level is being set up
    if (!round) return <></>

    const tilt = showSolution ? 0 : result === 'lighter' ? -8 : result === 'heavier' ? 8 : 0
    // The weights on the learner's pan: theirs, or the solution once shown
    const onPan = showSolution ? round.solution : chosen
    const shownResult: Weighing | null = showSolution ? 'balanced' : result
    const leftValues = round.left
    const rightValues = [...round.right, ...chosen.map((trayIndex) => round.tray[trayIndex])]
    const solutionValues = [...round.right, ...round.solution.map((trayIndex) => round.tray[trayIndex])]
    const remaining = BALANCE_WEIGHINGS - weighings
    const balanced = result === 'balanced'
    // Both pans over one denominator: the learner's pan when it balanced, the solution when it did not
    const denominator = roundDenominator(round, balanced ? chosen : round.solution)

    const question = [
        { eu: 'Jarri pisuak zure platerean, bi platerek pisu bera izan arte.', es: 'Pon pesas en tu platillo hasta que pese lo mismo que el otro.', en: 'Put weights on your pan until it weighs the same as the other one.', ar: 'ضع أثقالًا في كفّتك حتى تزن مثل الكفة الأخرى.' },
        { eu: 'Zenbat pisatzen dute bi pisuek batera? Orekatu balantza.', es: '¿Cuánto pesan las dos pesas juntas? Equilibra la balanza.', en: 'How much do the two weights weigh together? Balance the scale.', ar: 'كم يزن الثقلان معًا؟ وازن الميزان.' },
        { eu: 'Zure platerean pisu bat dago jada. Gehitu falta dena.', es: 'Tu platillo ya tiene una pesa. Añade lo que falta.', en: 'Your pan already has a weight. Add what is missing.', ar: 'في كفّتك ثقل بالفعل. أضف ما ينقص.' }
    ][level]

    const verdict: Record<Weighing, { eu: string; es: string; en: string; ar: string }> = {
        lighter: { eu: 'Zure platerak gutxiago pisatzen du.', es: 'Tu platillo pesa menos.', en: 'Your pan weighs less.', ar: 'كفّتك أخفّ.' },
        heavier: { eu: 'Zure platerak gehiago pisatzen du.', es: 'Tu platillo pesa más.', en: 'Your pan weighs more.', ar: 'كفّتك أثقل.' },
        balanced: { eu: 'Oreka!', es: '¡Equilibrio!', en: 'Balanced!', ar: 'توازن!' }
    }
    const shortVerdict: Record<Weighing, { eu: string; es: string; en: string; ar: string }> = {
        lighter: { eu: 'arinagoa', es: 'pesa menos', en: 'weighs less', ar: 'أخفّ' },
        heavier: { eu: 'astunagoa', es: 'pesa más', en: 'weighs more', ar: 'أثقل' },
        balanced: { eu: 'oreka', es: 'equilibrio', en: 'balance', ar: 'توازن' }
    }

    return (
        <div className="balance-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span><bdi dir="ltr">{index + 1} / {BALANCE_ROUNDS}</bdi></span>
                <span>{l({ eu: 'Puntuak', es: 'Puntos', en: 'Points', ar: 'النقاط' })}: <strong><bdi dir="ltr">{score}</bdi></strong></span>
            </GameTopbar>

            <p className="balance-question" ref={questionRef} tabIndex={-1}>{l(question)}</p>

            <div className={`balance-scale ${shownResult ?? 'locked'}`} style={{ '--tilt': `${tilt}deg` } as CSSProperties} dir="ltr" ref={scaleRef}>
                <span className="balance-stand" aria-hidden="true" />
                <div className="balance-beam">
                    <div className="balance-hanger left">
                        <svg className="balance-strings" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M50 0 L6 30 M50 0 L94 30" vectorEffect="non-scaling-stroke" /></svg>
                        <div className="balance-pan" role="group" aria-label={l({ eu: 'Kargatutako platera', es: 'Platillo cargado', en: 'Loaded pan', ar: 'الكفة المحمّلة' })}>
                            {leftValues.map((value, valueIndex) => <Weight key={valueIndex} value={value} tone="loaded" />)}
                        </div>
                        <span className="balance-caption">{l({ eu: 'Kargatuta', es: 'Cargado', en: 'Loaded', ar: 'المحمّلة' })}</span>
                    </div>
                    <div className="balance-hanger right">
                        <svg className="balance-strings" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M50 0 L6 30 M50 0 L94 30" vectorEffect="non-scaling-stroke" /></svg>
                        <div className="balance-pan" role="group" aria-label={l({ eu: 'Zure platera', es: 'Tu platillo', en: 'Your pan', ar: 'كفّتك' })}>
                            {round.right.map((value, valueIndex) => <Weight key={`fixed-${valueIndex}`} value={value} tone="fixed" />)}
                            {onPan.map((trayIndex) => <Weight key={`${showSolution ? 'solution' : 'mine'}-${trayIndex}`} value={round.tray[trayIndex]} tone={showSolution ? 'solution' : 'mine'} />)}
                            {round.right.length + onPan.length === 0 && <span className="balance-empty">{l({ eu: 'hutsik', es: 'vacío', en: 'Empty', ar: 'فارغة' })}</span>}
                        </div>
                        <span className="balance-caption mine">{l({ eu: 'Zurea', es: 'El tuyo', en: 'Yours', ar: 'كفّتك' })}</span>
                    </div>
                </div>
                <span className={`balance-dial ${shownResult ?? 'locked'}`} aria-hidden="true">{shownResult === 'balanced' ? '=' : shownResult === 'lighter' ? '>' : shownResult === 'heavier' ? '<' : '?'}</span>
            </div>

            <div className="balance-status">
                <span className="balance-weighings" aria-hidden="true">
                    {Array.from({ length: BALANCE_WEIGHINGS }, (_, item) => <i key={item} className={item < weighings ? 'used' : ''} />)}
                </span>
                <span className="balance-left">{l({ eu: `Geratzen diren pisaketak: ${remaining}`, es: `Pesadas que quedan: ${remaining}`, en: `Weighings left: ${remaining}`, ar: `الوزنات الباقية: ${remaining}` })}</span>
                <strong className={`balance-verdict ${shownResult ?? ''}`} role="status">
                    {showSolution
                        ? l({ eu: 'Soluzioarekin, orekan.', es: 'Con la solución, en equilibrio.', en: 'Balanced with the solution.', ar: 'مع الحل يتوازن الميزان.' })
                        : result ? l(verdict[result]) : ''}
                </strong>
            </div>

            {log.length > 0 && (
                <ol className="balance-log" aria-label={l({ eu: 'Pisaketen koadernoa', es: 'Cuaderno de pesadas', en: 'Weighing notebook', ar: 'دفتر الوزنات' })}>
                    {log.map((entry, entryIndex) => (
                        <li key={entryIndex} className={entry.result}>
                            <span className="balance-log-number">{entryIndex + 1}</span>
                            <bdi dir="ltr" className="balance-log-weights">{[...round.right, ...entry.chosen.map((trayIndex) => round.tray[trayIndex])].map(plain).join(' + ')}</bdi>
                            <span className="balance-log-result">{l(shortVerdict[entry.result])}</span>
                        </li>
                    ))}
                </ol>
            )}

            {!done && (
                <>
                    <div className="balance-tray" role="group" aria-label={l({ eu: 'Pisu erabilgarriak', es: 'Pesas disponibles', en: 'Available weights', ar: 'الأثقال المتاحة' })}>
                        {round.tray.map((value, trayIndex) => {
                            const onPan = chosen.includes(trayIndex)
                            return (
                                <button
                                    type="button"
                                    key={trayIndex}
                                    className={`balance-weight tray ${onPan ? 'on-pan' : ''}`}
                                    aria-pressed={onPan}
                                    aria-label={`${plain(value)}: ${onPan ? l({ eu: 'zure platerean dago; sakatu kentzeko', es: 'está en tu platillo; toca para quitarla', en: 'is on your pan; tap to remove it', ar: 'في كفّتك؛ اضغط لإزالته' }) : l({ eu: 'sakatu zure platerean jartzeko', es: 'toca para ponerla en tu platillo', en: 'tap to put it on your pan', ar: 'اضغط لتضعه في كفّتك' })}`}
                                    onClick={() => toggle(trayIndex)}
                                >
                                    <Stacked value={value} />
                                </button>
                            )
                        })}
                    </div>
                    <button type="button" className="fraction-v2-primary balance-weigh" disabled={result !== null || chosen.length === 0} onClick={weighNow}>
                        {l({ eu: 'Pisatu', es: 'Pesar', en: 'Weigh', ar: 'زِن' })}
                    </button>
                    <p className="balance-tip">{l({ eu: 'Sakatu erretiluko pisu bat zure platerean jartzeko; sakatu berriro kentzeko.', es: 'Toca una pesa de la bandeja para ponerla en tu platillo; tócala otra vez para quitarla.', en: 'Tap a weight from the tray to put it on your pan; tap it again to remove it.', ar: 'اضغط على ثقل لتضعه في كفّتك، واضغط عليه مرة أخرى لتزيله.' })}</p>
                </>
            )}

            {done && (
                <div className={`balance-explain ${balanced ? 'right' : 'wrong'}`} ref={explainRef}>
                    <p>
                        <strong>{balanced ? `${l({ eu: 'Oreka!', es: '¡Equilibrio!', en: 'Balanced!', ar: 'توازن!' })} ${pointsText(balancePoints(weighings))}` : l({ eu: 'Pisaketak amaitu dira.', es: 'Se acabaron las pesadas.', en: 'You have run out of weighings.', ar: 'انتهت الوزنات.' })}</strong>{' '}
                        {balanced
                            ? l({ eu: 'Bi platerek berdin pisatzen dute:', es: 'Los dos platillos pesan lo mismo:', en: 'Both pans weigh the same:', ar: 'الكفتان متساويتان في الوزن:' })
                            : l({ eu: 'Honela orekatuko zen:', es: 'Así se equilibraba:', en: 'This is how it balanced:', ar: 'هكذا كان يمكن أن تتوازن الكفتان:' })}
                    </p>
                    <ul className="balance-sums">
                        <li><Sum parts={sumParts(leftValues, denominator)} /></li>
                        <li><Sum parts={sumParts(balanced ? rightValues : solutionValues, denominator)} /></li>
                    </ul>
                    {!balanced && !showSolution && (
                        <button
                            type="button"
                            className="fraction-v2-secondary balance-show"
                            onClick={() => {
                                setShowSolution(true)
                                requestAnimationFrame(() => scaleRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }))
                            }}
                        >
                            {l({ eu: 'Erakutsi balantzan', es: 'Muéstramelo en la balanza', en: 'Show it on the scale', ar: 'أرني ذلك على الميزان' })}
                        </button>
                    )}
                    {!balanced && rightValues.length > 0 && (
                        <p className="balance-yours">
                            {l({ eu: 'Zure platerean:', es: 'En tu platillo había:', en: 'Your pan had:', ar: 'كان في كفّتك:' })}{' '}
                            <bdi dir="ltr"><MathText inline text={`$${latex(rightValues.reduce((total, value) => add(total, value), fraction(0)))}$`} /></bdi>
                        </p>
                    )}
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= BALANCE_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
