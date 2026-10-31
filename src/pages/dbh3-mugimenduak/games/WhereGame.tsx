import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { Motions3GameArt } from './GameArt'
import { motions3Games } from './info'
import { movementText } from './MovementText'
import { createWhereRounds, WHERE_GRID as GRID, WHERE_ROUNDS, whereStars, type WhereRound } from './where'
import '../../dbh3-ekuazioak/games/Games.css'
import './Games.css'

const game = motions3Games.find((item) => item.id === 'where')!
const CELL = 25
const SIZE = 2 * GRID * CELL + 40
const X = (x: number) => 20 + (x + GRID) * CELL
const Y = (y: number) => 20 + (GRID - y) * CELL

export function WhereGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<WhereRound[]>([])
    const [index, setIndex] = useState(0)
    const [answer, setAnswer] = useState<[number, number] | null>(null)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createWhereRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setAnswer(null)
        setResults([])
        setPhase('playing')
    }

    const choose = (given: [number, number]) => {
        if (answer !== null) return
        setAnswer(given)
        setResults([...results, given[0] === round.image[0] && given[1] === round.image[1]])
    }

    const next = () => {
        if (index + 1 >= WHERE_ROUNDS) {
            onResult(level, { stars: whereStars(score), score, timeMs: null })
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
                art={<Motions3GameArt game="where" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${WHERE_ROUNDS}`}
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
                    stars={whereStars(score)}
                    title={`${score} / ${WHERE_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 8 asmatu · 2 izar: 6 · izar 1: 4', es: '3 estrellas: 8 aciertos · 2: 6 · 1: 4', en: '3 stars: 8 correct · 2: 6 · 1: 4', ar: '3 نجوم: 8 إجابات صحيحة · 2: 6 · 1: 4' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${WHERE_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const right = answer !== null && answer[0] === round.image[0] && answer[1] === round.image[1]
    const points = Array.from({ length: (2 * GRID + 1) ** 2 }, (_, i) => [(i % (2 * GRID + 1)) - GRID, Math.floor(i / (2 * GRID + 1)) - GRID] as [number, number])
    const axis = round.movement.kind === 'reflection' ? round.movement.axis : null
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {WHERE_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: WHERE_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <p className="prop3-prompt"><MathText text={l(movementText(round.movement))} inline /></p>
            <svg className="ekuazioak-grid" viewBox={`0 0 ${SIZE} ${SIZE}`} direction="ltr" role="group" aria-label={l({ eu: 'Sareta: sakatu puntu bat', es: 'Cuadrícula: toca un punto', en: 'Grid: tap a point', ar: 'شبكة: المس نقطة' })}>
                {Array.from({ length: 2 * GRID + 1 }, (_, i) => i - GRID).map((value) => (
                    <g key={value}>
                        <line x1={X(value)} x2={X(value)} y1={Y(GRID)} y2={Y(-GRID)} stroke={value === 0 ? 'var(--ink)' : 'var(--line, #d9d2c3)'} strokeWidth={value === 0 ? 1.6 : 1} />
                        <line y1={Y(value)} y2={Y(value)} x1={X(-GRID)} x2={X(GRID)} stroke={value === 0 ? 'var(--ink)' : 'var(--line, #d9d2c3)'} strokeWidth={value === 0 ? 1.6 : 1} />
                    </g>
                ))}
                {[-4, -2, 2, 4].map((value) => <text key={`x${value}`} x={X(value)} y={Y(0) + 14} textAnchor="middle" fontSize={11} fill="var(--muted)">{value}</text>)}
                {[-4, -2, 2, 4].map((value) => <text key={`y${value}`} x={X(0) - 6} y={Y(value) + 4} textAnchor="end" fontSize={11} fill="var(--muted)">{value}</text>)}
                {axis && (axis.kind === 'vertical'
                    ? <line x1={X(axis.at)} x2={X(axis.at)} y1={Y(GRID)} y2={Y(-GRID)} stroke="var(--success, #267b53)" strokeWidth={3} />
                    : axis.kind === 'horizontal'
                        ? <line x1={X(-GRID)} x2={X(GRID)} y1={Y(axis.at)} y2={Y(axis.at)} stroke="var(--success, #267b53)" strokeWidth={3} />
                        : <line x1={X(-GRID)} x2={X(GRID)} y1={Y(-GRID)} y2={Y(GRID)} stroke="var(--success, #267b53)" strokeWidth={3} />)}
                {round.movement.kind === 'central' && <circle cx={X(round.movement.centre[0])} cy={Y(round.movement.centre[1])} r={5} fill="var(--mustard, #e0a100)" stroke="var(--ink)" strokeWidth={1.2} />}
                {round.movement.kind === 'translation' && answer !== null && <line x1={X(round.point[0])} y1={Y(round.point[1])} x2={X(round.image[0])} y2={Y(round.image[1])} stroke="var(--success, #267b53)" strokeWidth={2} strokeDasharray="5 4" />}
                <circle cx={X(round.point[0])} cy={Y(round.point[1])} r={8} fill="var(--blue, #2f6fdb)" stroke="var(--ink)" strokeWidth={1.4} />
                {points.map(([x, y]) => {
                    const isAnswer = answer !== null && round.image[0] === x && round.image[1] === y
                    const isPicked = answer !== null && answer[0] === x && answer[1] === y
                    return (
                        <circle key={`${x},${y}`} cx={X(x)} cy={Y(y)} r={9} fill={isAnswer ? 'var(--success, #267b53)' : isPicked ? 'var(--error, #c4432a)' : 'transparent'}
                            stroke={isAnswer || isPicked ? 'var(--ink)' : 'none'} strokeWidth={1.4} style={{ cursor: answer === null ? 'pointer' : 'default' }}
                            role="button" tabIndex={answer === null ? 0 : -1} aria-label={`(${x}, ${y})`}
                            onClick={() => choose([x, y])} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') choose([x, y]) }} />
                    )
                })}
            </svg>
            {answer !== null && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: 'Ez.', es: 'No.', en: 'No.', ar: 'لا.' })}</strong> <MathText text={`$(${round.point[0]},${round.point[1]})\\to(${round.image[0]},${round.image[1]})$`} inline /></p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= WHERE_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
