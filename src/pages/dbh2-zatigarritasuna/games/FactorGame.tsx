import { useEffect, useRef, useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { formatTime, nowMs, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { rekin } from '../basque'
import { factorize, factorLatex } from '../math'
import { createFactorNumbers, FACTOR_NUMBERS, FACTOR_PENALTY_MS, factorLevels, factorParTime, factorStars, type FactorLevel } from './factor'
import { DivisibilityGameArt } from './GameArt'
import { divisibilityGames } from './info'

type Phase = 'pick' | 'playing' | 'finished'

const defaultGame = divisibilityGames.find((item) => item.id === 'factor')!

/** Lets the 1. DBH unit reuse the game with its own levels and level list */
export interface FactorGameConfig {
    game: GameInfo<string>
    levels?: FactorLevel[]
}

export function FactorGame({ language, records, onResult, onExit, config }: GameProps & { config?: FactorGameConfig }) {
    const game = config?.game ?? defaultGame
    const levels = config?.levels ?? factorLevels
    const l = useGameText(language)
    const startedAt = useRef(0)
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [numbers, setNumbers] = useState<number[]>([])
    const [index, setIndex] = useState(0)
    const [steps, setSteps] = useState<number[]>([])
    const [rejected, setRejected] = useState<number | null>(null)
    const [lastDone, setLastDone] = useState<number | null>(null)
    const [mistakes, setMistakes] = useState(0)
    const [penalty, setPenalty] = useState(0)
    const [elapsed, setElapsed] = useState(0)

    const start = (nextLevel: number) => {
        startedAt.current = nowMs()
        setLevel(nextLevel)
        setNumbers(createFactorNumbers(createRandom(randomSeed()), nextLevel, levels))
        setIndex(0)
        setSteps([])
        setRejected(null)
        setLastDone(null)
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

    const value = numbers[index] ?? 1
    const rest = steps.reduce((current, prime) => current / prime, value)

    const divide = (prime: number) => {
        if (phase !== 'playing') return
        if (rest % prime !== 0) {
            setRejected(prime)
            setMistakes((count) => count + 1)
            setPenalty((total) => total + FACTOR_PENALTY_MS)
            return
        }
        setRejected(null)
        if (rest / prime !== 1) {
            setSteps([...steps, prime])
            return
        }
        setLastDone(value)
        if (index + 1 < FACTOR_NUMBERS) {
            setIndex(index + 1)
            setSteps([])
            return
        }
        const time = nowMs() - startedAt.current
        setElapsed(time)
        onResult(level, { stars: factorStars(level, time + penalty, mistakes, levels), score: -mistakes, timeMs: time + penalty })
        setPhase('finished')
    }

    // Keys 2, 3, 5 and 7 divide, so the game can be played from the keyboard
    useEffect(() => {
        if (phase !== 'playing') return
        const onKey = (event: KeyboardEvent) => {
            if (event.metaKey || event.ctrlKey || event.altKey) return
            const prime = Number(event.key)
            if (levels[level].primes.includes(prime)) {
                event.preventDefault()
                divide(prime)
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    })

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<DivisibilityGameArt game="factor" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => (record.timeMs === null ? '' : `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${formatTime(record.timeMs)}`)}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${FACTOR_NUMBERS} zenbaki. Sakatu zenbakia zehazki zatitzen duen lehen bat; 1era iristean, hurrengoa.`, es: `${FACTOR_NUMBERS} números. Pulsa un primo que divida exactamente al número; al llegar a 1, el siguiente.`, ar: `${FACTOR_NUMBERS} أعداد. اضغط عددًا أوليًا يقسم العدد قسمة تامة؛ وعند الوصول إلى 1 ننتقل إلى التالي.` })}</li>
                        <li>{l({ eu: `Zatitzen ez duen lehen bakoitzak +${FACTOR_PENALTY_MS / 1000} s gehitzen ditu. Erabili irizpideak!`, es: `Cada primo que no divide suma +${FACTOR_PENALTY_MS / 1000} s. ¡Usa los criterios!`, ar: `كل عدد أولي لا يقسم يضيف ${FACTOR_PENALTY_MS / 1000} ث. استعمل القواعد!` })}</li>
                        <li>{l({ eu: 'Teklatuarekin ere joka daiteke: 2, 3, 5, 7.', es: 'También se puede jugar con el teclado: 2, 3, 5, 7.', ar: 'يمكن اللعب بلوحة المفاتيح أيضًا: 2، 3، 5، 7.' })}</li>
                    </ul>
                )}
            />
        )
    }

    const par = factorParTime(level, levels)
    const total = elapsed + penalty

    return (
        <div className="divisibility-factor" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{Math.min(index + 1, FACTOR_NUMBERS)} / {FACTOR_NUMBERS}</span>
                <span>{formatTime(total)}</span>
                <span>{l({ eu: 'Akatsak', es: 'Fallos', ar: 'الأخطاء' })}: {mistakes}</span>
            </GameTopbar>

            {phase === 'playing' && (
                <>
                    <div className="divisibility-factor-board" dir="ltr">
                        <div className="divisibility-factor-number" aria-live="polite">
                            <small>{value}{steps.length > 0 && ` = ${steps.join(' · ')} · ${rest}`}</small>
                            <strong key={`${index}-${steps.length}`}>{rest}</strong>
                        </div>
                        <div className="divisibility-factor-buttons" role="group" aria-label={l({ eu: 'Zatitu honekin', es: 'Dividir entre', ar: 'اقسم على' })}>
                            {levels[level].primes.map((prime) => (
                                <button type="button" className={rejected === prime ? 'rejected' : ''} onClick={() => divide(prime)} key={`${prime}-${rejected === prime ? mistakes : 0}`}>{prime}</button>
                            ))}
                        </div>
                    </div>
                    <div aria-live="polite">
                        {rejected !== null && (
                            <div className="fraction-v2-feedback error">
                                {l({ eu: `${rest} ez da ${rekin(rejected)} zatigarria (hondarra ${rest % rejected}). +${FACTOR_PENALTY_MS / 1000} s`, es: `${rest} no es divisible por ${rejected} (resto ${rest % rejected}). +${FACTOR_PENALTY_MS / 1000} s`, ar: `${rest} لا يقبل القسمة على ${rejected} (الباقي ${rest % rejected}). ‏+${FACTOR_PENALTY_MS / 1000} ث` })}
                            </div>
                        )}
                        {rejected === null && lastDone !== null && (
                            <div className="fraction-v2-feedback success"><MathText text={`$${lastDone}=${factorLatex(factorize(lastDone))}$`} /></div>
                        )}
                    </div>
                </>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={factorStars(level, total, mistakes, levels)}
                    title={l({ eu: 'Denak deskonposatuta!', es: '¡Todos descompuestos!', ar: 'تم تحليل الجميع!' })}
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
