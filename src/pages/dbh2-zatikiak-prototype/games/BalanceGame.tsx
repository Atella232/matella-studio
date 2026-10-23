import { useState, type CSSProperties } from 'react'
import { MathText } from '../../../components/MathText'
import { add, fraction, gcd, toNumber, type FractionValue } from '../math/fraction'
import { GameTopbar, LevelPicker, ResultPanel } from './GameKit'
import { useGameText } from './gameHooks'
import type { GameProps } from './index'
import { createRandom, randomSeed } from './random'
import { games } from './records'
import {
    BALANCE_MAX_SCORE,
    BALANCE_ROUNDS,
    BALANCE_WEIGHINGS,
    balancePoints,
    balanceStars,
    createBalanceRounds,
    sumLatex,
    weigh,
    type BalanceLevel,
    type BalanceRound,
    type Weighing
} from './balance'
import './Balance.css'

const game = games.find((item) => item.id === 'balance')!

const latex = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `\\frac{${value.numerator}}{${value.denominator}}`)
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b

/** A weight: a little block whose size grows with what it weighs, its fraction written stacked */
function Weight({ value, tone, onClick, label }: { value: FractionValue; tone: 'loaded' | 'fixed' | 'mine' | 'tray'; onClick?: () => void; label?: string }) {
    const style = { '--size': `${Math.round(36 + 10 * Math.min(2.5, toNumber(value)))}px` } as CSSProperties
    const text = value.denominator === 1 ? String(value.numerator) : `${value.numerator}/${value.denominator}`
    const content = value.denominator === 1
        ? <span className="balance-frac whole" aria-hidden="true">{value.numerator}</span>
        : <span className="balance-frac" aria-hidden="true"><span>{value.numerator}</span><span>{value.denominator}</span></span>
    if (!onClick) return <span className={`balance-weight ${tone}`} style={style} role="img" aria-label={text}>{content}</span>
    return <button type="button" className={`balance-weight ${tone}`} style={style} onClick={onClick} aria-label={`${text}: ${label}`}>{content}</button>
}

export function BalanceGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState<BalanceLevel>(0)
    const [rounds, setRounds] = useState<BalanceRound[]>([])
    const [index, setIndex] = useState(0)
    const [chosen, setChosen] = useState<number[]>([])
    const [weighings, setWeighings] = useState(0)
    /** The last weighing, while the pan has not changed since */
    const [result, setResult] = useState<Weighing | null>(null)
    const [score, setScore] = useState(0)
    const [balancedRounds, setBalancedRounds] = useState(0)

    const round = rounds[index]
    const done = result === 'balanced' || weighings >= BALANCE_WEIGHINGS

    const start = (nextLevel: number) => {
        setLevel(nextLevel as BalanceLevel)
        setRounds(createBalanceRounds(createRandom(randomSeed()), nextLevel as BalanceLevel))
        setIndex(0)
        setChosen([])
        setWeighings(0)
        setResult(null)
        setScore(0)
        setBalancedRounds(0)
        setPhase('playing')
    }

    const toggle = (trayIndex: number) => {
        if (done) return
        setChosen((current) => (current.includes(trayIndex) ? current.filter((item) => item !== trayIndex) : [...current, trayIndex]))
        setResult(null)
    }

    const weighNow = () => {
        if (done || result !== null) return
        const outcome = weigh(round, chosen)
        const count = weighings + 1
        setWeighings(count)
        setResult(outcome)
        if (outcome === 'balanced') {
            setScore((total) => total + balancePoints(count))
            setBalancedRounds((total) => total + 1)
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
        setWeighings(0)
        setResult(null)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${record.score} / ${BALANCE_MAX_SCORE}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${BALANCE_ROUNDS} txanda maila bakoitzean. Jarri pisuak zure platerean, besteak bezainbeste pisatu arte.`, es: `${BALANCE_ROUNDS} rondas por nivel. Pon pesas en tu platillo hasta que pese lo mismo que el otro.`, ar: `${BALANCE_ROUNDS} جولات في كل مستوى. ضع أثقالًا في كفّتك حتى تزن مثل الكفة الأخرى.` })}</li>
                        <li>{l({ eu: 'Balantza «Pisatu» sakatzean bakarrik mugitzen da, eta hiru pisaketa dituzu txanda bakoitzean: lehenengoan orekatuz gero, 3 puntu; bigarrenean, 2; hirugarrenean, 1.', es: 'La balanza solo se mueve al pulsar «Pesar», y tienes tres pesadas por ronda: equilibrio a la primera, 3 puntos; a la segunda, 2; a la tercera, 1.', ar: 'لا يتحرك الميزان إلا عند الضغط على «زِن»، ولديك ثلاث وزنات في كل جولة: التوازن من الأولى 3 نقاط، ومن الثانية 2، ومن الثالثة 1.' })}</li>
                        <li>{l({ eu: '3 izar: 15 puntu · 2: 11 · 1: 7.', es: '3 estrellas: 15 puntos · 2: 11 · 1: 7.', ar: '3 نجوم: 15 نقطة · 2: 11 · 1: 7.' })}</li>
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
                    title={`${score} / ${BALANCE_MAX_SCORE}`}
                    subtitle={l({ eu: '3 izar: 15 · 2 izar: 11 · izar 1: 7', es: '3 estrellas: 15 · 2: 11 · 1: 7', ar: '3 نجوم: 15 · 2: 11 · 1: 7' })}
                    stats={[
                        { label: l({ eu: 'Puntuak', es: 'Puntos', ar: 'النقاط' }), value: `${score} / ${BALANCE_MAX_SCORE}` },
                        { label: l({ eu: 'Orekatuak', es: 'Equilibradas', ar: 'موزونة' }), value: `${balancedRounds} / ${BALANCE_ROUNDS}` }
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

    const tilt = result === 'lighter' ? -8 : result === 'heavier' ? 8 : 0
    const mine = chosen.map((trayIndex) => round.tray[trayIndex])
    const leftValues = round.left
    const rightValues = [...round.right, ...mine]
    const denominator = [...leftValues, ...rightValues].reduce((value, item) => lcm(value, item.denominator), 1)
    const solutionValues = [...round.right, ...round.solution.map((trayIndex) => round.tray[trayIndex])]
    const remaining = BALANCE_WEIGHINGS - weighings

    const question = [
        { eu: 'Jarri pisuak zure platerean, bestea bezainbeste pisatu arte.', es: 'Pon pesas en tu platillo hasta que pese lo mismo que el otro.', ar: 'ضع أثقالًا في كفّتك حتى تزن مثل الكفة الأخرى.' },
        { eu: 'Zenbat pisatzen dute bi pisuek batera? Orekatu balantza.', es: '¿Cuánto pesan las dos pesas juntas? Equilibra la balanza.', ar: 'كم يزن الثقلان معًا؟ وازن الميزان.' },
        { eu: 'Zure platerak badu pisu bat jada. Gehitu falta dena.', es: 'Tu platillo ya tiene una pesa. Añade lo que falta.', ar: 'في كفّتك ثقل من قبل. أضف ما ينقص.' }
    ][level]

    const verdict: Record<Weighing, { eu: string; es: string; ar: string }> = {
        lighter: { eu: 'Zure platerak gutxiago pisatzen du.', es: 'Tu platillo pesa menos.', ar: 'كفّتك أخفّ.' },
        heavier: { eu: 'Zure platerak gehiago pisatzen du.', es: 'Tu platillo pesa más.', ar: 'كفّتك أثقل.' },
        balanced: { eu: 'Oreka!', es: '¡Equilibrio!', ar: 'توازن!' }
    }

    return (
        <div className="balance-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {BALANCE_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'puntu', es: score === 1 ? 'punto' : 'puntos', ar: 'نقاط' })}</span>
            </GameTopbar>

            <p className="balance-question">{l(question)}</p>

            <div className={`balance-scale ${result ?? 'locked'}`} style={{ '--tilt': `${tilt}deg` } as CSSProperties} dir="ltr">
                <span className="balance-stand" aria-hidden="true" />
                <div className="balance-beam">
                    <div className="balance-hanger left">
                        <svg className="balance-strings" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M50 0 L6 30 M50 0 L94 30" vectorEffect="non-scaling-stroke" /></svg>
                        <div className="balance-pan" role="group" aria-label={l({ eu: 'Kargatutako platera', es: 'Platillo cargado', ar: 'الكفة المحمّلة' })}>
                            {leftValues.map((value, valueIndex) => <Weight key={valueIndex} value={value} tone="loaded" />)}
                        </div>
                    </div>
                    <div className="balance-hanger right">
                        <svg className="balance-strings" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M50 0 L6 30 M50 0 L94 30" vectorEffect="non-scaling-stroke" /></svg>
                        <div className="balance-pan" role="group" aria-label={l({ eu: 'Zure platera', es: 'Tu platillo', ar: 'كفّتك' })}>
                            {round.right.map((value, valueIndex) => <Weight key={`fixed-${valueIndex}`} value={value} tone="fixed" />)}
                            {chosen.map((trayIndex) => (
                                <Weight
                                    key={trayIndex}
                                    value={round.tray[trayIndex]}
                                    tone="mine"
                                    onClick={done ? undefined : () => toggle(trayIndex)}
                                    label={l({ eu: 'Kendu pisu hau', es: 'Quitar esta pesa', ar: 'أزل هذا الثقل' })}
                                />
                            ))}
                            {rightValues.length === 0 && <span className="balance-empty">{l({ eu: 'hutsik', es: 'vacío', ar: 'فارغة' })}</span>}
                        </div>
                    </div>
                </div>
                <span className={`balance-dial ${result ?? 'locked'}`} aria-hidden="true">{result === 'balanced' ? '=' : result === 'lighter' ? '>' : result === 'heavier' ? '<' : '?'}</span>
            </div>

            <div className="balance-status" aria-live="polite">
                <span className="balance-weighings" aria-label={l({ eu: `Pisaketak: ${remaining}`, es: `Pesadas que quedan: ${remaining}`, ar: `الوزنات الباقية: ${remaining}` })}>
                    {Array.from({ length: BALANCE_WEIGHINGS }, (_, item) => <i key={item} className={item < weighings ? 'used' : ''} aria-hidden="true" />)}
                </span>
                <strong className={`balance-verdict ${result ?? ''}`}>
                    {result ? l(verdict[result]) : l({ eu: 'Pisatu gabe', es: 'Sin pesar', ar: 'لم يُوزن بعد' })}
                </strong>
            </div>

            {!done && (
                <>
                    <div className="balance-tray" role="group" aria-label={l({ eu: 'Pisu erabilgarriak', es: 'Pesas disponibles', ar: 'الأثقال المتاحة' })}>
                        {round.tray.map((value, trayIndex) => (chosen.includes(trayIndex)
                            ? <span key={trayIndex} className="balance-slot" aria-hidden="true" />
                            : <Weight key={trayIndex} value={value} tone="tray" onClick={() => toggle(trayIndex)} label={l({ eu: 'Jarri zure platerean', es: 'Ponerla en tu platillo', ar: 'ضعه في كفّتك' })} />))}
                    </div>
                    <button type="button" className="fraction-v2-primary balance-weigh" disabled={result !== null || rightValues.length === 0} onClick={weighNow}>
                        {l({ eu: 'Pisatu', es: 'Pesar', ar: 'زِن' })}
                    </button>
                    <p className="balance-tip">{l({ eu: 'Sakatu pisu bat zure platerean jartzeko; sakatu berriro kentzeko.', es: 'Toca una pesa para ponerla en tu platillo; tócala otra vez para quitarla.', ar: 'اضغط ثقلًا لتضعه في كفّتك، واضغطه مرة أخرى لتزيله.' })}</p>
                </>
            )}

            {done && (
                <div className={`balance-explain ${result === 'balanced' ? 'right' : 'wrong'}`} role="status">
                    <p>
                        <strong>{result === 'balanced'
                            ? l({ eu: `Oreka! +${balancePoints(weighings)} puntu`, es: `¡Equilibrio! +${balancePoints(weighings)} ${balancePoints(weighings) === 1 ? 'punto' : 'puntos'}`, ar: `توازن! +${balancePoints(weighings)} نقاط` })
                            : l({ eu: 'Pisaketak amaitu dira.', es: 'Se acabaron las pesadas.', ar: 'انتهت الوزنات.' })}</strong>{' '}
                        {result === 'balanced'
                            ? l({ eu: 'Bi platerek berdin pisatzen dute:', es: 'Los dos platillos pesan lo mismo:', ar: 'الكفتان تزنان الشيء نفسه:' })
                            : l({ eu: 'Honela orekatzen zen:', es: 'Así se equilibraba:', ar: 'هكذا كان يتوازن:' })}
                    </p>
                    <ul className="balance-sums">
                        <li><MathText text={`$${sumLatex(leftValues, result === 'balanced' ? denominator : undefined)}$`} /></li>
                        <li><MathText text={`$${result === 'balanced' ? sumLatex(rightValues, denominator) : sumLatex(solutionValues)}$`} /></li>
                    </ul>
                    {result !== 'balanced' && rightValues.length > 0 && (
                        <p className="balance-yours">
                            {l({ eu: 'Zure platerean:', es: 'En tu platillo había:', ar: 'كان في كفّتك:' })}{' '}
                            <bdi dir="ltr"><MathText inline text={`$${latex(rightValues.reduce((total, value) => add(total, value), fraction(0)))}$`} /></bdi>
                        </p>
                    )}
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= BALANCE_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
