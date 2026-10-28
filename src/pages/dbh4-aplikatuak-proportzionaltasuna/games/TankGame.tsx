import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { toNumber } from '../../../features/unit-v2/math/fraction'
import { usePlayback } from '../lab/usePlayback'
import { ProportionDbh4ApGameArt } from './GameArt'
import { proportionDbh4ApGames } from './info'
import { durationText } from './numbers'
import {
    createTankRounds,
    sameChoice,
    TANK_LETTERS,
    TANK_ROUNDS,
    TANK_TRIES,
    tankHint,
    tankHours,
    tankLatex,
    tankPoints,
    tankSolutionText,
    tankStars,
    tankTarget,
    tankVerdict,
    type TankChoice,
    type TankRound
} from './tank'
import './Tank.css'

const game = proportionDbh4ApGames.find((item) => item.id === 'tank')!

const INK = 'var(--ink, #1d2733)'
const CARD = 'var(--card, #fffcf6)'
const WATER = '#2f6fdb'
const RED = '#c4432a'
const GREEN = 'var(--success, #267b53)'
const FILL_MS = 2500

/** The tank in the drawing */
const TANK = { x: 80, y: 64, width: 200, height: 120 }

const closedChoice = (round: TankRound): TankChoice => ({ taps: round.taps.map(() => false), drain: false })

export function ProportionDbh4ApTankGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [seed, setSeed] = useState(0)
    const [rounds, setRounds] = useState<TankRound[]>([])
    const [index, setIndex] = useState(0)
    const [choice, setChoice] = useState<TankChoice>({ taps: [], drain: false })
    /** The choices tried in this round, in order */
    const [tries, setTries] = useState<TankChoice[]>([])
    /** Points of each finished round */
    const [points, setPoints] = useState<number[]>([])
    // Each try fills the tank again: play() starts the round's filling from empty
    const fill = usePlayback(`${seed}-${index}`, FILL_MS)

    const round = rounds[index]
    const total = points.reduce((sum, value) => sum + value, 0)
    const last = tries.at(-1) ?? null
    const shown = last !== null && fill.progress === 1
    const solved = last !== null && round !== undefined && tankVerdict(round, last).right
    const over = shown && (solved || tries.length >= TANK_TRIES)
    // The points of a round count once the tank has filled
    const counted = total - (points.length > index && !shown ? points[index] : 0)

    const start = (nextLevel: number) => {
        const nextSeed = randomSeed()
        const nextRounds = createTankRounds(createRandom(nextSeed), nextLevel)
        setLevel(nextLevel)
        setSeed(nextSeed)
        setRounds(nextRounds)
        setIndex(0)
        setChoice(closedChoice(nextRounds[0]))
        setTries([])
        setPoints([])
        setPhase('playing')
    }

    const pour = () => {
        if (tries.some((tried) => sameChoice(tried, choice))) return
        const right = tankVerdict(round, choice).right
        const used = tries.length + 1
        setTries([...tries, choice])
        if (right || used >= TANK_TRIES) setPoints([...points, right ? tankPoints(used) : 0])
        fill.play()
    }

    const next = () => {
        if (index + 1 >= TANK_ROUNDS) {
            onResult(level, { stars: tankStars(total), score: total, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setChoice(closedChoice(rounds[index + 1]))
        setTries([])
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<ProportionDbh4ApGameArt game="tank" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${record.score} / ${TANK_ROUNDS * TANK_TRIES}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Txorrota bakoitzaren orduak: bakarrik biltegia betetzeko behar dituenak. Hustubidearenak: biltegi betea husteko behar dituenak.', es: 'Las horas de cada grifo: lo que tarda él solo en llenar el depósito. Las del desagüe: lo que tarda en vaciarlo lleno.', ar: 'ساعات كل صنبور: ما يحتاجه وحده لملء الخزان. وساعات المصرف: ما يحتاجه لتفريغ الخزان الممتلئ.' })}</li>
                        <li>
                            <MathText
                                inline
                                text={l({
                                    eu: 'Ireki txorrotak biltegia denbora zehatzean betetzeko. Batu ordu bateko zatiak: $\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$, beraz 2 h.',
                                    es: 'Abre grifos para llenar el depósito en el tiempo exacto. Suma las partes de una hora: $\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$, luego 2 h.',
                                    ar: 'افتح صنابير لتملأ الخزان في الوقت المحدد تمامًا. اجمع أجزاء الساعة: $\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$، إذن ساعتان.'
                                })}
                            />
                        </li>
                        <li>{l({ eu: `${TANK_ROUNDS} txanda eta ${TANK_TRIES} saiakera bakoitzean: 3 puntu lehenengoan, 2 bigarrenean, 1 hirugarrenean.`, es: `${TANK_ROUNDS} rondas y ${TANK_TRIES} intentos en cada una: 3 puntos a la primera, 2 a la segunda y 1 a la tercera.`, ar: `${TANK_ROUNDS} جولات و${TANK_TRIES} محاولات في كل جولة: 3 نقاط من المحاولة الأولى، و2 من الثانية، و1 من الثالثة.` })}</li>
                    </ul>
                )}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="tank-game" data-stage={game.levels[level].stage}>
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={tankStars(total)}
                    title={`${total} / ${TANK_ROUNDS * TANK_TRIES}`}
                    subtitle={l({ eu: '3 izar: 13 puntu · 2 izar: 10 · izar 1: 6', es: '3 estrellas: 13 puntos · 2: 10 · 1: 6', ar: '3 نجوم: 13 نقطة · 2: 10 · 1: 6' })}
                    stats={[
                        { label: l({ eu: 'Lehenengoan', es: 'A la primera', ar: 'من المحاولة الأولى' }), value: `${points.filter((value) => value === TANK_TRIES).length} / ${TANK_ROUNDS}` },
                        { label: l({ eu: 'Beteta garaiz', es: 'Llenados a tiempo', ar: 'امتلأ في الوقت' }), value: `${points.filter((value) => value > 0).length} / ${TANK_ROUNDS}` }
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
    const pouring = fill.playing
    // The water and the clock belong to the last try, until another choice is made
    const showingLast = last !== null && sameChoice(choice, last)
    const hours = last ? tankHours(round, last) : null
    const progress = fill.progress ?? 0
    const level01 = showingLast && hours ? progress : 0
    const clockMinutes = hours ? progress * toNumber(hours) * 60 : null
    const verdict = shown ? tankVerdict(round, last!) : null
    const tried = tries.some((item) => sameChoice(item, choice))
    const nothingOpen = !choice.taps.some(Boolean)
    const tapX = (position: number) => TANK.x + ((position + 0.5) * TANK.width) / round.taps.length
    const surface = TANK.y + TANK.height - level01 * TANK.height
    const hourUnit = language === 'ar' ? 'س' : 'h'
    // While the tank fills, the try being poured; otherwise the next one
    const attempt = Math.min(tries.length + (pouring ? 0 : 1), TANK_TRIES)
    const state = (isOpen: boolean) => (isOpen ? l({ eu: 'irekita', es: 'abierto', ar: 'مفتوح' }) : l({ eu: 'itxita', es: 'cerrado', ar: 'مغلق' }))

    return (
        <div className="tank-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {TANK_ROUNDS}</span>
                <span><strong>{counted}</strong> {l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}</span>
            </GameTopbar>

            <p className="tank-target">
                <span>{l({ eu: 'Bete biltegia zehazki denbora honetan:', es: 'Llena el depósito en exactamente:', ar: 'املأ الخزان في هذا الوقت تمامًا:' })}</span>
                <strong>{l(tankTarget(round))}</strong>
            </p>

            <svg className="tank-board" viewBox="0 0 360 220" direction="ltr" role="img" aria-label={l({ eu: 'Biltegia, txorrotak eta hustubidea', es: 'El depósito, los grifos y el desagüe', ar: 'الخزان والصنابير والمصرف' })}>
                {/* Water: it rises while the tank fills */}
                {level01 > 0 && <rect x={TANK.x} y={surface} width={TANK.width} height={TANK.y + TANK.height - surface} fill={WATER} fillOpacity={0.35} />}
                <rect x={TANK.x} y={TANK.y} width={TANK.width} height={TANK.height} fill="none" stroke={INK} strokeWidth={2.4} />

                {round.taps.map((tapHours, position) => {
                    const cx = tapX(position)
                    const isOpen = choice.taps[position]
                    return (
                        <g key={position}>
                            <text x={cx} y={14} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>{l(TANK_LETTERS[position])}</text>
                            <text x={cx} y={30} textAnchor="middle" fontSize={13} fill={INK}>{`${tapHours} h`}</text>
                            <rect x={cx - 5} y={36} width={10} height={14} fill="var(--paper-deep, #ece6da)" stroke={INK} strokeWidth={1.4} />
                            <rect x={cx - 9} y={48} width={18} height={7} rx={2} fill={isOpen ? WATER : 'var(--paper-deep, #ece6da)'} stroke={INK} strokeWidth={1.4} />
                            {isOpen && <rect className={pouring ? 'tank-stream flowing' : 'tank-stream'} x={cx - 2.5} y={55} width={5} height={Math.max(4, surface - 55)} fill={WATER} fillOpacity={0.7} />}
                        </g>
                    )
                })}

                {round.drain > 0 && (
                    <g>
                        <path d={`M${TANK.x + TANK.width} ${TANK.y + TANK.height - 10} H 312 V 200`} fill="none" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
                        <path d={`M${TANK.x + TANK.width} ${TANK.y + TANK.height - 10} H 312 V 200`} fill="none" stroke={choice.drain ? RED : 'var(--paper-deep, #ece6da)'} strokeWidth={5} strokeLinejoin="round" />
                        <circle cx={296} cy={TANK.y + TANK.height - 10} r={7} fill={choice.drain ? RED : CARD} stroke={INK} strokeWidth={1.6} />
                        <text x={322} y={214} textAnchor="start" fontSize={13} fontWeight={700} fill={RED}>{`${round.drain} h`}</text>
                        {choice.drain && pouring && <circle className="tank-drop" cx={312} cy={206} r={3} fill={RED} />}
                    </g>
                )}

                {showingLast && (
                    <text x={TANK.x + TANK.width / 2} y={210} textAnchor="middle" fontSize={17} fontWeight={700} fill={shown ? (verdict?.right ? GREEN : RED) : INK}>
                        {clockMinutes === null ? (shown ? '∞' : '…') : durationText(clockMinutes, 'eu')}
                    </text>
                )}
            </svg>

            <div className="tank-switches" data-count={round.taps.length + (round.drain > 0 ? 1 : 0)}>
                {round.taps.map((tapHours, position) => (
                    <button
                        type="button"
                        key={position}
                        className="tank-switch"
                        aria-pressed={choice.taps[position]}
                        disabled={pouring || over}
                        onClick={() => setChoice((current) => ({ ...current, taps: current.taps.map((value, other) => (other === position ? !value : value)) }))}
                    >
                        <span className="tank-switch-name">{l({ eu: `${TANK_LETTERS[position].eu} txorrota`, es: `Grifo ${TANK_LETTERS[position].es}`, ar: `الصنبور ${TANK_LETTERS[position].ar}` })}</span>
                        <span className="tank-switch-hours">{`${tapHours} ${hourUnit}`}</span>
                        <span className="tank-switch-state">{state(choice.taps[position])}</span>
                    </button>
                ))}
                {round.drain > 0 && (
                    <button type="button" className="tank-switch drain" aria-pressed={choice.drain} disabled={pouring || over} onClick={() => setChoice((current) => ({ ...current, drain: !current.drain }))}>
                        <span className="tank-switch-name">{l({ eu: 'Hustubidea', es: 'Desagüe', ar: 'المصرف' })}</span>
                        <span className="tank-switch-hours">{`${round.drain} ${hourUnit}`}</span>
                        <span className="tank-switch-state">{state(choice.drain)}</span>
                    </button>
                )}
            </div>

            {!over && (
                <div className="tank-actions">
                    <button type="button" className="fraction-v2-primary" disabled={pouring || nothingOpen || tried} onClick={pour}>
                        {l({ eu: 'Bete!', es: '¡Llenar!', ar: 'املأ!' })}
                    </button>
                    <span className="tank-tries">
                        {tried && !pouring
                            ? l({ eu: 'Hori probatu duzu jada.', es: 'Eso ya lo has probado.', ar: 'جرّبت هذا من قبل.' })
                            : l({ eu: `Saiakera: ${attempt} / ${TANK_TRIES}`, es: `Intento ${attempt} de ${TANK_TRIES}`, ar: `المحاولة ${attempt} من ${TANK_TRIES}` })}
                    </span>
                </div>
            )}

            {shown && verdict && (
                <div className={`tank-feedback ${verdict.right ? 'right' : 'wrong'}`} role="status">
                    <MathText text={`$${localLatex(tankLatex(round, last!), language)}$`} />
                    <p className="tank-verdict">{l(verdict.text)}</p>
                    {!verdict.right && !over && <p><MathText text={l(tankHint(round))} inline /></p>}
                    {!verdict.right && over && (
                        <>
                            <p>{l(tankSolutionText(round))}</p>
                            <MathText text={`$${localLatex(tankLatex(round, round.solution), language)}$`} />
                        </>
                    )}
                    {over && <p className="tank-points"><bdi dir="ltr">+{points[index] ?? 0}</bdi> {l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}</p>}
                </div>
            )}

            {over && (
                <button type="button" className="fraction-v2-primary tank-next" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                    {index + 1 >= TANK_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', ar: 'التالي' })}
                </button>
            )}
        </div>
    )
}
