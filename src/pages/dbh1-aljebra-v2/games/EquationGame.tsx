import { useEffect, useRef, useState, type FormEvent } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { formatTime, nowMs, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { checkAnswer, fraction } from '../../../features/unit-v2/math/fraction'
import { createEquationRound, EQUATION_PENALTY_MS, equationParTime, equationStars, EQUATIONS_PER_ROUND, type EquationItem } from './equations'
import { AlgebraGameArt } from './GameArt'
import { algebraGames } from './info'

type Phase = 'pick' | 'playing' | 'finished'

const game = algebraGames.find((item) => item.id === 'balance')!

export function EquationGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const startedAt = useRef(0)
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [items, setItems] = useState<EquationItem[]>([])
    const [index, setIndex] = useState(0)
    const [answer, setAnswer] = useState('')
    const [wrong, setWrong] = useState(false)
    const [mistakes, setMistakes] = useState(0)
    const [penalty, setPenalty] = useState(0)
    const [elapsed, setElapsed] = useState(0)

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setItems(createEquationRound(createRandom(randomSeed()), nextLevel))
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
            setPenalty((total) => total + EQUATION_PENALTY_MS)
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
        onResult(level, { stars: equationStars(level, time + penalty, mistakes), score: -mistakes, timeMs: time + penalty })
        setPhase('finished')
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<AlgebraGameArt game="balance" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => (record.timeMs === null ? '' : `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${formatTime(record.timeMs)}`)}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${EQUATIONS_PER_ROUND} ekuazio. Idatzi x-ren balioa eta sakatu Enter.`, es: `${EQUATIONS_PER_ROUND} ecuaciones. Escribe el valor de x y pulsa Intro.`, ar: `${EQUATIONS_PER_ROUND} معادلات. اكتب قيمة x واضغط إدخال.` })}</li>
                        <li>{l({ eu: `Erantzun oker bakoitzak +${EQUATION_PENALTY_MS / 1000} s gehitzen ditu.`, es: `Cada respuesta equivocada suma +${EQUATION_PENALTY_MS / 1000} s.`, ar: `كل إجابة خاطئة تضيف ${EQUATION_PENALTY_MS / 1000} ث.` })}</li>
                        <li>{l({ eu: 'Batzen ari dena kentzen pasatzen da; biderkatzen ari dena, zatitzen.', es: 'Lo que suma pasa restando; lo que multiplica, dividiendo.', ar: 'ما يُجمع ينتقل مطروحًا، وما يَضرب ينتقل قاسمًا.' })}</li>
                    </ul>
                )}
            />
        )
    }

    const par = equationParTime(level)
    const total = elapsed + penalty
    const item = items[index]

    return (
        <div className="algebra-equation-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{Math.min(index + 1, EQUATIONS_PER_ROUND)} / {EQUATIONS_PER_ROUND}</span>
                <span>{formatTime(total)}</span>
                <span>{l({ eu: 'Akatsak', es: 'Fallos', ar: 'الأخطاء' })}: {mistakes}</span>
            </GameTopbar>

            {phase === 'playing' && item && (
                <form className="algebra-equation-card" onSubmit={submit}>
                    <p className="algebra-equation-latex" dir="ltr"><MathText text={`$${item.latex}$`} /></p>
                    <label>
                        <span>x =</span>
                        <input value={answer} onChange={(event) => { setAnswer(event.target.value); setWrong(false) }} inputMode="text" autoFocus aria-invalid={wrong} dir="ltr" />
                    </label>
                    <button type="submit" className="fraction-v2-primary">{l({ eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقّق' })}</button>
                    <div aria-live="polite">
                        {wrong && <div className="fraction-v2-feedback error">{l({ eu: `Ez da hori. Ordeztu x eta egiaztatu. +${EQUATION_PENALTY_MS / 1000} s`, es: `No es eso. Sustituye la x y comprueba. +${EQUATION_PENALTY_MS / 1000} s`, ar: `ليس هذا. عوّض x وتحقّق. +${EQUATION_PENALTY_MS / 1000} ث` })}</div>}
                    </div>
                </form>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={equationStars(level, total, mistakes)}
                    title={l({ eu: 'Balantza orekatuta!', es: '¡Balanza equilibrada!', ar: 'الميزان متوازن!' })}
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
