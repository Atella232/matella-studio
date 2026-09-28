import { useState, type FormEvent } from 'react'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { createMeanRound, MEAN_ROUNDS, meanLevels, meanOfData, meanPoints, meanStars } from './boards'
import { StatisticsGameArt } from './GameArt'
import { statisticsGames } from './info'

type Phase = 'pick' | 'playing' | 'finished'

/** A value with two decimals at most, comma in Basque and Spanish */
const shown = (value: number, language: string) => { const text = String(Math.round(value * 100) / 100); return language === 'ar' ? text : text.replace('.', ',') }

const game = statisticsGames.find((item) => item.id === 'mean')!

function DataDrawing({ values, max, guess }: { values: number[]; max: number; guess: number | null }) {
    const x = (value: number) => 30 + (value / max) * 360
    const levels = new Map<number, number>()
    const dots = values.map((value) => {
        const level = levels.get(value) ?? 0
        levels.set(value, level + 1)
        return { value, level }
    })
    const mean = meanOfData(values)
    return (
        <svg viewBox="0 0 420 220" role="img" aria-label={values.join(', ')} className="statistics-mean-game-figure">
            <line x1={20} y1={150} x2={400} y2={150} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
            {Array.from({ length: max + 1 }, (_, value) => value).filter((value) => max <= 10 || value % 2 === 0).map((value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={144} y2={156} stroke="var(--ink)" strokeWidth={1.4} />
                    <text x={x(value)} y={178} textAnchor="middle" fontSize={14} fill="var(--ink)">{value}</text>
                </g>
            ))}
            {dots.map((dot, index) => <circle key={index} cx={x(dot.value)} cy={134 - dot.level * 22} r={9} fill="var(--blue-tint, #dde7f7)" stroke="var(--blue, #2f6fdb)" strokeWidth={2.4} />)}
            {guess !== null && (
                <>
                    <polygon points={`${x(guess)},154 ${x(guess) - 11},176 ${x(guess) + 11},176`} fill="var(--mustard, #e0a100)" stroke="var(--ink)" strokeWidth={1.4} />
                    <polygon points={`${x(mean)},154 ${x(mean) - 11},176 ${x(mean) + 11},176`} fill="var(--coral, #c4432a)" stroke="var(--ink)" strokeWidth={1.4} opacity={0.85} />
                    <text x={x(mean)} y={204} textAnchor="middle" fontSize={15} fontWeight={700} fill="var(--coral, #c4432a)">x̄</text>
                </>
            )}
        </svg>
    )
}

export function MeanGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [values, setValues] = useState<number[][]>([])
    const [index, setIndex] = useState(0)
    const [input, setInput] = useState('')
    const [last, setLast] = useState<{ guess: number; mean: number; points: number } | null>(null)
    const [total, setTotal] = useState(0)

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setValues(createMeanRound(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setInput('')
        setLast(null)
        setTotal(0)
        setPhase('playing')
    }

    const submit = (event: FormEvent) => {
        event.preventDefault()
        if (last) {
            // Second press: next data set
            setLast(null)
            setInput('')
            if (index + 1 < values.length) setIndex(index + 1)
            else {
                onResult(level, { stars: meanStars(total), score: total, timeMs: null })
                setPhase('finished')
            }
            return
        }
        const guess = Number(input.replace(',', '.'))
        if (!Number.isFinite(guess) || input.trim() === '') return
        const max = meanLevels[level].max
        if (guess < 0 || guess > max) return
        const points = meanPoints(guess, values[index], max)
        setLast({ guess, mean: meanOfData(values[index]), points })
        setTotal((sum) => sum + points)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<StatisticsGameArt game="mean" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${record.score} ${l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${MEAN_ROUNDS} datu-multzo. Idatzi haien batez bestekoa zenbat den uste duzun, kalkulatu gabe.`, es: `${MEAN_ROUNDS} conjuntos de datos. Escribe cuánto crees que vale su media, sin calcularla.`, ar: `${MEAN_ROUNDS} مجموعات بيانات. اكتب كم تظن متوسطها دون حساب.` })}</li>
                        <li>{l({ eu: 'Zenbat eta hurbilago, orduan eta puntu gehiago (3 gehienez).', es: 'Cuanto más cerca, más puntos (3 como máximo).', ar: 'كلما اقتربت زادت النقاط (3 على الأكثر).' })}</li>
                        <li>{l({ eu: 'Batez bestekoa oreka-puntua da: datuak bi aldeetan orekatzen dira.', es: 'La media es el punto de equilibrio: los datos se compensan a los dos lados.', ar: 'المتوسط نقطة التوازن: تتعادل البيانات على الجانبين.' })}</li>
                    </ul>
                )}
            />
        )
    }

    return (
        <div className="statistics-mean-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{Math.min(index + 1, MEAN_ROUNDS)} / {MEAN_ROUNDS}</span>
                <span>{total} {l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}</span>
            </GameTopbar>

            {phase === 'playing' && values[index] !== undefined && (
                <form className="statistics-mean-game-card" onSubmit={submit}>
                    <DataDrawing values={values[index]} max={meanLevels[level].max} guess={last?.guess ?? null} />
                    {!last && (
                        <label>
                            <input value={input} onChange={(event) => setInput(event.target.value)} inputMode="decimal" autoFocus aria-label={l({ eu: 'Zure estimazioa', es: 'Tu estimación', ar: 'تقديرك' })} dir="ltr" />
                        </label>
                    )}
                    <div aria-live="polite">
                        {last && (
                            <div className={`fraction-v2-feedback ${last.points >= 2 ? 'success' : 'error'}`}>
                                {l({ eu: `x̄ = ${shown(last.mean, 'eu')}; zuk ${shown(last.guess, 'eu')} esan duzu: +${last.points} puntu.`, es: `x̄ = ${shown(last.mean, 'es')}; has dicho ${shown(last.guess, 'es')}: +${last.points} puntos.`, ar: `x̄ = ${shown(last.mean, 'ar')}؛ قلت ${shown(last.guess, 'ar')}: +${last.points} نقطة.` })}
                            </div>
                        )}
                    </div>
                    <button type="submit" className="fraction-v2-primary">{last ? l({ eu: 'Hurrengoa', es: 'Siguiente', ar: 'التالي' }) : l({ eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقّق' })}</button>
                </form>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={meanStars(total)}
                    title={l({ eu: `${total} puntu`, es: `${total} puntos`, ar: `${total} نقطة` })}
                    subtitle={l({ eu: '3 izar: 20 puntu edo gehiago · 2 izar: 13', es: '3 estrellas: 20 puntos o más · 2: 13', ar: '3 نجوم: 20 نقطة أو أكثر · 2: 13' })}
                    stats={[{ label: l({ eu: 'Puntuak', es: 'Puntos', ar: 'النقاط' }), value: `${total} / ${MEAN_ROUNDS * 3}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            )}
        </div>
    )
}
