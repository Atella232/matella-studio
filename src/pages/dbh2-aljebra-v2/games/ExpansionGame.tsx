import { useEffect, useRef, useState, type FormEvent } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { formatTime, nowMs, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { checkAnswer, fraction } from '../../../features/unit-v2/math/fraction'
import { createExpansionRound, EXPANSION_PENALTY_MS, expansionAskText, expansionParTime, expansionStars, EXPANSIONS_PER_ROUND, type ExpansionItem } from './boards'
import { AlgebraGameArt } from './GameArt'
import { algebraGames } from './info'

type Phase = 'pick' | 'playing' | 'finished'

const game = algebraGames.find((item) => item.id === 'expand')!

export function ExpansionGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const startedAt = useRef(0)
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [items, setItems] = useState<ExpansionItem[]>([])
    const [index, setIndex] = useState(0)
    const [answer, setAnswer] = useState('')
    const [wrong, setWrong] = useState(false)
    const [mistakes, setMistakes] = useState(0)
    const [penalty, setPenalty] = useState(0)
    const [elapsed, setElapsed] = useState(0)

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setItems(createExpansionRound(createRandom(randomSeed()), nextLevel))
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
            setPenalty((total) => total + EXPANSION_PENALTY_MS)
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
        onResult(level, { stars: expansionStars(level, time + penalty, mistakes), score: -mistakes, timeMs: time + penalty })
        setPhase('finished')
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<AlgebraGameArt game="expand" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => (record.timeMs === null ? '' : `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${formatTime(record.timeMs)}`)}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${EXPANSIONS_PER_ROUND} biderkadura. Idatzi eskatzen den zenbakia (x-ren koefizientea edo gai askea) eta sakatu Enter.`, es: `${EXPANSIONS_PER_ROUND} productos. Escribe el número que se pide (coeficiente de x o término independiente) y pulsa Intro.`, ar: `${EXPANSIONS_PER_ROUND} جداءات. اكتب العدد المطلوب (معامل x أو الحد الثابت) واضغط إدخال.` })}</li>
                        <li>{l({ eu: `Erantzun oker bakoitzak +${EXPANSION_PENALTY_MS / 1000} s gehitzen ditu.`, es: `Cada respuesta equivocada suma +${EXPANSION_PENALTY_MS / 1000} s.`, ar: `كل إجابة خاطئة تضيف ${EXPANSION_PENALTY_MS / 1000} ث.` })}</li>
                        <li>{l({ eu: '(x + a)(x + b): x-ren koefizientea a + b, gai askea a · b.', es: '(x + a)(x + b): coeficiente de x, a + b; término independiente, a · b.', ar: '(x + a)(x + b): معامل x هو a + b والحد الثابت a · b.' })}</li>
                    </ul>
                )}
            />
        )
    }

    const par = expansionParTime(level)
    const total = elapsed + penalty
    const item = items[index]

    return (
        <div className="algebra-equation-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{Math.min(index + 1, EXPANSIONS_PER_ROUND)} / {EXPANSIONS_PER_ROUND}</span>
                <span>{formatTime(total)}</span>
                <span>{l({ eu: 'Akatsak', es: 'Fallos', ar: 'الأخطاء' })}: {mistakes}</span>
            </GameTopbar>

            {phase === 'playing' && item && (
                <form className="algebra-equation-card" onSubmit={submit}>
                    <p className="algebra-equation-latex" dir="ltr"><MathText text={`$${item.latex}$`} /></p>
                    <label>
                        <span>{l(expansionAskText[item.ask])} =</span>
                        <input value={answer} onChange={(event) => { setAnswer(event.target.value); setWrong(false) }} inputMode="text" autoFocus aria-invalid={wrong} dir="ltr" />
                    </label>
                    <button type="submit" className="fraction-v2-primary">{l({ eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقّق' })}</button>
                    <div aria-live="polite">
                        {wrong && <div className="fraction-v2-feedback error">{l({ eu: `Ez da hori. Gogoratu: bikoitza bider biderkadura. +${EXPANSION_PENALTY_MS / 1000} s`, es: `No es eso. Recuerda: el doble del producto. +${EXPANSION_PENALTY_MS / 1000} s`, ar: `ليس هذا. تذكّر: ضعف الجداء. +${EXPANSION_PENALTY_MS / 1000} ث` })}</div>}
                    </div>
                </form>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={expansionStars(level, total, mistakes)}
                    title={l({ eu: 'Garapen guztiak eginda!', es: '¡Todos desarrollados!', ar: 'تم نشر الكل!' })}
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
