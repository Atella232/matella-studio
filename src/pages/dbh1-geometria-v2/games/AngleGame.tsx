import { useState, type FormEvent } from 'react'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { ANGLE_ROUNDS, anglePoints, angleStars, createAngleRound } from './boards'
import { GeometryGameArt } from './GameArt'
import { geometryGames } from './info'

type Phase = 'pick' | 'playing' | 'finished'

const game = geometryGames.find((item) => item.id === 'angles')!
const rad = (degrees: number) => (degrees * Math.PI) / 180

function AngleDrawing({ value, guess }: { value: number; guess: number | null }) {
    const cx = 200
    const cy = 150
    const r = 120
    const point = (angle: number, radius: number) => [cx + radius * Math.cos(rad(angle)), cy - radius * Math.sin(rad(angle))]
    const [ex, ey] = point(value, r)
    const [ax, ay] = point(value, 36)
    return (
        <svg viewBox="0 0 400 300" role="img" aria-label="?°" className="geometry-angle-game-figure">
            <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="var(--ink)" strokeWidth={4} strokeLinecap="round" />
            <line x1={cx} y1={cy} x2={ex} y2={ey} stroke="var(--blue, #2f6fdb)" strokeWidth={4} strokeLinecap="round" />
            <path d={`M${cx + 36} ${cy} A36 36 0 ${value > 180 ? 1 : 0} 0 ${ax} ${ay}`} fill="none" stroke="var(--coral, #c4432a)" strokeWidth={3} />
            {guess !== null && (() => {
                const [gx, gy] = point(guess, r)
                return <line x1={cx} y1={cy} x2={gx} y2={gy} stroke="var(--mustard, #e0a100)" strokeWidth={3} strokeDasharray="8 6" />
            })()}
            <circle cx={cx} cy={cy} r={6} fill="var(--ink)" />
        </svg>
    )
}

export function AngleGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [values, setValues] = useState<number[]>([])
    const [index, setIndex] = useState(0)
    const [input, setInput] = useState('')
    const [last, setLast] = useState<{ guess: number; value: number; points: number } | null>(null)
    const [total, setTotal] = useState(0)

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setValues(createAngleRound(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setInput('')
        setLast(null)
        setTotal(0)
        setPhase('playing')
    }

    const submit = (event: FormEvent) => {
        event.preventDefault()
        if (last) {
            // Second press: next angle
            setLast(null)
            setInput('')
            if (index + 1 < values.length) setIndex(index + 1)
            else {
                onResult(level, { stars: angleStars(total), score: total, timeMs: null })
                setPhase('finished')
            }
            return
        }
        const guess = Number(input.replace(',', '.'))
        if (!Number.isFinite(guess) || input.trim() === '') return
        const points = anglePoints(guess, values[index])
        setLast({ guess, value: values[index], points })
        setTotal((sum) => sum + points)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<GeometryGameArt game="angles" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${record.score} ${l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${ANGLE_ROUNDS} angelu. Idatzi zenbat gradu dituen uste duzun.`, es: `${ANGLE_ROUNDS} ángulos. Escribe cuántos grados crees que mide.`, ar: `${ANGLE_ROUNDS} زوايا. اكتب كم درجة تظن أنها تقيس.` })}</li>
                        <li>{l({ eu: '5°-ko errorea gehienez: 3 puntu; 15°: 2; 30°: 1.', es: 'Error de 5° como máximo: 3 puntos; 15°: 2; 30°: 1.', ar: 'خطأ 5° على الأكثر: 3 نقاط؛ 15°: 2؛ 30°: 1.' })}</li>
                        <li>{l({ eu: 'Konparatu angelu zuzenarekin (90°) eta lauarekin (180°).', es: 'Compara con el recto (90°) y el llano (180°).', ar: 'قارن بالقائمة (90°) والمستقيمة (180°).' })}</li>
                    </ul>
                )}
            />
        )
    }

    return (
        <div className="geometry-angle-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{Math.min(index + 1, ANGLE_ROUNDS)} / {ANGLE_ROUNDS}</span>
                <span>{total} {l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}</span>
            </GameTopbar>

            {phase === 'playing' && values[index] !== undefined && (
                <form className="geometry-angle-game-card" onSubmit={submit}>
                    <AngleDrawing value={values[index]} guess={last?.guess ?? null} />
                    {!last && (
                        <label>
                            <input value={input} onChange={(event) => setInput(event.target.value)} inputMode="numeric" autoFocus aria-label={l({ eu: 'Zure estimazioa graduetan', es: 'Tu estimación en grados', ar: 'تقديرك بالدرجات' })} dir="ltr" />
                            <span>°</span>
                        </label>
                    )}
                    <div aria-live="polite">
                        {last && (
                            <div className={`fraction-v2-feedback ${last.points >= 2 ? 'success' : 'error'}`}>
                                {l({ eu: `${last.value}° zen; zuk ${last.guess}° esan duzu: +${last.points} puntu.`, es: `Medía ${last.value}°; has dicho ${last.guess}°: +${last.points} puntos.`, ar: `كانت ${last.value}°؛ قلت ${last.guess}°: +${last.points} نقطة.` })}
                            </div>
                        )}
                    </div>
                    <button type="submit" className="fraction-v2-primary">{last ? l({ eu: 'Hurrengoa', es: 'Siguiente', ar: 'التالي' }) : l({ eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقّق' })}</button>
                </form>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={angleStars(total)}
                    title={l({ eu: `${total} puntu`, es: `${total} puntos`, ar: `${total} نقطة` })}
                    subtitle={l({ eu: '3 izar: 24 puntu edo gehiago · 2 izar: 16', es: '3 estrellas: 24 puntos o más · 2: 16', ar: '3 نجوم: 24 نقطة أو أكثر · 2: 16' })}
                    stats={[{ label: l({ eu: 'Puntuak', es: 'Puntos', ar: 'النقاط' }), value: `${total} / ${ANGLE_ROUNDS * 3}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            )}
        </div>
    )
}
