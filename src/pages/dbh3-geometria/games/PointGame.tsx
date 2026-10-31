import { useState } from 'react'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { A, B, NOTABLE_KINDS, notableLines, notablePoint, type NotableKind } from '../lab/notable'
import { Geometry3GameArt } from './GameArt'
import { geometry3Games } from './info'
import { createPointRounds, POINT_ROUNDS, pointStars, type PointRound } from './point'
import './Games.css'

const game = geometry3Games.find((item) => item.id === 'point')!

const NAMES: Record<NotableKind, { eu: string; es: string; en: string; ar: string }> = {
    circumcentre: { eu: 'Zirkunzentroa', es: 'Circuncentro', en: 'Circumcentre', ar: 'مركز الدائرة المحيطة' },
    incentre: { eu: 'Inzentroa', es: 'Incentro', en: 'Incentre', ar: 'مركز الدائرة المحاطة' },
    centroid: { eu: 'Barizentroa', es: 'Baricentro', en: 'Centroid', ar: 'مركز الثقل' },
    orthocentre: { eu: 'Ortozentroa', es: 'Ortocentro', en: 'Orthocentre', ar: 'ملتقى الارتفاعات' }
}

const LINES: Record<NotableKind, { eu: string; es: string; en: string; ar: string }> = {
    circumcentre: { eu: 'erdibitzaileak', es: 'mediatrices', en: 'perpendicular bisectors', ar: 'المنصّفات العمودية' },
    incentre: { eu: 'erdikariak', es: 'bisectrices', en: 'angle bisectors', ar: 'منصّفات الزوايا' },
    centroid: { eu: 'medianak', es: 'medianas', en: 'medians', ar: 'المتوسطات' },
    orthocentre: { eu: 'altuerak', es: 'alturas', en: 'altitudes', ar: 'الارتفاعات' }
}

const UNIT = 22
const X = (x: number) => 20 + (x + 3) * UNIT
const Y = (y: number) => 16 + (9 - y) * UNIT

export function PointGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<PointRound[]>([])
    const [index, setIndex] = useState(0)
    const [picked, setPicked] = useState<NotableKind | null>(null)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createPointRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setPicked(null)
        setResults([])
        setPhase('playing')
    }

    const choose = (kind: NotableKind) => {
        if (picked !== null) return
        setPicked(kind)
        setResults([...results, kind === round.kind])
    }

    const next = () => {
        if (index + 1 >= POINT_ROUNDS) {
            onResult(level, { stars: pointStars(score), score, timeMs: null })
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
                art={<Geometry3GameArt game="point" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${POINT_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Erdibitzaileak: aldearen erditik, perpendikular. Medianak: erpinetik aurkako aldearen erdira.', es: 'Mediatrices: por el punto medio del lado, perpendiculares. Medianas: del vértice al punto medio del lado opuesto.', en: 'Perpendicular bisectors: through the midpoint of a side, at right angles. Medians: from a vertex to the midpoint of the opposite side.', ar: 'المنصّفات العمودية: من منتصف الضلع وعمودية. المتوسطات: من الرأس إلى منتصف الضلع المقابل.' })}</li>
                        <li>{l({ eu: 'Erdikariak: angelua erditik. Altuerak: erpinetik, aurkako aldearekiko perpendikular.', es: 'Bisectrices: parten el ángulo por la mitad. Alturas: desde el vértice, perpendiculares al lado opuesto.', en: 'Angle bisectors: halve the angle. Altitudes: from a vertex, at right angles to the opposite side.', ar: 'منصّفات الزوايا: تقسم الزاوية نصفين. الارتفاعات: من الرأس عمودية على الضلع المقابل.' })}</li>
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
                    stars={pointStars(score)}
                    title={`${score} / ${POINT_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 8 asmatu · 2 izar: 6 · izar 1: 4', es: '3 estrellas: 8 aciertos · 2: 6 · 1: 4', en: '3 stars: 8 correct · 2: 6 · 1: 4', ar: '3 نجوم: 8 إجابات صحيحة · 2: 6 · 1: 4' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${POINT_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const right = picked !== null && picked === round.kind
    const point = notablePoint(round.kind, round.c)
    const lines = notableLines(round.kind, round.c, point).slice(0, picked === null ? round.lines : 3)
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {POINT_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: POINT_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <svg className="geometria-point-board" viewBox={`0 0 ${X(9) + 20} ${Y(-3) + 16}`} direction="ltr" aria-hidden="true">
                <defs><clipPath id="geometria-point-clip"><rect x={X(-3)} y={Y(9)} width={12 * UNIT} height={12 * UNIT} /></clipPath></defs>
                {Array.from({ length: 13 }, (_, i) => i - 3).map((value) => (
                    <g key={value}>
                        <line x1={X(value)} x2={X(value)} y1={Y(9)} y2={Y(-3)} stroke="var(--line, #e6dfd1)" strokeWidth={1} />
                        <line y1={Y(value)} y2={Y(value)} x1={X(-3)} x2={X(9)} stroke="var(--line, #e6dfd1)" strokeWidth={1} />
                    </g>
                ))}
                <polygon points={[A, B, round.c].map(([x, y]) => `${X(x)},${Y(y)}`).join(' ')} fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth={2.4} />
                <g clipPath="url(#geometria-point-clip)">
                    {lines.map(([p, q], position) => <line key={position} x1={X(p[0])} y1={Y(p[1])} x2={X(q[0])} y2={Y(q[1])} stroke="var(--coral, #c4432a)" strokeWidth={2} />)}
                    <circle cx={X(point[0])} cy={Y(point[1])} r={6} fill="var(--success, #267b53)" stroke="var(--ink)" strokeWidth={1.4} />
                </g>
                {[A, B, round.c].map(([x, y], position) => <circle key={position} cx={X(x)} cy={Y(y)} r={4.5} fill="var(--ink)" />)}
            </svg>
            <div className="prop3-options" role="group" aria-label={l({ eu: 'Puntuak', es: 'Puntos', en: 'Points', ar: 'النقاط' })} style={{ gridTemplateColumns: '1fr 1fr' }}>
                {NOTABLE_KINDS.map((kind) => (
                    <button key={kind} type="button" disabled={picked !== null} className={picked === null ? '' : kind === round.kind ? 'right' : kind === picked ? 'wrong' : ''} onClick={() => choose(kind)}>{l(NAMES[kind])}</button>
                ))}
            </div>
            {picked !== null && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: `Ez: ${LINES[round.kind].eu} dira.`, es: `No: son ${LINES[round.kind].es}.`, en: `No: they are ${LINES[round.kind].en}.`, ar: `لا: إنها ${LINES[round.kind].ar}.` })}</strong></p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= POINT_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
