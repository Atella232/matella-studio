import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { createCrossingRounds, CROSSING_ROUNDS, crossingRight, crossingStars, GRID, lineLatex, type CrossingAnswer, type CrossingRound, type Line } from './crossing'
import { Equations3GameArt } from './GameArt'
import { equations3Games } from './info'
import './Games.css'

const game = equations3Games.find((item) => item.id === 'crossing')!
const CELL = 28
const SIZE = 2 * GRID * CELL + 40
const X = (x: number) => 20 + (x + GRID) * CELL
const Y = (y: number) => 20 + (GRID - y) * CELL
const COLOURS = ['var(--blue, #2f6fdb)', 'var(--coral, #c4432a)']

function LinePath({ line, colour }: { line: Line; colour: string }) {
    const at = (x: number) => (line.c - line.a * x) / line.b
    return <line x1={X(-GRID - 1)} y1={Y(at(-GRID - 1))} x2={X(GRID + 1)} y2={Y(at(GRID + 1))} stroke={colour} strokeWidth={3} strokeLinecap="round" />
}

export function CrossingGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<CrossingRound[]>([])
    const [index, setIndex] = useState(0)
    const [answer, setAnswer] = useState<CrossingAnswer | null>(null)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createCrossingRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setAnswer(null)
        setResults([])
        setPhase('playing')
    }

    const choose = (given: CrossingAnswer) => {
        if (answer !== null) return
        setAnswer(given)
        setResults([...results, crossingRight(round, given)])
    }

    const next = () => {
        if (index + 1 >= CROSSING_ROUNDS) {
            onResult(level, { stars: crossingStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setAnswer(null)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<Equations3GameArt game="crossing" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${CROSSING_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Sakatu bi zuzenak ebakitzen diren puntua.', es: 'Toca el punto donde se cortan las dos rectas.', en: 'Tap the point where the two lines cross.', ar: 'المس النقطة التي يتقاطع فيها المستقيمان.' })}</li>
                        <li>{l({ eu: 'Ez badira ebakitzen, esan paraleloak diren edo zuzen bera diren.', es: 'Si no se cortan, di si son paralelas o la misma recta.', en: 'If they do not cross, say whether they are parallel or the same line.', ar: 'إذا لم يتقاطعا فقل هل هما متوازيان أم المستقيم نفسه.' })}</li>
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
                    stars={crossingStars(score)}
                    title={`${score} / ${CROSSING_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 8 asmatu · 2 izar: 6 · izar 1: 4', es: '3 estrellas: 8 aciertos · 2: 6 · 1: 4', en: '3 stars: 8 correct · 2: 6 · 1: 4', ar: '3 نجوم: 8 إجابات صحيحة · 2: 6 · 1: 4' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${CROSSING_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const right = answer !== null && crossingRight(round, answer)
    const drawn = level !== 1 || answer !== null
    const picked = answer !== null && 'point' in answer ? answer.point : null
    const points = Array.from({ length: (2 * GRID + 1) ** 2 }, (_, i) => [(i % (2 * GRID + 1)) - GRID, Math.floor(i / (2 * GRID + 1)) - GRID] as [number, number])
    const kindText = round.kind === 'none'
        ? l({ eu: 'Paraleloak dira: ebazpenik ez.', es: 'Son paralelas: no hay solución.', en: 'They are parallel: no solution.', ar: 'متوازيان: لا حل.' })
        : round.kind === 'infinite'
            ? l({ eu: 'Zuzen bera da: infinitu ebazpen.', es: 'Es la misma recta: infinitas soluciones.', en: 'It is the same line: infinitely many solutions.', ar: 'المستقيم نفسه: حلول لانهائية.' })
            : l({ eu: 'Ebakidura-puntua:', es: 'Punto de corte:', en: 'Crossing point:', ar: 'نقطة التقاطع:' })
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {CROSSING_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: CROSSING_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <div className="ekuazioak-system">
                {round.lines.map((line, position) => <span key={position} style={{ color: COLOURS[position] }}><MathText text={`$${lineLatex(line)}$`} inline /></span>)}
            </div>
            <svg className="ekuazioak-grid" viewBox={`0 0 ${SIZE} ${SIZE}`} direction="ltr" role="group" aria-label={l({ eu: 'Sareta: sakatu puntu bat', es: 'Cuadrícula: toca un punto', en: 'Grid: tap a point', ar: 'شبكة: المس نقطة' })}>
                <defs><clipPath id="ekuazioak-grid-clip"><rect x={X(-GRID) - 10} y={Y(GRID) - 10} width={2 * GRID * CELL + 20} height={2 * GRID * CELL + 20} /></clipPath></defs>
                {Array.from({ length: 2 * GRID + 1 }, (_, i) => i - GRID).map((value) => (
                    <g key={value}>
                        <line x1={X(value)} x2={X(value)} y1={Y(GRID)} y2={Y(-GRID)} stroke={value === 0 ? 'var(--ink)' : 'var(--line, #d9d2c3)'} strokeWidth={value === 0 ? 1.6 : 1} />
                        <line y1={Y(value)} y2={Y(value)} x1={X(-GRID)} x2={X(GRID)} stroke={value === 0 ? 'var(--ink)' : 'var(--line, #d9d2c3)'} strokeWidth={value === 0 ? 1.6 : 1} />
                    </g>
                ))}
                {[-4, -2, 2, 4].map((value) => <text key={`x${value}`} x={X(value)} y={Y(0) + 14} textAnchor="middle" fontSize={11} fill="var(--muted)">{value}</text>)}
                {[-4, -2, 2, 4].map((value) => <text key={`y${value}`} x={X(0) - 6} y={Y(value) + 4} textAnchor="end" fontSize={11} fill="var(--muted)">{value}</text>)}
                {drawn && <g clipPath="url(#ekuazioak-grid-clip)">{round.lines.map((line, position) => <LinePath key={position} line={line} colour={COLOURS[position]} />)}</g>}
                {points.map(([x, y]) => {
                    const isAnswer = answer !== null && round.point !== null && round.point[0] === x && round.point[1] === y
                    const isPicked = picked !== null && picked[0] === x && picked[1] === y
                    return (
                        <circle key={`${x},${y}`} cx={X(x)} cy={Y(y)} r={isAnswer || isPicked ? 8 : 9} fill={isAnswer ? 'var(--success, #267b53)' : isPicked ? 'var(--error, #c4432a)' : 'transparent'}
                            stroke={isAnswer || isPicked ? 'var(--ink)' : 'none'} strokeWidth={1.4} style={{ cursor: answer === null ? 'pointer' : 'default' }}
                            role="button" tabIndex={answer === null ? 0 : -1} aria-label={`(${x}, ${y})`}
                            onClick={() => choose({ point: [x, y] })} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') choose({ point: [x, y] }) }} />
                    )
                })}
            </svg>
            {answer === null && (
                <div className="prop3-options" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <button type="button" onClick={() => choose({ kind: 'none' })}>{l({ eu: 'Paraleloak', es: 'Paralelas', en: 'Parallel', ar: 'متوازيان' })}</button>
                    <button type="button" onClick={() => choose({ kind: 'infinite' })}>{l({ eu: 'Zuzen bera', es: 'La misma recta', en: 'The same line', ar: 'المستقيم نفسه' })}</button>
                </div>
            )}
            {answer !== null && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: 'Ez.', es: 'No.', en: 'No.', ar: 'لا.' })}</strong> {kindText} {round.point && <MathText text={`$(${round.point[0]},${round.point[1]})$`} inline />}</p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= CROSSING_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
