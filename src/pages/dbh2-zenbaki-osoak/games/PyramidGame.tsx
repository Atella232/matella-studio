import { useRef, useState, type ReactNode } from 'react'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { formatTime, nowMs, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed, type Random } from '../../../features/unit-v2/games/random'
import { signed } from '../format'
import { IntegerGameArt } from './GameArt'
import { integerGames } from './info'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import { createPyramid, pyramidLevels, PYRAMIDS_PER_LEVEL, pyramidStars, wrongCells, type Pyramid, type PyramidLevel } from './pyramid'

type Phase = 'pick' | 'playing' | 'solved' | 'finished'

const defaultGame = integerGames.find((item) => item.id === 'pyramid')!

/** Another unit can reuse the game with its own level list and illustration */
export interface PyramidConfig {
    game: GameInfo
    levels: PyramidLevel[]
    art: ReactNode
}

/** Reads what the student typed as an integer: −7, -7, +7, 7 */
function parseInteger(input: string): number | null {
    const cleaned = input.trim().replace(/[−–—]/g, '-').replace(/^\+/, '')
    return /^-?\d+$/.test(cleaned) ? Number(cleaned) : null
}

export function PyramidGame({ language, records, onResult, onExit , config }: GameProps & { config?: PyramidConfig }) {
    const game = config?.game ?? defaultGame
    const levels = config?.levels ?? pyramidLevels
    const l = useGameText(language)
    const random = useRef<Random>(createRandom(randomSeed()))
    const startedAt = useRef(0)
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [round, setRound] = useState(0)
    const [pyramid, setPyramid] = useState<Pyramid | null>(null)
    const [inputs, setInputs] = useState<Record<string, string>>({})
    const [wrong, setWrong] = useState<string[]>([])
    const [missing, setMissing] = useState(false)
    const [mistakes, setMistakes] = useState(0)
    const [time, setTime] = useState(0)
    const op = levels[level].op

    const newPyramid = () => {
        setPyramid(createPyramid(random.current, level, levels))
        setInputs({})
        setWrong([])
        setMissing(false)
    }

    const start = (nextLevel: number) => {
        random.current = createRandom(randomSeed())
        startedAt.current = nowMs()
        setLevel(nextLevel)
        setRound(0)
        setMistakes(0)
        setPyramid(createPyramid(random.current, nextLevel, levels))
        setInputs({})
        setWrong([])
        setMissing(false)
        setPhase('playing')
    }

    const check = () => {
        if (!pyramid) return
        const answers = Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, parseInteger(value)]))
        const hiddenKeys = pyramid.values.flatMap((row, rowIndex) => row.map((_value, index) => `${rowIndex}-${index}`)).filter((key) => {
            const [row, index] = key.split('-').map(Number)
            return !pyramid.given[row][index]
        })
        if (hiddenKeys.some((key) => answers[key] === null || answers[key] === undefined)) {
            setMissing(true)
            return
        }
        setMissing(false)
        const errors = wrongCells(pyramid, answers)
        setWrong(errors)
        if (errors.length > 0) {
            setMistakes((count) => count + errors.length)
            return
        }
        if (round + 1 >= PYRAMIDS_PER_LEVEL) {
            const total = nowMs() - startedAt.current
            setTime(total)
            onResult(level, { stars: pyramidStars(mistakes), score: -mistakes, timeMs: total })
            setPhase('finished')
        } else {
            setPhase('solved')
        }
    }

    const next = () => {
        setRound((value) => value + 1)
        newPyramid()
        setPhase('playing')
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={config?.art ?? <IntegerGameArt game="pyramid" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Akatsak', es: 'Fallos', ar: 'الأخطاء' })}: ${-record.score}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Batuketa-piramidean, adreilu bakoitza azpiko bien batura da. Biderketa-piramidean, biderkadura.', es: 'En la pirámide de sumas, cada ladrillo es la suma de los dos de abajo. En la de productos, el producto.', ar: 'في هرم الجمع، كل طوبة مجموع الطوبتين تحتها. وفي هرم الضرب، حاصل ضربهما.' })}</li>
                        <li>{l({ eu: 'Beheko adreilu bat falta bada, kendu (edo zatitu): goikoa − ezagutzen duzuna.', es: 'Si falta un ladrillo de abajo, resta (o divide): el de arriba − el que conoces.', ar: 'إذا نقصت طوبة سفلية فاطرح (أو اقسم): العلوية − المعروفة.' })}</li>
                        <li>{l({ eu: `${PYRAMIDS_PER_LEVEL} piramide maila bakoitzeko. Akatsik gabe: 3 izar.`, es: `${PYRAMIDS_PER_LEVEL} pirámides por nivel. Sin fallos: 3 estrellas.`, ar: `${PYRAMIDS_PER_LEVEL} أهرام في كل مستوى. دون أخطاء: 3 نجوم.` })}</li>
                    </ul>
                )}
            />
        )
    }

    const levelInfo = game.levels[level]

    return (
        <div className="integers-pyramid-game" data-stage={levelInfo.stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{round + 1} / {PYRAMIDS_PER_LEVEL}</span>
                <span>{l({ eu: 'Akatsak', es: 'Fallos', ar: 'الأخطاء' })}: {mistakes}</span>
            </GameTopbar>

            {(phase === 'playing' || phase === 'solved') && pyramid && (
                <>
                    <p className="integers-pyramid-rule">
                        {op === 'sum'
                            ? l({ eu: 'Adreilu bakoitza = azpiko bien batura', es: 'Cada ladrillo = suma de los dos de abajo', ar: 'كل طوبة = مجموع الطوبتين تحتها' })
                            : l({ eu: 'Adreilu bakoitza = azpiko bien biderkadura', es: 'Cada ladrillo = producto de los dos de abajo', ar: 'كل طوبة = حاصل ضرب الطوبتين تحتها' })}
                    </p>
                    <form
                        className="integers-pyramid"
                        dir="ltr"
                        onSubmit={(event) => { event.preventDefault(); if (phase === 'playing') check() }}
                    >
                        {pyramid.values.map((row, rowIndex) => (
                            <div className="integers-pyramid-row" key={rowIndex}>
                                {row.map((value, index) => {
                                    const key = `${rowIndex}-${index}`
                                    if (pyramid.given[rowIndex][index]) return <span className="integers-brick given" key={key}>{signed(value)}</span>
                                    const isWrong = wrong.includes(key)
                                    return (
                                        <input
                                            className={`integers-brick ${isWrong ? 'wrong' : ''} ${phase === 'solved' ? 'right' : ''}`}
                                            value={inputs[key] ?? ''}
                                            inputMode="text"
                                            autoComplete="off"
                                            aria-label={l({ eu: `${rowIndex + 1}. solairua, ${index + 1}. adreilua`, es: `Piso ${rowIndex + 1}, ladrillo ${index + 1}`, ar: `الطابق ${rowIndex + 1}، الطوبة ${index + 1}` })}
                                            aria-invalid={isWrong}
                                            readOnly={phase === 'solved'}
                                            onChange={(event) => {
                                                const text = event.target.value
                                                setInputs((current) => ({ ...current, [key]: text }))
                                                setWrong((current) => current.filter((item) => item !== key))
                                            }}
                                            key={key}
                                        />
                                    )
                                })}
                            </div>
                        ))}
                        {phase === 'playing' && <button type="submit" className="fraction-v2-primary">{l({ eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقق' })}</button>}
                    </form>
                    <div aria-live="polite">
                        {missing && <div className="fraction-v2-feedback">{l({ eu: 'Bete adreilu guztiak zenbaki osoekin (adib. −7).', es: 'Rellena todos los ladrillos con números enteros (ej. −7).', ar: 'املأ كل الطوبات بأعداد صحيحة (مثل ⁦−7⁩).' })}</div>}
                        {wrong.length > 0 && <div className="fraction-v2-feedback error">{l({ eu: `${wrong.length} adreilu ez dira zuzenak. Begiratu zeinuak.`, es: `${wrong.length} ladrillos no son correctos. Revisa los signos.`, ar: `${wrong.length} طوبات غير صحيحة. راجع الإشارات.` })}</div>}
                        {phase === 'solved' && (
                            <div className="fraction-v2-feedback success integers-pyramid-next">
                                <span>{l({ eu: 'Piramidea osatuta!', es: '¡Pirámide completa!', ar: 'اكتمل الهرم!' })}</span>
                                <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus()}>{l({ eu: 'Hurrengo piramidea', es: 'Siguiente pirámide', ar: 'الهرم التالي' })}</button>
                            </div>
                        )}
                    </div>
                </>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={pyramidStars(mistakes)}
                    title={mistakes === 0 ? l({ eu: 'Akatsik gabe!', es: '¡Sin ningún fallo!', ar: 'دون أي خطأ!' }) : l({ eu: 'Piramideak osatuta', es: 'Pirámides completas', ar: 'اكتملت الأهرام' })}
                    subtitle={l({ eu: '3 izar: akatsik gabe · 2 izar: 2 akats gehienez', es: '3 estrellas: sin fallos · 2: como mucho 2 fallos', ar: '3 نجوم: دون أخطاء · 2: خطآن على الأكثر' })}
                    stats={[
                        { label: l({ eu: 'Akatsak', es: 'Fallos', ar: 'الأخطاء' }), value: String(mistakes) },
                        { label: l({ eu: 'Denbora', es: 'Tiempo', ar: 'الوقت' }), value: formatTime(time) }
                    ]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            )}
        </div>
    )
}
