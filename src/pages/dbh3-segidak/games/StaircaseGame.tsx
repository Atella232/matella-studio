import { useState } from 'react'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { SequencesGameArt } from './GameArt'
import { sequencesGames } from './info'
import { createStaircaseRounds, STAIRCASE_ROUNDS, STAIRCASE_ROWS_MAX, staircaseStars, staircaseSum, type StaircaseRound } from './staircase'
import './Games.css'

const game = sequencesGames.find((item) => item.id === 'staircase')!

const INK = 'var(--ink, #1d2733)'
const BLUE_TINT = 'var(--blue-tint, #dde7f7)'
const BLUE = 'var(--blue, #2f6fdb)'
const CORAL = 'var(--coral, #c4432a)'
const CORAL_TINT = 'var(--coral-tint, #f6d5cc)'

/** The staircase: row k has a₁ + (k − 1)·d blocks, drawn top to bottom */
function Stairs({ round, rows }: { round: StaircaseRound; rows: number }) {
    const widest = Math.max(round.a1 + (rows - 1) * round.d, round.a1 + (round.rows - 1) * round.d)
    const size = Math.max(3, Math.min(14, 320 / widest, 220 / Math.max(rows, 1)))
    const over = staircaseSum(round.a1, round.d, rows) > round.total
    return (
        <svg viewBox={`0 0 360 ${rows * size + 16}`} direction="ltr" role="img" aria-label={`${rows}`} style={{ display: 'block', width: '100%', maxWidth: 520, margin: '0 auto' }}>
            {Array.from({ length: rows }, (_, row) => {
                const blocks = round.a1 + row * round.d
                const x0 = (360 - blocks * size) / 2
                return <rect key={row} x={x0} y={8 + row * size} width={blocks * size} height={size - 1} fill={over ? CORAL_TINT : BLUE_TINT} stroke={over ? CORAL : BLUE} strokeWidth={1} />
            })}
            <line x1={20} x2={340} y1={rows * size + 10} y2={rows * size + 10} stroke={INK} strokeWidth={2} />
        </svg>
    )
}

export function StaircaseGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<StaircaseRound[]>([])
    const [index, setIndex] = useState(0)
    const [rows, setRows] = useState(1)
    const [checked, setChecked] = useState(false)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createStaircaseRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setRows(1)
        setChecked(false)
        setResults([])
        setPhase('playing')
    }

    const check = () => {
        setChecked(true)
        setResults([...results, rows === round.rows])
    }

    const next = () => {
        if (index + 1 >= STAIRCASE_ROUNDS) {
            onResult(level, { stars: staircaseStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setRows(1)
        setChecked(false)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<SequencesGameArt game="staircase" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${STAIRCASE_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Kutxan bloke kopuru jakin bat dago. Erabaki zenbat ilara egin, bloke bat ere soberan geratu gabe.', es: 'La caja tiene un número exacto de bloques. Decide cuántas filas hacer sin que sobre ni uno.', en: 'The box holds an exact number of blocks. Decide how many rows to build so that not one is left over.', ar: 'في الصندوق عدد محدد من الكتل. قرّر كم صفًا تبني دون أن تبقى كتلة واحدة.' })}</li>
                        <li>{l({ eu: 'Ilara bakoitzak goikoak baino d bloke gehiago ditu: batura Gaussen formularekin.', es: 'Cada fila tiene d bloques más que la de arriba: la suma, con la fórmula de Gauss.', en: 'Each row has d more blocks than the one above: the sum, with Gauss\'s formula.', ar: 'كل صف فيه d كتل أكثر من الذي فوقه: المجموع بصيغة غاوس.' })}</li>
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
                    stars={staircaseStars(score)}
                    title={`${score} / ${STAIRCASE_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 6 asmatu · 2 izar: 5 · izar 1: 3', es: '3 estrellas: 6 aciertos · 2: 5 · 1: 3', en: '3 stars: 6 correct · 2: 5 · 1: 3', ar: '3 نجوم: 6 إجابات صحيحة · 2: 5 · 1: 3' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${STAIRCASE_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const used = staircaseSum(round.a1, round.d, rows)
    const right = checked && rows === round.rows
    const last = round.a1 + (round.rows - 1) * round.d
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {STAIRCASE_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: STAIRCASE_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <p className="prop3-prompt">
                <strong>{l({ eu: `${round.total} bloke`, es: `${round.total} bloques`, en: `${round.total} blocks`, ar: `${round.total} كتلة` })}</strong>
                {l({ eu: `Goiko ilara: ${round.a1} bloke. Ilara bakoitzak ${round.d} gehiago.`, es: `Fila de arriba: ${round.a1} bloques. Cada fila, ${round.d} más.`, en: `Top row: ${round.a1} blocks. Each row, ${round.d} more.`, ar: `الصف الأعلى: ${round.a1} كتل. وكل صف ${round.d} أكثر.` })}
            </p>
            <Stairs round={round} rows={rows} />
            <div className="prop3-buttons" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <button type="button" disabled={checked || rows <= 1} onClick={() => setRows(rows - 1)}>−</button>
                <span className="prop3-sum" style={{ alignSelf: 'center' }}>{l({ eu: `${rows} ilara`, es: `${rows} filas`, en: `${rows} rows`, ar: `${rows} صفوف` })}</span>
                <button type="button" disabled={checked || rows >= STAIRCASE_ROWS_MAX} onClick={() => setRows(rows + 1)}>+</button>
            </div>
            <p className={`prop3-sum ${used > round.total ? 'over' : ''}`}>{l({ eu: `Erabilitako blokeak: ${used} / ${round.total}`, es: `Bloques usados: ${used} / ${round.total}`, en: `Blocks used: ${used} / ${round.total}`, ar: `الكتل المستعملة: ⁦${used} / ${round.total}⁩` })}</p>
            {!checked && <button type="button" className="fraction-v2-primary" onClick={check}>{l({ eu: 'Egiaztatu', es: 'Comprobar', en: 'Check', ar: 'تحقق' })}</button>}
            {checked && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Justu-justu!', es: '¡Justo!', en: 'Exactly right!', ar: 'بالضبط!' }) : l({ eu: `Ez: ${round.rows} ilara ziren.`, es: `No: eran ${round.rows} filas.`, en: `No: it was ${round.rows} rows.`, ar: `لا: كانت ${round.rows} صفوف.` })}</strong></p>
                    <p dir="ltr">{`S = (${round.a1} + ${last}) · ${round.rows} : 2 = ${round.total}`}</p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= STAIRCASE_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
