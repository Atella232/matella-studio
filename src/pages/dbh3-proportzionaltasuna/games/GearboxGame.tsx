import { useState } from 'react'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { Gear } from '../figures'
import { num } from './format'
import { Proportion3GameArt as GameArt } from './GameArt'
import { createGearboxRounds, GEARBOX_ROUNDS, gearboxSpeed, gearboxStars, type GearboxRound } from './gearbox'
import { proportion3Games } from './info'
import './Games.css'

const game = proportion3Games.find((item) => item.id === 'gearbox')!

const BLUE = 'var(--blue, #2f6fdb)'
const BLUE_TINT = 'var(--blue-tint, #dde7f7)'
const MUSTARD = 'var(--mustard, #e0a100)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const CORAL = 'var(--coral, #c4432a)'
const CORAL_TINT = 'var(--coral-tint, #f6d5cc)'
const GREEN = 'var(--success, #267b53)'
const MUTED = 'var(--muted, #58616e)'

interface Wheel {
    teeth: number
    rpm: number
    color: string
    tint: string
    label: string
    /** The wheel shares the axle of the previous one */
    axle?: boolean
    unknown?: boolean
}

/** The wheels of a round, from the motor to the last one; the last is the one to choose */
function wheelsOf(round: GearboxRound, chosen: number | null): Wheel[] {
    // Before choosing, the empty wheel has the average size of the options: its size gives nothing away
    const last = chosen ?? Math.round(round.options.reduce((sum, teeth) => sum + teeth, 0) / round.options.length / 2) * 2
    const a: Wheel = { teeth: round.teethA, rpm: round.rpmA, color: BLUE, tint: BLUE_TINT, label: 'A' }
    const end = (label: string): Wheel => ({ teeth: last, rpm: gearboxSpeed(round, last), color: CORAL, tint: CORAL_TINT, label, unknown: chosen === null })
    if (round.mode === 'pair') return [a, end('B')]
    if (round.mode === 'idler') return [a, { teeth: round.teethB!, rpm: (round.teethA * round.rpmA) / round.teethB!, color: MUSTARD, tint: MUSTARD_TINT, label: 'B' }, end('C')]
    const rpmB = (round.teethA * round.rpmA) / round.teethB!
    return [a, { teeth: round.teethB!, rpm: rpmB, color: MUSTARD, tint: MUSTARD_TINT, label: 'B' }, { teeth: round.teethC!, rpm: rpmB, color: GREEN, tint: 'var(--success-tint, #d9efe2)', label: 'C', axle: true }, end('D')]
}

/** Where each wheel goes: one row, or two rows joined by the shared axle (B above, C below) */
function layout(wheels: Wheel[]): { scale: number; centres: Array<{ x: number; y: number }>; height: number } {
    const gap = 7
    if (!wheels.some((wheel) => wheel.axle)) {
        const span = wheels.reduce((sum, wheel) => sum + 2 * wheel.teeth, 0)
        const scale = Math.min(2.2, (316 - gap * (wheels.length - 1)) / span, 72 / Math.max(...wheels.map((wheel) => wheel.teeth)))
        const total = span * scale + gap * (wheels.length - 1)
        let x = (360 - total) / 2
        const centres = wheels.map((wheel) => {
            const r = wheel.teeth * scale
            const centre = { x: x + r, y: 98 }
            x += 2 * r + gap
            return centre
        })
        return { scale, centres, height: 210 }
    }
    const [a, b, c, d] = wheels.map((wheel) => wheel.teeth)
    const wide = Math.max(2 * a + 2 * b, a * 2 + b + c + 2 * d)
    const tall = 2 * Math.max(a, b) + c + Math.max(c, d)
    const scale = Math.min(2, (316 - 2 * gap) / wide, 240 / tall)
    const xA = (360 - wide * scale - 2 * gap) / 2 + a * scale
    const xB = xA + (a + b) * scale + gap
    const y1 = Math.max(a, b) * scale + 30
    // Far enough below that C clears A as well as B
    const y2 = y1 + (Math.max(a, b) + c) * scale + 12
    const xD = xB + (c + d) * scale + gap
    return { scale, centres: [{ x: xA, y: y1 }, { x: xB, y: y1 }, { x: xB, y: y2 }, { x: xD, y: y2 }], height: y2 + Math.max(c, d) * scale + 34 }
}

function GearTrain({ round, chosen, progress }: { round: GearboxRound; chosen: number | null; progress: number | null }) {
    const wheels = wheelsOf(round, chosen)
    const { scale, centres, height } = layout(wheels)
    // Meshing wheels turn the other way; wheels on one axle turn together
    const directions = wheels.reduce<number[]>((list, wheel, index) => [...list, index === 0 ? 1 : wheel.axle ? list[index - 1] : -list[index - 1]], [])
    return (
        <svg viewBox={`0 0 360 ${height}`} direction="ltr" role="img" aria-label={wheels.map((wheel) => `${wheel.label} ${wheel.teeth}`).join(', ')} style={{ display: 'block', width: '100%', maxWidth: 520, margin: '0 auto', fontFamily: '"Atkinson Hyperlegible", system-ui, sans-serif' }}>
            {round.mode === 'axle' && <line x1={centres[1].x} x2={centres[2].x} y1={centres[1].y} y2={centres[2].y} stroke={MUTED} strokeWidth={7} strokeLinecap="round" opacity={0.6} />}
            {wheels.map((wheel, index) => {
                const r = wheel.teeth * scale
                const { x: cx, y: cy } = centres[index]
                const angle = progress === null ? 0 : directions[index] * progress * (wheel.rpm / 10) * 360
                const below = round.mode === 'axle' && index >= 2
                return (
                    <g key={index}>
                        {wheel.unknown
                            ? <circle cx={cx} cy={cy} r={r} fill="none" stroke={MUTED} strokeWidth={2} strokeDasharray="6 6" />
                            : <Gear cx={cx} cy={cy} radius={r} teeth={wheel.teeth} angle={angle + (index % 2 === 1 ? 180 / wheel.teeth : 0)} color={wheel.color} tint={wheel.tint} />}
                        <text x={cx} y={cy + 6} textAnchor="middle" fontSize={15} fontWeight={700} fill={wheel.unknown ? MUTED : 'var(--ink, #1d2733)'}>{wheel.unknown ? '?' : wheel.label}</text>
                        {!wheel.unknown && <text x={cx} y={below || round.mode !== 'axle' ? cy + r + 24 : cy - r - 12} textAnchor="middle" fontSize={14} fontWeight={700} fill={wheel.color}>{wheel.teeth}</text>}
                    </g>
                )
            })}
        </svg>
    )
}

export function GearboxGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<GearboxRound[]>([])
    const [index, setIndex] = useState(0)
    const [picked, setPicked] = useState<number | null>(null)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const playback = usePlayback(`${index}-${picked}`, 2500)
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createGearboxRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setPicked(null)
        setResults([])
        setPhase('playing')
    }

    const choose = (teeth: number) => {
        if (picked !== null) return
        setPicked(teeth)
        setResults([...results, teeth === round.answer])
        playback.play()
    }

    const next = () => {
        if (index + 1 >= GEARBOX_ROUNDS) {
            onResult(level, { stars: gearboxStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setPicked(null)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<GameArt game="gearbox" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${GEARBOX_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Motorrak A gurpila mugitzen du. Aukeratu azken gurpila, eskatutako abiaduran bira egin dezan.', es: 'El motor mueve la rueda A. Elige la última rueda para que gire a la velocidad pedida.', en: 'The motor turns wheel A. Choose the last wheel so that it turns at the speed asked for.', ar: 'يحرّك المحرك العجلة A. اختر العجلة الأخيرة لتدور بالسرعة المطلوبة.' })}</li>
                        <li>{l({ eu: 'Elkarri lotutako bi gurpiletan, hortzak bider birak berdina da.', es: 'En dos ruedas que engranan, dientes por vueltas es lo mismo.', en: 'On two meshing wheels, teeth times turns is the same.', ar: 'في عجلتين متعاشقتين، حاصل ضرب الأسنان في الدورات متساوٍ.' })}</li>
                        <li>{l({ eu: `${GEARBOX_ROUNDS} txanda; puntu bat zuzen bakoitzeko.`, es: `${GEARBOX_ROUNDS} rondas; un punto por acierto.`, en: `${GEARBOX_ROUNDS} rounds; one point per correct answer.`, ar: `${GEARBOX_ROUNDS} جولات ونقطة لكل إجابة صحيحة.` })}</li>
                    </ul>
                )}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="prop3-game">
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={gearboxStars(score)}
                    title={`${score} / ${GEARBOX_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 8 asmatu · 2 izar: 6 · izar 1: 4', es: '3 estrellas: 8 aciertos · 2: 6 · 1: 4', en: '3 stars: 8 correct · 2: 6 · 1: 4', ar: '3 نجوم: 8 إجابات صحيحة · 2: 6 · 1: 4' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${GEARBOX_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const last = round.mode === 'pair' ? 'B' : round.mode === 'idler' ? 'C' : 'D'
    const right = picked !== null && picked === round.answer
    const middle = round.mode === 'idler'
        ? l({ eu: ` Erdian, B gurpilak ${round.teethB} hortz ditu.`, es: ` En medio, la rueda B tiene ${round.teethB} dientes.`, en: ` In the middle, wheel B has ${round.teethB} teeth.`, ar: ` في الوسط للعجلة B عدد ${round.teethB} من الأسنان.` })
        : round.mode === 'axle'
            ? l({ eu: ` B gurpilak ${round.teethB} hortz ditu, eta ardatz berean C dago, ${round.teethC} hortzekin.`, es: ` La rueda B tiene ${round.teethB} dientes y en su mismo eje va la C, de ${round.teethC}.`, en: ` Wheel B has ${round.teethB} teeth, and on the same axle is wheel C, with ${round.teethC}.`, ar: ` للعجلة B عدد ${round.teethB} من الأسنان وعلى محورها نفسه العجلة C ولها ${round.teethC}.` })
            : ''
    const pickedSpeed = picked === null ? 0 : gearboxSpeed(round, picked)
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {GEARBOX_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: GEARBOX_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <p className="prop3-prompt">
                {l({ eu: `A gurpilak ${round.teethA} hortz ditu eta minutuko ${round.rpmA} bira egiten ditu.`, es: `La rueda A tiene ${round.teethA} dientes y da ${round.rpmA} vueltas por minuto.`, en: `Wheel A has ${round.teethA} teeth and turns ${round.rpmA} times a minute.`, ar: `للعجلة A عدد ${round.teethA} من الأسنان وتدور ${round.rpmA} دورة في الدقيقة.` })}
                {middle}
                <strong>{l({ eu: `${last}: minutuko ${round.target} bira`, es: `${last}: ${round.target} vueltas por minuto`, en: `${last}: ${round.target} turns a minute`, ar: `${last}: ${round.target} دورة في الدقيقة` })}</strong>
            </p>
            <GearTrain round={round} chosen={picked} progress={playback.progress} />
            <div className="prop3-options" role="group" aria-label={l({ eu: 'Zenbat hortz?', es: '¿Cuántos dientes?', en: 'How many teeth?', ar: 'كم سنًّا؟' })}>
                {round.options.map((teeth) => (
                    <button key={teeth} type="button" disabled={picked !== null} className={picked === null ? '' : teeth === round.answer ? 'right' : teeth === picked ? 'wrong' : ''} onClick={() => choose(teeth)}>
                        {l({ eu: `${teeth} hortz`, es: `${teeth} dientes`, en: `${teeth} teeth`, ar: `${teeth} سنًّا` })}
                    </button>
                ))}
            </div>
            {picked !== null && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}>
                        <strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: `Ez: ${picked} hortzekin ${num(pickedSpeed, language, 1)} bira egiten ditu.`, es: `No: con ${picked} dientes da ${num(pickedSpeed, language, 1)} vueltas.`, en: `No: with ${picked} teeth it turns ${num(pickedSpeed, language, 1)} times.`, ar: `لا: مع ${picked} سنًّا تدور ${num(pickedSpeed, language, 1)} دورة.` })}</strong>
                    </p>
                    <p>{round.mode === 'axle'
                        ? l({ eu: `B eta C: ${round.teethA} · ${round.rpmA} : ${round.teethB} = ${(round.teethA * round.rpmA) / round.teethB!} bira. ${last}: ${round.teethC} · ${(round.teethA * round.rpmA) / round.teethB!} : ${round.answer} = ${round.target}.`, es: `B y C: ${round.teethA} · ${round.rpmA} : ${round.teethB} = ${(round.teethA * round.rpmA) / round.teethB!} vueltas. ${last}: ${round.teethC} · ${(round.teethA * round.rpmA) / round.teethB!} : ${round.answer} = ${round.target}.`, en: `B and C: ${round.teethA} · ${round.rpmA} ÷ ${round.teethB} = ${(round.teethA * round.rpmA) / round.teethB!} turns. ${last}: ${round.teethC} · ${(round.teethA * round.rpmA) / round.teethB!} ÷ ${round.answer} = ${round.target}.`, ar: `B وC: ${(round.teethA * round.rpmA) / round.teethB!} دورة. ${last}: ${round.target} دورة مع ${round.answer} سنًّا.` })
                        : l({ eu: `${round.teethA} · ${round.rpmA} = ${round.answer} · ${round.target}${round.mode === 'idler' ? '. Erdiko gurpilak ez du abiadura aldatzen.' : '.'}`, es: `${round.teethA} · ${round.rpmA} = ${round.answer} · ${round.target}${round.mode === 'idler' ? '. La rueda del medio no cambia la velocidad.' : '.'}`, en: `${round.teethA} · ${round.rpmA} = ${round.answer} · ${round.target}${round.mode === 'idler' ? '. The wheel in the middle does not change the speed.' : '.'}`, ar: `${round.teethA} · ${round.rpmA} = ${round.answer} · ${round.target}${round.mode === 'idler' ? '. العجلة الوسطى لا تغيّر السرعة.' : '.'}` })}</p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= GEARBOX_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
