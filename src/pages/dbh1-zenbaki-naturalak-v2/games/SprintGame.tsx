import { useEffect, useRef, useState, type ReactNode } from 'react'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { formatTime, nowMs, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed, type Random } from '../../../features/unit-v2/games/random'
import { isMulDiv, type Expr, type ExprPath, type StepCheck } from '../../../features/unit-v2/math/expression'
import { formatNatural } from '../format'
import { NaturalsGameArt } from './GameArt'
import { naturalsGames } from './info'
import { createSprintExpression, SPRINT_EXPRESSIONS, SPRINT_PENALTY_MS, sprintParTime, sprintStars, tapOperation } from './sprint'

type Phase = 'pick' | 'playing' | 'finished'

const game = naturalsGames.find((item) => item.id === 'sprint')!
const opSymbol = { '+': '+', '-': '−', '·': '·', ':': ':' } as const

export function SprintGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const random = useRef<Random>(createRandom(randomSeed()))
    const startedAt = useRef(0)
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [index, setIndex] = useState(0)
    const [expr, setExpr] = useState<Expr | null>(null)
    const [lines, setLines] = useState<Expr[]>([])
    const [verdict, setVerdict] = useState<Exclude<StepCheck, 'ok'> | null>(null)
    const [mistakes, setMistakes] = useState(0)
    const [penalty, setPenalty] = useState(0)
    const [elapsed, setElapsed] = useState(0)

    const start = (nextLevel: number) => {
        random.current = createRandom(randomSeed())
        startedAt.current = nowMs()
        setLevel(nextLevel)
        setIndex(0)
        setExpr(createSprintExpression(random.current, nextLevel))
        setLines([])
        setVerdict(null)
        setMistakes(0)
        setPenalty(0)
        setElapsed(0)
        setPhase('playing')
    }

    useEffect(() => {
        if (phase !== 'playing') return
        const timer = window.setInterval(() => setElapsed(nowMs() - startedAt.current), 200)
        return () => window.clearInterval(timer)
    }, [phase])

    const tap = (path: ExprPath) => {
        if (!expr) return
        const result = tapOperation(expr, path)
        if (result.verdict !== 'ok') {
            setVerdict(result.verdict)
            setMistakes((count) => count + 1)
            setPenalty((total) => total + SPRINT_PENALTY_MS)
            return
        }
        setVerdict(null)
        if (result.expr.kind !== 'num') {
            setLines([...lines, expr])
            setExpr(result.expr)
            return
        }
        if (index + 1 < SPRINT_EXPRESSIONS) {
            setIndex(index + 1)
            setLines([])
            setExpr(createSprintExpression(random.current, level))
            return
        }
        const time = nowMs() - startedAt.current
        setElapsed(time)
        onResult(level, { stars: sprintStars(level, time + penalty, mistakes), score: -mistakes, timeMs: time + penalty })
        setPhase('finished')
    }

    const text = (node: Expr): string => {
        if (node.kind === 'num') return formatNatural(node.value)
        if (node.kind === 'group') return node.bracket === 'square' ? `[${text(node.inner)}]` : `(${text(node.inner)})`
        return `${text(node.left)} ${opSymbol[node.op]} ${text(node.right)}`
    }

    const render = (node: Expr, path: ExprPath): ReactNode => {
        if (node.kind === 'num') return <span className="naturals-sem-num" key={path.join('')}>{formatNatural(node.value)}</span>
        if (node.kind === 'group') {
            const [open, close] = node.bracket === 'square' ? ['[', ']'] : ['(', ')']
            return (
                <span className="naturals-sem-group" key={path.join('')}>
                    <span className="naturals-sem-bracket">{open}</span>
                    {render(node.inner, [...path, 'i'])}
                    <span className="naturals-sem-bracket">{close}</span>
                </span>
            )
        }
        return (
            <span className="naturals-sem-bin" key={path.join('')}>
                {render(node.left, [...path, 'l'])}
                <button type="button" className={`naturals-sem-op ${isMulDiv(node.op) ? 'yellow' : 'green'}`} onClick={() => tap(path)} aria-label={`${l({ eu: 'Eragiketa', es: 'Operación', ar: 'العملية' })} ${opSymbol[node.op]}`}>
                    {opSymbol[node.op]}
                </button>
                {render(node.right, [...path, 'r'])}
            </span>
        )
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<NaturalsGameArt game="sprint" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => (record.timeMs === null ? '' : `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${formatTime(record.timeMs)}`)}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${SPRINT_EXPRESSIONS} eragiketa. Sakatu hurrengo eragiketaren ikurra; makinak kalkulatzen du emaitza.`, es: `${SPRINT_EXPRESSIONS} operaciones. Pulsa el signo de la siguiente operación; la máquina calcula el resultado.`, ar: `${SPRINT_EXPRESSIONS} عمليات. اضغط رمز العملية التالية؛ والآلة تحسب النتيجة.` })}</li>
                        <li>{l({ eu: 'Gorria (parentesiak) → horia (· eta :) → berdea (+ eta −), ezkerretik eskuinera.', es: 'Rojo (paréntesis) → amarillo (· y :) → verde (+ y −), de izquierda a derecha.', ar: 'الأحمر (الأقواس) ← الأصفر (· و:) ← الأخضر (+ و−)، من اليسار إلى اليمين.' })}</li>
                        <li>{l({ eu: `Ordena oker bakoitzak +${SPRINT_PENALTY_MS / 1000} s gehitzen ditu.`, es: `Cada orden equivocado suma +${SPRINT_PENALTY_MS / 1000} s.`, ar: `كل ترتيب خاطئ يضيف ${SPRINT_PENALTY_MS / 1000} ث.` })}</li>
                    </ul>
                )}
            />
        )
    }

    const par = sprintParTime(level)
    const total = elapsed + penalty
    const message = {
        'inside-first': l({ eu: 'Gorria! Parentesiaren barrukoa lehenik.', es: '¡Rojo! Primero lo de dentro del paréntesis.', ar: 'أحمر! ما داخل القوس أولًا.' }),
        'muldiv-first': l({ eu: 'Horia berdearen aurretik: lehenik · eta :.', es: 'El amarillo va antes que el verde: primero · y :.', ar: 'الأصفر قبل الأخضر: أولًا · و :.' }),
        'left-first': l({ eu: 'Kolore berekoak ezkerretik eskuinera.', es: 'Las del mismo color, de izquierda a derecha.', ar: 'العمليات من اللون نفسه من اليسار إلى اليمين.' })
    }

    return (
        <div className="naturals-sprint" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{Math.min(index + 1, SPRINT_EXPRESSIONS)} / {SPRINT_EXPRESSIONS}</span>
                <span>{formatTime(total)}</span>
                <span>{l({ eu: 'Akatsak', es: 'Fallos', ar: 'الأخطاء' })}: {mistakes}</span>
            </GameTopbar>

            {phase === 'playing' && expr && (
                <div className="naturals-sem">
                    {lines.length > 0 && (
                        <ol className="naturals-sem-history" dir="ltr">
                            {lines.map((line, lineIndex) => <li key={lineIndex}>{lineIndex > 0 && '= '}{text(line)}</li>)}
                        </ol>
                    )}
                    <div className="naturals-sem-expr naturals-sprint-expr" dir="ltr">
                        {lines.length > 0 && <span className="naturals-sem-equals">=</span>}
                        {render(expr, [])}
                    </div>
                    <div aria-live="polite">
                        {verdict
                            ? <div className="fraction-v2-feedback error">{message[verdict]} +{SPRINT_PENALTY_MS / 1000} s</div>
                            : <p className="naturals-sprint-tip">{l({ eu: 'Zein da hurrengoa?', es: '¿Cuál va ahora?', ar: 'ما العملية التالية؟' })}</p>}
                    </div>
                </div>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={sprintStars(level, total, mistakes)}
                    title={l({ eu: 'Sprinta amaituta!', es: '¡Sprint terminado!', ar: 'انتهى السباق!' })}
                    subtitle={l({ eu: `3 izar: ${formatTime(par * 0.8)} baino gutxiago eta akats bat gehienez · 2 izar: ${formatTime(par)} baino gutxiago`, es: `3 estrellas: menos de ${formatTime(par * 0.8)} y como mucho un fallo · 2: menos de ${formatTime(par)}`, ar: `3 نجوم: أقل من ${formatTime(par * 0.8)} وخطأ واحد على الأكثر · 2: أقل من ${formatTime(par)}` })}
                    stats={[
                        { label: l({ eu: 'Denbora', es: 'Tiempo', ar: 'الوقت' }), value: formatTime(total) },
                        { label: l({ eu: 'Akatsak', es: 'Fallos', ar: 'الأخطاء' }), value: String(mistakes) }
                    ]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            )}
        </div>
    )
}
