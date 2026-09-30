import { useEffect, useRef, useState, type FormEvent } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { formatTime, nowMs, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { checkAnswer, fraction } from '../../../features/unit-v2/math/fraction'
import { createSolveRound, SOLVE_PENALTY_MS, solveParTime, solveStars, SOLVES_PER_ROUND, type SolveItem } from './boards'
import { EquationsGameArt } from './GameArt'
import { equationsGames } from './info'

type Phase = 'pick' | 'playing' | 'finished'

const game = equationsGames.find((item) => item.id === 'solve')!

export function SolveGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const startedAt = useRef(0)
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [items, setItems] = useState<SolveItem[]>([])
    const [index, setIndex] = useState(0)
    const [answer, setAnswer] = useState('')
    const [wrong, setWrong] = useState(false)
    const [mistakes, setMistakes] = useState(0)
    const [penalty, setPenalty] = useState(0)
    const [elapsed, setElapsed] = useState(0)

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setItems(createSolveRound(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setAnswer('')
        setWrong(false)
        setMistakes(0)
        setPenalty(0)
        setElapsed(0)
        startedAt.current = nowMs()
        setPhase('playing')
    }

    useEffect(() => {
        if (phase !== 'playing') return
        const timer = window.setInterval(() => setElapsed(nowMs() - startedAt.current), 200)
        return () => window.clearInterval(timer)
    }, [phase])

    const submit = (event: FormEvent) => {
        event.preventDefault()
        const item = items[index]
        if (!item || !answer.trim()) return
        if (checkAnswer(answer, fraction(item.answer)) !== 'correct') {
            setWrong(true)
            setMistakes((count) => count + 1)
            setPenalty((total) => total + SOLVE_PENALTY_MS)
            return
        }
        setWrong(false)
        setAnswer('')
        if (index + 1 < items.length) {
            setIndex(index + 1)
            return
        }
        const time = nowMs() - startedAt.current
        setElapsed(time)
        onResult(level, { stars: solveStars(level, time + penalty, mistakes), score: -mistakes, timeMs: time + penalty })
        setPhase('finished')
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<EquationsGameArt game="solve" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => (record.timeMs === null ? '' : `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${formatTime(record.timeMs)}`)}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${SOLVES_PER_ROUND} ekuazio. Idatzi x-ren balioa eta sakatu Enter.`, es: `${SOLVES_PER_ROUND} ecuaciones. Escribe el valor de x y pulsa Intro.`, ar: `${SOLVES_PER_ROUND} معادلات. اكتب قيمة x واضغط إدخال.` })}</li>
                        <li>{l({ eu: `Erantzun oker bakoitzak +${SOLVE_PENALTY_MS / 1000} s gehitzen ditu.`, es: `Cada respuesta equivocada suma +${SOLVE_PENALTY_MS / 1000} s.`, ar: `كل إجابة خاطئة تضيف ${SOLVE_PENALTY_MS / 1000} ث.` })}</li>
                        <li>{l({ eu: 'Bigarren mailako ekuazioetan, idatzi ebazpen handiena.', es: 'En las de segundo grado, escribe la solución mayor.', ar: 'في معادلات الدرجة الثانية اكتب الحل الأكبر.' })}</li>
                    </ul>
                )}
            />
        )
    }

    const par = solveParTime(level)
    const total = elapsed + penalty
    const item = items[index]

    return (
        <div className="algebra-equation-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{Math.min(index + 1, SOLVES_PER_ROUND)} / {SOLVES_PER_ROUND}</span>
                <span>{formatTime(total)}</span>
                <span>{l({ eu: 'Akatsak', es: 'Fallos', ar: 'الأخطاء' })}: {mistakes}</span>
            </GameTopbar>

            {phase === 'playing' && item && (
                <form className="algebra-equation-card" onSubmit={submit}>
                    <p className="algebra-equation-latex" dir="ltr"><MathText text={`$${item.latex}$`} /></p>
                    <label>
                        <span>{item.larger ? l({ eu: 'x (handiena) =', es: 'x (la mayor) =', ar: 'x (الأكبر) =' }) : 'x ='}</span>
                        <input value={answer} onChange={(event) => { setAnswer(event.target.value); setWrong(false) }} inputMode="text" autoFocus aria-invalid={wrong} dir="ltr" />
                    </label>
                    <button type="submit" className="fraction-v2-primary">{l({ eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقّق' })}</button>
                    <div aria-live="polite">
                        {wrong && <div className="fraction-v2-feedback error">{l({ eu: `Ez da hori. Ordeztu x eta egiaztatu. +${SOLVE_PENALTY_MS / 1000} s`, es: `No es eso. Sustituye la x y comprueba. +${SOLVE_PENALTY_MS / 1000} s`, ar: `ليس هذا. عوّض x وتحقّق. +${SOLVE_PENALTY_MS / 1000} ث` })}</div>}
                    </div>
                </form>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={solveStars(level, total, mistakes)}
                    title={l({ eu: 'Ekuazio guztiak ebatzita!', es: '¡Todas resueltas!', ar: 'حُلّت كل المعادلات!' })}
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
