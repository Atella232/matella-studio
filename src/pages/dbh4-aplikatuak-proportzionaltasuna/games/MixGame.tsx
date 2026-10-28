import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { usePlayback } from '../lab/usePlayback'
import { ProportionDbh4ApGameArt } from './GameArt'
import { proportionDbh4ApGames } from './info'
import {
    addMax,
    amountText,
    createMixRounds,
    distanceText,
    MIX_ROUNDS,
    MIX_TRIES,
    mixAmounts,
    mixBalanceLatex,
    mixDistances,
    mixHeading,
    mixHint,
    mixLatex,
    mixPoints,
    mixSide,
    mixSolutionText,
    mixStars,
    mixTarget,
    mixTask,
    mixVerdict,
    settingMax,
    valueText,
    type MixProduct,
    type MixRound
} from './mixture'
import './Mix.css'

const game = proportionDbh4ApGames.find((item) => item.id === 'mix')!

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const RED = '#c4432a'
const GREEN = 'var(--success, #267b53)'
const STAGE = 'var(--stage, #267b53)'
const MIX_MS = 900

/** The seesaw: the support in the middle, the beam level at BEAM_Y, the ground below */
const CX = 180
const BEAM_Y = 122
const GROUND = 160
const HALF = 150
/** The farthest a load sits from the support */
const REACH = 128
/** When it tips, the end of the beam rests on the ground */
const TIP = (Math.asin((GROUND - BEAM_Y - 3) / HALF) * 180) / Math.PI

/** Low and high quality of each product */
const COLORS: Record<MixProduct, [string, string]> = {
    coffee: ['#c4a27a', '#8a5a33'],
    tea: ['#a7c27a', '#5f8a3a'],
    sweets: ['#f0a3b5', '#d0587a'],
    nuts: ['#e3c08e', '#a0703c'],
    gold: ['#e9c95a', '#d4a72c']
}

/** A sack of a product (a bar of gold) standing on the beam at x, its size by the amount */
function Load({ round, x, height, amount, side, language }: { round: MixRound; x: number; height: number; amount: number; side: 0 | 1; language: GameProps['language'] }) {
    const top = BEAM_Y - 3 - height
    const gold = round.product === 'gold'
    const empty = amount === 0
    const fill = COLORS[round.product][side]
    return (
        <g>
            {gold
                ? <path d={`M${x - 24} ${BEAM_Y - 3} l6 ${-height} h36 l6 ${height} z`} fill={empty ? 'none' : fill} stroke={INK} strokeWidth={1.6} strokeDasharray={empty ? '4 3' : undefined} />
                : (
                    <>
                        <rect x={x - 21} y={top} width={42} height={height} rx={9} fill={empty ? 'none' : fill} stroke={INK} strokeWidth={1.6} strokeDasharray={empty ? '4 3' : undefined} />
                        {!empty && <path d={`M${x - 8} ${top + 1} l8 -7 l8 7`} fill={fill} stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />}
                    </>
                )}
            <text x={x} y={BEAM_Y - 3 - height / 2 + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>{amountText(round, amount, language)}</text>
            <text x={x} y={top - (gold ? 6 : 12)} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED}>{valueText(round, round.values[side], language)}</text>
        </g>
    )
}

export function ProportionDbh4ApMixGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [seed, setSeed] = useState(0)
    const [rounds, setRounds] = useState<MixRound[]>([])
    const [index, setIndex] = useState(0)
    /** The slider: the dear product on a whole mixture, the product added otherwise */
    const [setting, setSetting] = useState(0)
    /** The settings tried in this round, in order */
    const [tries, setTries] = useState<number[]>([])
    /** Points of each finished round */
    const [points, setPoints] = useState<number[]>([])
    // Each try lets go of the seesaw again: play() starts the round's tipping from level
    const mix = usePlayback(`${seed}-${index}`, MIX_MS)

    const round = rounds[index]
    const total = points.reduce((sum, value) => sum + value, 0)
    const last = tries.at(-1) ?? null
    const shown = last !== null && mix.progress === 1
    const solved = last !== null && round !== undefined && mixVerdict(round, mixAmounts(round, last)).right
    const over = shown && (solved || tries.length >= MIX_TRIES)
    // The points of a round count once the seesaw has settled
    const counted = total - (points.length > index && !shown ? points[index] : 0)

    const start = (nextLevel: number) => {
        const nextSeed = randomSeed()
        setLevel(nextLevel)
        setSeed(nextSeed)
        setRounds(createMixRounds(createRandom(nextSeed), nextLevel))
        setIndex(0)
        setSetting(0)
        setTries([])
        setPoints([])
        setPhase('playing')
    }

    const pour = () => {
        if (tries.includes(setting)) return
        const right = mixVerdict(round, mixAmounts(round, setting)).right
        const used = tries.length + 1
        setTries([...tries, setting])
        if (right || used >= MIX_TRIES) setPoints([...points, right ? mixPoints(used) : 0])
        mix.play()
    }

    const next = () => {
        if (index + 1 >= MIX_ROUNDS) {
            onResult(level, { stars: mixStars(total), score: total, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setSetting(0)
        setTries([])
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<ProportionDbh4ApGameArt game="mix" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${record.score} / ${MIX_ROUNDS * MIX_TRIES}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Balantzaren euskarria eskatzen duten prezioan dago, eta produktu bakoitza bere prezioan.', es: 'El balancín tiene el apoyo en el precio que te piden, y cada producto en su precio.', ar: 'نقطة ارتكاز الميزان عند السعر المطلوب، وكل منتج عند سعره.' })}</li>
                        <li>
                            <MathText
                                inline
                                text={l({
                                    eu: 'Zuzen geratzen da kiloak bider distantzia berdina denean bi aldeetan: $6\\cdot 2=4\\cdot 3$. Bestela, astunenaren aldera erortzen da.',
                                    es: 'Queda recto cuando kilos por distancia es igual a los dos lados: $6\\cdot 2=4\\cdot 3$. Si no, cae hacia el lado que pesa más.',
                                    ar: 'يبقى مستويًا عندما تتساوى الكيلوغرامات في المسافة في الجهتين: $6\\cdot 2=4\\cdot 3$. وإلا يميل نحو الجهة الأثقل.'
                                })}
                            />
                        </li>
                        <li>{l({ eu: `${MIX_ROUNDS} txanda eta ${MIX_TRIES} saiakera bakoitzean: 3 puntu lehenengoan, 2 bigarrenean, 1 hirugarrenean.`, es: `${MIX_ROUNDS} rondas y ${MIX_TRIES} intentos en cada una: 3 puntos a la primera, 2 a la segunda y 1 a la tercera.`, ar: `${MIX_ROUNDS} جولات و${MIX_TRIES} محاولات في كل جولة: 3 نقاط من المحاولة الأولى، و2 من الثانية، و1 من الثالثة.` })}</li>
                    </ul>
                )}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="mix-game" data-stage={game.levels[level].stage}>
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={mixStars(total)}
                    title={`${total} / ${MIX_ROUNDS * MIX_TRIES}`}
                    subtitle={l({ eu: '3 izar: 13 puntu · 2 izar: 10 · izar 1: 6', es: '3 estrellas: 13 puntos · 2: 10 · 1: 6', ar: '3 نجوم: 13 نقطة · 2: 10 · 1: 6' })}
                    stats={[
                        { label: l({ eu: 'Lehenengoan', es: 'A la primera', ar: 'من المحاولة الأولى' }), value: `${points.filter((value) => value === MIX_TRIES).length} / ${MIX_ROUNDS}` },
                        { label: l({ eu: 'Nahasketa perfektuak', es: 'Mezclas perfectas', ar: 'خلائط مثالية' }), value: `${points.filter((value) => value > 0).length} / ${MIX_ROUNDS}` }
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
    const gold = round.product === 'gold'
    const mixing = mix.playing
    const amounts = mixAmounts(round, setting)
    // The seesaw lets go for the last try, until the slider moves again
    const showingLast = last !== null && setting === last && mix.progress !== null
    const lastAmounts = last !== null ? mixAmounts(round, last) : null
    const side = showingLast && lastAmounts ? mixSide(round, lastAmounts) : 0
    const progress = mix.progress ?? 0
    // It falls faster and faster until the end of the beam rests on the ground
    const angle = side * TIP * progress * progress
    const verdict = shown ? mixVerdict(round, lastAmounts!) : null
    const tried = tries.includes(setting)
    const incomplete = amounts.includes(0)
    const attempt = Math.min(tries.length + (mixing ? 0 : 1), MIX_TRIES)
    const max = settingMax(round)

    // Each value sits at its distance from the support, the farther one at REACH
    const [lowDistance, highDistance] = mixDistances(round)
    const unit = REACH / Math.max(lowDistance, highDistance)
    const loadX: [number, number] = [CX - lowDistance * unit, CX + highDistance * unit]
    const biggest = round.kind === 'total' ? round.amount : Math.max(round.amount, addMax(round))
    const loadHeight = (amount: number) => 24 + (52 * amount) / biggest
    const beamColor = !shown ? INK : verdict?.right ? GREEN : RED

    /** −/+ on one side: on a whole mixture a kilo moves from the other side */
    const change = (product: 0 | 1, delta: number) => {
        const step = round.kind === 'total' && product === 0 ? -delta : delta
        setSetting((current) => Math.min(max, Math.max(0, current + step)))
    }
    const fixedSide = round.kind === 'add' ? round.given : null
    const locked = mixing || over

    return (
        <div className="mix-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {MIX_ROUNDS}</span>
                <span><strong>{counted}</strong> {l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}</span>
            </GameTopbar>

            <div className="mix-target">
                <span>{l(mixHeading(round))}</span>
                <strong>{l(mixTarget(round))}</strong>
                <p>{l(mixTask(round))}</p>
            </div>

            <svg className="mix-board" viewBox="0 0 360 222" direction="ltr" role="img" aria-label={l(gold ? { eu: 'Bi urre-zati balantza batean', es: 'Dos trozos de oro en un balancín', ar: 'قطعتا ذهب على ميزان' } : { eu: 'Bi produktu balantza batean', es: 'Dos productos en un balancín', ar: 'منتجان على ميزان' })}>
                <line x1={14} x2={346} y1={GROUND} y2={GROUND} stroke="var(--line, #d8d2c4)" strokeWidth={2} />
                {/* Two blocks hold the beam level until it is let go */}
                {!showingLast && [CX - HALF + 6, CX + HALF - 6].map((x) => <rect key={x} x={x - 5} y={BEAM_Y + 3} width={10} height={GROUND - BEAM_Y - 3} fill="var(--paper-deep, #ece6da)" stroke={INK} strokeWidth={1.2} />)}
                <path d={`M${CX} ${BEAM_Y + 3} L${CX - 14} ${GROUND} H${CX + 14} Z`} fill={STAGE} stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />

                <g transform={`rotate(${angle} ${CX} ${BEAM_Y})`}>
                    {([0, 1] as const).map((product) => (
                        <Load key={product} round={round} x={loadX[product]} height={loadHeight(amounts[product])} amount={amounts[product]} side={product} language={language} />
                    ))}
                    <line x1={CX - HALF} x2={CX + HALF} y1={BEAM_Y} y2={BEAM_Y} stroke={beamColor} strokeWidth={6} strokeLinecap="round" />
                    {loadX.map((x) => <line key={x} x1={x} x2={x} y1={BEAM_Y - 4} y2={BEAM_Y + 4} stroke="var(--card, #fffcf6)" strokeWidth={2} />)}
                </g>

                {/* Under the ground: the price asked for, and how far each value is from it */}
                <text x={CX} y={GROUND + 18} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>{valueText(round, round.target, language)}</text>
                {([0, 1] as const).map((product) => {
                    const x = loadX[product]
                    const left = Math.min(x, CX)
                    const right = Math.max(x, CX)
                    const distance = product === 0 ? lowDistance : highDistance
                    return (
                        <g key={product}>
                            <line x1={left} x2={right} y1={GROUND + 32} y2={GROUND + 32} stroke={MUTED} strokeWidth={1.6} />
                            {[left, right].map((end) => <line key={end} x1={end} x2={end} y1={GROUND + 27} y2={GROUND + 37} stroke={MUTED} strokeWidth={1.6} />)}
                            <text x={(left + right) / 2} y={GROUND + 52} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED}>{distanceText(round, distance, language)}</text>
                        </g>
                    )
                })}
            </svg>

            <div className="mix-controls" dir="ltr">
                {([0, 1] as const).map((product) => (
                    <div key={product} className={`mix-side${fixedSide === product ? ' fixed' : ''}`}>
                        <span className="mix-side-value">{valueText(round, round.values[product], language)}</span>
                        <strong className="mix-side-amount">{amountText(round, amounts[product], language)}</strong>
                        {fixedSide === product
                            ? <span className="mix-side-state">{l({ eu: 'dagoeneko', es: 'ya está', ar: 'موجود' })}</span>
                            : (
                                <span className="mix-steppers">
                                    <button type="button" disabled={locked || amounts[product] === 0} aria-label={`− ${valueText(round, round.values[product], language)}`} onClick={() => change(product, -1)}>−</button>
                                    <button type="button" disabled={locked || (round.kind === 'total' ? amounts[1 - product] === 0 : setting >= max)} aria-label={`+ ${valueText(round, round.values[product], language)}`} onClick={() => change(product, 1)}>+</button>
                                </span>
                            )}
                    </div>
                ))}
            </div>
            <input
                className="mix-slider"
                type="range"
                dir="ltr"
                min={0}
                max={max}
                step={1}
                value={setting}
                disabled={locked}
                aria-label={l(round.kind === 'total' ? { eu: 'Nola banatu', es: 'Cómo repartir', ar: 'كيف توزّع' } : { eu: 'Zenbat gehitu', es: 'Cuánto añadir', ar: 'كم تضيف' })}
                aria-valuetext={`${amountText(round, amounts[0], language)} · ${amountText(round, amounts[1], language)}`}
                onChange={(event) => setSetting(Number(event.target.value))}
            />

            {!over && (
                <div className="mix-actions">
                    <button type="button" className="fraction-v2-primary" disabled={mixing || incomplete || tried} onClick={pour}>
                        {gold ? l({ eu: 'Urtu!', es: '¡Fundir!', ar: 'اصهر!' }) : l({ eu: 'Nahastu!', es: '¡Mezclar!', ar: 'اخلط!' })}
                    </button>
                    <span className="mix-tries">
                        {tried && !mixing
                            ? l({ eu: 'Hori probatu duzu jada.', es: 'Eso ya lo has probado.', ar: 'جرّبت هذا من قبل.' })
                            : incomplete
                                ? l({ eu: 'Jarri bietatik.', es: 'Pon de los dos.', ar: 'ضع من الاثنين.' })
                                : l({ eu: `Saiakera: ${attempt} / ${MIX_TRIES}`, es: `Intento ${attempt} de ${MIX_TRIES}`, ar: `المحاولة ${attempt} من ${MIX_TRIES}` })}
                    </span>
                </div>
            )}

            {shown && verdict && lastAmounts && (
                <div className={`mix-feedback ${verdict.right ? 'right' : 'wrong'}`} role="status">
                    <MathText text={`$${localLatex(mixLatex(round, lastAmounts), language)}$`} />
                    <p className="mix-verdict">{l(verdict.text)}</p>
                    {!verdict.right && !over && <p><MathText text={l(mixHint(round, lastAmounts))} inline /></p>}
                    {!verdict.right && over && (
                        <>
                            <p>{l(mixSolutionText(round))}</p>
                            <MathText text={`$${localLatex(mixBalanceLatex(round), language)}$`} />
                        </>
                    )}
                    {over && <p className="mix-points"><bdi dir="ltr">+{points[index] ?? 0}</bdi> {l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}</p>}
                </div>
            )}

            {over && (
                <button type="button" className="fraction-v2-primary mix-next" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                    {index + 1 >= MIX_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', ar: 'التالي' })}
                </button>
            )}
        </div>
    )
}
