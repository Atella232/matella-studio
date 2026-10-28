import { useEffect, useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { localLatex, nowMs, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { normalizeDigits } from '../../../features/unit-v2/math/fraction'
import { ProportionDbh4ApGameArt } from './GameArt'
import { proportionDbh4ApGames } from './info'
import { moneyText } from './numbers'
import {
    createTillRounds,
    isBack,
    productName,
    readCents,
    TILL_CUSTOMERS,
    TILL_PATIENCE,
    TILL_TRIES,
    tillAnswerText,
    tillPoints,
    tillQuestion,
    tillSlip,
    tillSlipText,
    tillStars,
    tillSteps,
    tillStickers,
    tillTagLabel,
    type TillRound
} from './till'
import './Till.css'

const game = proportionDbh4ApGames.find((item) => item.id === 'till')!

type Outcome = 'right' | 'wrong' | 'timeout'

/** How each customer went: the points, and the try that got it right (0 when none did) */
interface Served {
    points: number
    tries: number
}

const KEYS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'sep', '0', 'del'] as const
/** Digits before the decimal comma */
const MAX_WHOLE = 5

/** The customer: smiling while there is patience, then serious, then cross */
function Customer({ left, outcome }: { left: number; outcome: Outcome | null }) {
    const mood = outcome === 'right' ? 1 : outcome !== null ? -1 : left > 0.5 ? 1 : left > 0.2 ? 0 : -1
    const mouth = mood > 0 ? 'M16 30 Q24 37 32 30' : mood === 0 ? 'M17 32 H31' : 'M16 35 Q24 28 32 35'
    return (
        <svg className="till-customer" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="21" fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth="2" />
            <circle cx="17" cy="20" r="2.4" fill="var(--ink)" />
            <circle cx="31" cy="20" r="2.4" fill="var(--ink)" />
            {mood < 0 && <path d="M12 13 L20 16 M36 13 L28 16" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />}
            <path d={mouth} fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
    )
}

export function ProportionDbh4ApTillGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<TillRound[]>([])
    const [index, setIndex] = useState(0)
    /** What is on the till's display, always with a decimal comma */
    const [typed, setTyped] = useState('')
    /** Wrong amounts typed for this customer, in cents */
    const [misses, setMisses] = useState<number[]>([])
    const [outcome, setOutcome] = useState<Outcome | null>(null)
    const [askedAt, setAskedAt] = useState(0)
    const [now, setNow] = useState(0)
    const [served, setServed] = useState<Served[]>([])

    const round = rounds[index]
    const patience = TILL_PATIENCE[level] * 1000
    const waiting = phase === 'playing' && outcome === null && round !== undefined
    const left = Math.max(0, 1 - (now - askedAt) / patience)
    const total = served.reduce((sum, item) => sum + item.points, 0)

    // The clock: the customer's patience runs out while no right answer is in
    useEffect(() => {
        if (!waiting) return
        const timer = window.setInterval(() => {
            const time = nowMs()
            setNow(time)
            if (time - askedAt >= patience) {
                setOutcome('timeout')
                setServed((current) => (current.length > index ? current : [...current, { points: 0, tries: 0 }]))
            }
        }, 100)
        return () => window.clearInterval(timer)
    }, [waiting, askedAt, patience, index])

    const welcome = () => {
        const time = nowMs()
        setAskedAt(time)
        setNow(time)
        setTyped('')
        setMisses([])
        setOutcome(null)
    }

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createTillRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setServed([])
        setPhase('playing')
        welcome()
    }

    const press = (key: (typeof KEYS)[number]) => {
        if (!waiting) return
        if (key === 'del') {
            setTyped((current) => current.slice(0, -1))
            return
        }
        if (key === 'sep') {
            setTyped((current) => (current === '' || current.includes(',') ? current : `${current},`))
            return
        }
        setTyped((current) => {
            const [whole, decimals] = current.split(',')
            if (decimals !== undefined) return decimals.length >= 2 ? current : current + key
            if (whole === '0') return key
            return whole.length >= MAX_WHOLE ? current : current + key
        })
    }

    const charge = () => {
        const cents = readCents(typed)
        if (!waiting || cents === null) return
        const time = nowMs()
        const tries = misses.length + 1
        if (cents === round.answer) {
            setNow(time)
            setOutcome('right')
            setServed([...served, { points: tillPoints(tries, 1 - (time - askedAt) / patience), tries }])
            return
        }
        setTyped('')
        setMisses([...misses, cents])
        if (tries >= TILL_TRIES) {
            setNow(time)
            setOutcome('wrong')
            setServed([...served, { points: 0, tries: 0 }])
        }
    }

    // The keyboard works as the till: digits, comma or point, Backspace and Enter
    useEffect(() => {
        if (!waiting) return
        const onKey = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.metaKey || event.altKey) return
            const key = normalizeDigits(event.key)
            if (/^\d$/.test(key)) press(key as (typeof KEYS)[number])
            else if (key === ',' || key === '.') press('sep')
            else if (key === 'Backspace') press('del')
            // Enter on a focused key of the till presses that key, not «Cobrar»
            else if (key === 'Enter' && (event.target as HTMLElement | null)?.tagName !== 'BUTTON') charge()
            else return
            event.preventDefault()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    })

    const next = () => {
        if (index + 1 >= TILL_CUSTOMERS) {
            onResult(level, { stars: tillStars(total), score: total, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        welcome()
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<ProportionDbh4ApGameArt game="till" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${record.score} / ${TILL_CUSTOMERS * 100}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Bezero bakoitzak etiketa bat dakar: idatzi kutxan zenbat kobratu, edo zenbat balio zuen lehen.', es: 'Cada cliente trae una etiqueta: escribe en la caja cuánto cobrar, o cuánto costaba antes.', ar: 'يأتي كل زبون ببطاقة سعر: اكتب في الصندوق المبلغ المطلوب، أو كم كان السعر قبل ذلك.' })}</li>
                        <li>
                            <MathText
                                inline
                                text={l({
                                    eu: 'Biderkatu indizeaz aurrera joateko, eta zatitu atzera egiteko: $80\\cdot 0{,}85=68$ eta $68\\mathbin{:}0{,}85=80$.',
                                    es: 'Multiplica por el índice para ir hacia delante y divide para volver atrás: $80\\cdot 0{,}85=68$ y $68\\mathbin{:}0{,}85=80$.',
                                    ar: 'اضرب في المؤشر للتقدّم واقسم عليه للرجوع: $80\\cdot 0.85=68$ و$68\\mathbin{:}0.85=80$.'
                                })}
                            />
                        </li>
                        <li>{l({ eu: `${TILL_CUSTOMERS} bezero. Zenbat eta azkarrago, orduan eta puntu gehiago (100 arte). Bi saiakera bezero bakoitzeko.`, es: `${TILL_CUSTOMERS} clientes. Cuanto antes contestes, más puntos (hasta 100). Dos intentos por cliente.`, ar: `${TILL_CUSTOMERS} زبائن. كلما أجبت أسرع نلت نقاطًا أكثر (حتى 100). محاولتان لكل زبون.` })}</li>
                    </ul>
                )}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="till-game" data-stage={game.levels[level].stage}>
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={tillStars(total)}
                    title={`${total} / ${TILL_CUSTOMERS * 100}`}
                    subtitle={l({ eu: '3 izar: 600 puntu · 2 izar: 450 · izar 1: 300', es: '3 estrellas: 600 puntos · 2: 450 · 1: 300', ar: '3 نجوم: 600 نقطة · 2: 450 · 1: 300' })}
                    stats={[
                        { label: l({ eu: 'Lehenengoan', es: 'A la primera', ar: 'من المحاولة الأولى' }), value: `${served.filter((item) => item.tries === 1).length} / ${TILL_CUSTOMERS}` },
                        { label: l({ eu: 'Ondo kobratuta', es: 'Bien cobrados', ar: 'أجوبة صحيحة' }), value: `${served.filter((item) => item.tries > 0).length} / ${TILL_CUSTOMERS}` }
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
    const back = isBack(round.kind)
    const display = language === 'ar' ? typed.replace(',', '.') : typed
    const lastMiss = misses.at(-1) ?? null
    const slip = lastMiss !== null ? tillSlip(round, lastMiss) : null
    const mood = left > 0.5 ? 'calm' : left > 0.2 ? 'hurry' : 'late'

    return (
        <div className="till-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {TILL_CUSTOMERS}</span>
                <span><strong>{total}</strong> {l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}</span>
            </GameTopbar>

            <div className="till-scene">
                <Customer left={left} outcome={outcome} />
                <p className="till-bubble">{l(tillQuestion(round))}</p>
            </div>
            <div className="till-patience" role="progressbar" aria-label={l({ eu: 'Bezeroaren pazientzia', es: 'Paciencia del cliente', ar: 'صبر الزبون' })} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(left * 100)}>
                <span data-mood={mood} style={{ width: `${left * 100}%` }} />
            </div>

            <div className="till-tag">
                <span className="till-tag-hole" aria-hidden="true" />
                <strong className="till-tag-product">{l(productName(round))}</strong>
                <span className="till-tag-line">
                    <span className="till-tag-label">{l(tillTagLabel(round))}</span>
                    <span className="till-tag-price" dir="ltr">{`${moneyText(round.shown / 100, language)}\u00a0€`}</span>
                </span>
                <span className="till-stickers">
                    {tillStickers(round).map((sticker, position) => (
                        <span key={position} className={`till-sticker${round.changes[position] > 0 ? ' vat' : ''}`}>{l(sticker)}</span>
                    ))}
                </span>
            </div>

            {outcome === null && (
                <>
                    {lastMiss !== null && (
                        <div className="till-retry" role="status">
                            <p>
                                {l({ eu: 'Bezeroak kexa egin du: hori ez da', es: 'El cliente protesta: eso no es', ar: 'يعترض الزبون: ليس هذا' })}
                                {' ('}<bdi dir="ltr">{`${moneyText(lastMiss / 100, language)}\u00a0€`}</bdi>{').'}
                            </p>
                            {slip && <p className="till-slip">{l(tillSlipText(round, slip))}</p>}
                            <p>{l({ eu: 'Saiakera bat geratzen zaizu.', es: 'Te queda un intento.', ar: 'بقيت لك محاولة واحدة.' })}</p>
                        </div>
                    )}
                    <div className="till-register" dir="ltr">
                        <output className={`till-display${typed === '' ? ' empty' : ''}`} aria-live="polite">{`${display === '' ? '0' : display} €`}</output>
                        <div className="till-keys">
                            {KEYS.map((key) => (
                                <button
                                    type="button"
                                    key={key}
                                    className={`till-key${key === 'del' ? ' del' : ''}`}
                                    aria-label={key === 'del' ? l({ eu: 'Ezabatu', es: 'Borrar', ar: 'احذف' }) : key === 'sep' ? l({ eu: 'Koma', es: 'Coma', ar: 'فاصلة عشرية' }) : key}
                                    onClick={() => press(key)}
                                >
                                    {key === 'del' ? '⌫' : key === 'sep' ? (language === 'ar' ? '.' : ',') : key}
                                </button>
                            ))}
                        </div>
                        <button type="button" className="fraction-v2-primary till-charge" disabled={readCents(typed) === null} onClick={charge}>
                            {back ? l({ eu: 'Erantzun', es: 'Responder', ar: 'أجب' }) : l({ eu: 'Kobratu', es: 'Cobrar', ar: 'احسب المبلغ' })}
                        </button>
                    </div>
                </>
            )}

            {outcome !== null && (
                <div className={`till-feedback ${outcome === 'right' ? 'right' : 'wrong'}`} role="status">
                    <p className="till-verdict">
                        {outcome === 'right'
                            ? back ? l({ eu: 'Zehatz-mehatz!', es: '¡Exacto!', ar: 'بالضبط!' }) : l({ eu: 'Ondo kobratuta!', es: '¡Bien cobrado!', ar: 'أحسنت، المبلغ صحيح!' })
                            : outcome === 'timeout'
                                ? l({ eu: 'Pazientzia agortu zaio, eta joan egin da!', es: '¡Se le acabó la paciencia y se ha ido!', ar: 'نفد صبر الزبون وغادر!' })
                                : l({ eu: 'Ezta hori ere. Bezeroa joan egin da.', es: 'Tampoco. El cliente se ha ido.', ar: 'ولا هذا. غادر الزبون.' })}
                    </p>
                    {outcome !== 'right' && <p>{l(tillAnswerText(round))}</p>}
                    {outcome === 'wrong' && slip && <p className="till-slip">{l(tillSlipText(round, slip))}</p>}
                    <ol className="till-steps">
                        {tillSteps(round).map((step, position) => (
                            <li key={position}>
                                <span className="till-step-label">{l(step.label)}</span>
                                <MathText text={`$${localLatex(step.latex, language)}$`} />
                            </li>
                        ))}
                    </ol>
                    <p className="till-points"><bdi dir="ltr">+{served[index]?.points ?? 0}</bdi> {l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}</p>
                </div>
            )}

            {outcome !== null && (
                <button type="button" className="fraction-v2-primary till-next" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                    {index + 1 >= TILL_CUSTOMERS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengo bezeroa', es: 'Siguiente cliente', ar: 'الزبون التالي' })}
                </button>
            )}
        </div>
    )
}
